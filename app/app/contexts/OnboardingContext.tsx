"use client";

import React, { createContext, useContext, useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth/auth-context";
import { useToast } from "@/components/ui/use-toast";
import { onboardingService, ComplianceUser } from "@/app/app/services/onboarding";
import { formsService, FormWithResponse } from "@/app/app/services/forms";
import { FormResponseStatus } from "@/lib/db/models/form-response";
import { FormCategory } from "@/lib/db/models/document";
import { Form } from "@/forms_builder/types";

export type FormWithValues = Form & { values: Record<string, string> };

interface OnboardingContextValue {
  // User data
  complianceUser: ComplianceUser | null;
  onboardingStatus: ComplianceUser["onboardingStatus"] | undefined;
  
  // Progress data
  isOnboardingComplete: boolean;
  completedSteps: string[];
  totalSteps: number;
  progressPercentage: number;
  
  // Forms data
  onboardingForms: FormWithResponse[];
  currentForm: { id: string; title: string; url: string } | null;
  currentFormIndex: number;
  completedForms: string[];
  formData: Form | null;
  
  // Navigation data
  categories: string[];
  formsByCategory: Record<string, any[]>;
  category: string;
  step: number;
  
  // State
  isLoading: boolean;
  isDataReady: boolean;
  isSubmitting: boolean;
  error: string | null;
  
  // Actions
  handleSubmitForm: (formData: FormWithValues) => Promise<void>;
  navigateToPrevious: () => void;
  handleCategorySelect: (category: string) => void;
  handleStepSelect: (category: string, stepNum: number) => void;
  completeStep: (stepId: string) => Promise<ComplianceUser | undefined>;
  updateOnboardingStatus: (status: Partial<ComplianceUser["onboardingStatus"]>) => Promise<ComplianceUser | undefined>;
  
  // Navigation state
  isPreviousDisabled: boolean;
  
  // Refresh function
  refreshData: () => Promise<void>;
}

const OnboardingContext = createContext<OnboardingContextValue | undefined>(undefined);

export function OnboardingProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { toast } = useToast();
  const { user, isAuthenticated } = useAuth();

  // User state
  const [complianceUser, setComplianceUser] = useState<ComplianceUser | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Forms state
  const [onboardingForms, setOnboardingForms] = useState<FormWithResponse[]>([]);
  const [currentFormIndex, setCurrentFormIndex] = useState(0);
  const [formData, setFormData] = useState<Form | null>(null);
  
  // Loading and submission state
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Prevent duplicate requests
  const initializingRef = useRef(false);
  const loadingFormRef = useRef(false);

  // Initialize user and load all onboarding data in a single effect
  const initializeOnboardingData = async () => {
    if (!isAuthenticated || !user || initializingRef.current) {
      return;
    }

    try {
      initializingRef.current = true;
      setIsLoading(true);
      setError(null);

      console.log("🚀 Initializing onboarding data for user:", user.id);

      // Step 1: Get or create user in our database
      let dbUser = await onboardingService.getUserByAuthId(user.id?.toString() || "");
      
      if (!dbUser) {
        console.log("👤 Creating new user in database");
        dbUser = await onboardingService.createOrUpdateUser({
          authUserId: user.id?.toString() || "",
          email: user.email,
          firstName: user.first_name,
          lastName: user.last_name,
          middleNames: user.middle_names,
          niNumber: user.ni_number,
          phone: user.phone,
          dateOfBirth: user.date_of_birth,
          profileImage: user.profile_image,
        });
      }

      setComplianceUser(dbUser);

      // Step 2: Fetch forms with user responses (single API call for all data)
      console.log("📋 Fetching onboarding forms with user responses");
      const formsWithResponses = await formsService.getFormsWithUserResponses(dbUser._id || "", {
        onboardingOnly: true
      });

      console.log("✅ Received", formsWithResponses.length, "forms with responses");

      // Sort forms by category and title for consistent ordering
      const sortedForms = formsWithResponses.sort((a, b) => {
        if (a.category !== b.category) {
          const categoryOrder = [FormCategory.ONBOARDING, FormCategory.LEGAL, FormCategory.HEALTH, FormCategory.EMPLOYMENT, FormCategory.ASSESSMENT];
          return categoryOrder.indexOf(a.category) - categoryOrder.indexOf(b.category);
        }
        return a.title.localeCompare(b.title);
      });

      setOnboardingForms(sortedForms);

      // Step 3: Find the first incomplete form
      const firstIncompleteIndex = sortedForms.findIndex(form => !form.isCompleted);
      if (firstIncompleteIndex >= 0) {
        setCurrentFormIndex(firstIncompleteIndex);
      }

      // Step 4: Calculate progress and update user's onboarding status if needed
      const completedCount = sortedForms.filter(f => f.isCompleted).length;
      const totalCount = sortedForms.length;
      const isComplete = completedCount === totalCount && totalCount > 0;
      const completedFormIds = sortedForms.filter(f => f.isCompleted).map(f => f.formId);

      console.log("📊 Progress:", completedCount, "/", totalCount, "forms completed");

    if (dbUser.onboardingStatus.isCompleted !== isComplete) {
        console.log("🔄 Updating onboarding status in database");
        await onboardingService.updateOnboardingStatus(dbUser.authUserId, {
          isCompleted: isComplete,
          completedSteps: completedFormIds,
          totalSteps: totalCount,
          lastUpdated: new Date()
        });
      }

    } catch (err) {
      console.error("❌ Error initializing onboarding data:", err);
      setError(err instanceof Error ? err.message : "Failed to initialize onboarding data");
      toast({
        title: "Error",
        description: "Failed to load onboarding data. Please refresh the page.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
      initializingRef.current = false;
    }
  };

  useEffect(() => {
    if (!isAuthenticated || !user) {
      setIsLoading(false);
      return;
    }

    initializeOnboardingData();
  }, [isAuthenticated, user]);

  // Load current form definition when form changes
  useEffect(() => {
    async function loadFormDefinition() {
      const currentForm = onboardingForms[currentFormIndex];
      if (currentForm && !isLoading && !loadingFormRef.current) {
        loadingFormRef.current = true;
        setIsLoading(true);
        try {
          console.log("🔧 Loading form definition for:", currentForm.title);
          
          // Convert database form to Form type
          const form: Form = {
            id: currentForm.formId,
            title: currentForm.title,
            description: currentForm.description,
            fields: currentForm.formDefinition.fields,
            theme: currentForm.formDefinition.theme
          };
          
          console.log("📋 Form loaded with", form.fields.length, "fields");
          setFormData(form);
        } catch (error) {
          console.error("❌ Error loading form:", error);
          toast({
            title: "Error",
            description: "There was an error loading the form. Please try again.",
            variant: "destructive",
          });
        } finally {
          setIsLoading(false);
          loadingFormRef.current = false;
        }
      }
    }
    loadFormDefinition();
  }, [currentFormIndex, onboardingForms, toast]);

  // Derived data
  const currentForm = onboardingForms[currentFormIndex];
const completedFormIds = onboardingForms.filter(f => f.isCompleted).map(f => f.formId);
  const totalForms = onboardingForms.length;
  const completedForms = onboardingForms.filter(f => f.isCompleted).length;
  const progressPercentage = totalForms > 0 ? (completedForms / totalForms) * 100 : 0;
  const isOnboardingComplete = completedForms === totalForms && totalForms > 0;

  // Categories and navigation data
  const categories = Array.from(new Set(onboardingForms.map(form => form.category)));
  const formsByCategory = categories.reduce((acc, category) => {
    acc[category] = onboardingForms
      .filter(form => form.category === category)
      .map(form => ({
        id: form.formId,
        title: form.title,
        url: form.jotFormUrl || ""
      }));
    return acc;
  }, {} as Record<string, any[]>);

  const currentCategory = currentForm?.category || categories[0];
  const step = currentForm ? 
    onboardingForms.filter(f => f.category === currentCategory).findIndex(f => f.formId === currentForm.formId) + 1 : 1;

  // Navigation functions
  const navigateToNext = () => {
    if (currentFormIndex < onboardingForms.length - 1) {
      setCurrentFormIndex(currentFormIndex + 1);
    } else {
      router.push("/app/onboarding/complete");
    }
  };

  const navigateToPrevious = () => {
    if (currentFormIndex > 0) {
      setCurrentFormIndex(currentFormIndex - 1);
    }
  };

  const handleCategorySelect = (category: string) => {
    const categoryForms = onboardingForms.filter(form => form.category === category);
    if (categoryForms.length > 0) {
      const firstFormIndex = onboardingForms.findIndex(form => form.formId === categoryForms[0].formId);
      setCurrentFormIndex(firstFormIndex);
    }
  };

  const handleStepSelect = (category: string, stepNum: number) => {
    const categoryForms = onboardingForms.filter(form => form.category === category);
    if (categoryForms[stepNum - 1]) {
      const formIndex = onboardingForms.findIndex(form => form.formId === categoryForms[stepNum - 1].formId);
      setCurrentFormIndex(formIndex);
    }
  };

  // Form submission
  const handleSubmitForm = async (formDataWithValues: FormWithValues) => {
    if (!currentForm || !complianceUser) return;

    setIsSubmitting(true);
    try {
      console.log("📤 Submitting form:", currentForm.title);
      
      const hasEmptyRequiredFields = formDataWithValues.fields.some(
        (field) => field.required && !formDataWithValues.values[field.id]?.trim()
      );

      if (hasEmptyRequiredFields) {
        console.log("⚠️ Form has empty required fields");
        toast({
          title: "Error",
          description: "Please fill in all required fields before proceeding.",
          variant: "destructive",
        });
        return;
      }

      // Submit the form response to our database
      await formsService.submitFormResponse({
        userId: complianceUser._id || "",
        formId: currentForm.formId,
        formData: formDataWithValues.values,
        status: FormResponseStatus.ACTIVE
      });

      console.log("✅ Form submitted successfully");

      toast({
        title: "Form Submitted",
        description: "Your form has been submitted successfully.",
      });

      // Update the current form's completion status locally
      setOnboardingForms(prev => prev.map(form => 
        form.formId === currentForm.formId 
          ? { ...form, isCompleted: true }
          : form
      ));

      // Check if this was the last form
      const isLastForm = currentFormIndex === onboardingForms.length - 1;

      if (isLastForm) {
        console.log("🎉 Last form completed, redirecting to completion page");
        router.push("/app/onboarding/complete");
        return;
      }

      // Navigate to next form
      console.log("➡️ Navigating to next form");
      navigateToNext();

    } catch (error) {
      console.error("❌ Error submitting form:", error);
      toast({
        title: "Error",
        description: "There was an error submitting the form. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Helper functions for backward compatibility
  const completeStep = async (stepId: string) => {
    if (!user || !complianceUser) return;

    try {
      await formsService.submitFormResponse({
        userId: complianceUser._id || "",
        formId: stepId,
        formData: {},
        status: FormResponseStatus.ACTIVE
      });

      // Update local state
      setOnboardingForms(prev => prev.map(form => 
        form.formId === stepId 
          ? { ...form, isCompleted: true }
          : form
      ));

      return complianceUser;
    } catch (err) {
      console.error("Error completing step:", err);
      throw err;
    }
  };

  const updateOnboardingStatus = async (status: Partial<ComplianceUser["onboardingStatus"]>) => {
    if (!user || !complianceUser) return;

    try {
      const updatedUser = await onboardingService.updateOnboardingStatus(
        user.id?.toString() || "",
        status
      );
      setComplianceUser(updatedUser);
      return updatedUser;
    } catch (err) {
      console.error("Error updating onboarding status:", err);
      throw err;
    }
  };

  // Refresh function for manual data refresh
  const refreshData = async () => {
    initializingRef.current = false;
    await initializeOnboardingData();
  };

  // Check if data is ready for rendering
  const isDataReady = 
    !isLoading && 
    currentForm && 
    formData && 
    onboardingForms.length > 0 &&
    categories.length > 0;

  const value: OnboardingContextValue = {
    // User data
    complianceUser,
    onboardingStatus: complianceUser?.onboardingStatus,
    
    // Progress data
    isOnboardingComplete,
    completedSteps: completedFormIds,
    totalSteps: totalForms,
    progressPercentage,
    
    // Forms data
    onboardingForms,
    currentForm: currentForm ? {
      id: currentForm.formId,
      title: currentForm.title,
      url: currentForm.jotFormUrl || ""
    } : null,
    currentFormIndex,
    completedForms: completedFormIds,
    formData,
    
    // Navigation data
    categories,
    formsByCategory,
    category: currentCategory,
    step,
    
    // State
    isLoading,
    isDataReady,
    isSubmitting,
    error,
    
    // Actions
    handleSubmitForm,
    navigateToPrevious,
    handleCategorySelect,
    handleStepSelect,
    completeStep,
    updateOnboardingStatus,
    
    // Navigation state
    isPreviousDisabled: currentFormIndex === 0,
    
    // Refresh function
    refreshData,
  };

  return (
    <OnboardingContext.Provider value={value}>
      {children}
    </OnboardingContext.Provider>
  );
}

export function useOnboardingData(): OnboardingContextValue {
  const context = useContext(OnboardingContext);
  if (context === undefined) {
    throw new Error('useOnboardingData must be used within an OnboardingProvider');
  }
  return context;
} 