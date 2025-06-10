import axios from "axios";
import { FormCategory, FormStatus, IComplianceForm } from "@/lib/db/models/document";
import { FormResponseStatus, IFormResponse } from "@/lib/db/models/form-response";

export interface FormWithResponse extends IComplianceForm {
  userResponse?: IFormResponse;
  isCompleted: boolean;
  isExpired?: boolean;
}

export const formsService = {
  // Get all forms
  getAllForms: async (filters?: {
    category?: FormCategory;
    onboardingOnly?: boolean;
    status?: FormStatus;
  }): Promise<IComplianceForm[]> => {
    try {
      const params = new URLSearchParams();
      
      if (filters?.category) {
        params.append("category", filters.category);
      }
      
      if (filters?.onboardingOnly) {
        params.append("onboarding", "true");
      }
      
      if (filters?.status) {
        params.append("status", filters.status);
      }

      const response = await axios.get(`/api/forms?${params.toString()}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching forms:", error);
      throw error;
    }
  },

  // Get onboarding forms only
  getOnboardingForms: async (): Promise<IComplianceForm[]> => {
    return formsService.getAllForms({ onboardingOnly: true });
  },

  // Get forms by category
  getFormsByCategory: async (category: FormCategory): Promise<IComplianceForm[]> => {
    return formsService.getAllForms({ category });
  },

  // Get a specific form by ID
  getFormById: async (formId: string): Promise<IComplianceForm> => {
    try {
      const response = await axios.get(`/api/forms/${formId}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching form ${formId}:`, error);
      throw error;
    }
  },

  // Get user's form responses
  getUserFormResponses: async (userId: string, filters?: {
    formId?: string;
    status?: FormResponseStatus;
  }): Promise<IFormResponse[]> => {
    try {
      const params = new URLSearchParams();
      params.append("userId", userId);
      
      if (filters?.formId) {
        params.append("formId", filters.formId);
      }
      
      if (filters?.status) {
        params.append("status", filters.status);
      }

      const response = await axios.get(`/api/form-responses?${params.toString()}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching user form responses:", error);
      throw error;
    }
  },

  // Submit or update a form response
  submitFormResponse: async (data: {
    userId: string;
    formId: string;
    formData: Record<string, any>;
    status?: FormResponseStatus;
  }): Promise<IFormResponse> => {
    try {
      const response = await axios.post("/api/form-responses", data);
      return response.data;
    } catch (error) {
      console.error("Error submitting form response:", error);
      throw error;
    }
  },

  // Get forms with user responses (for displaying status)
  getFormsWithUserResponses: async (
    userId: string,
    filters?: {
      category?: FormCategory;
      onboardingOnly?: boolean;
    }
  ): Promise<FormWithResponse[]> => {
    try {
      // Get all forms
      const forms = await formsService.getAllForms(filters);
      
      // Get user responses
      const responses = await formsService.getUserFormResponses(userId);
      
      // Create a map of form responses by form ID
      const responseMap = new Map<string, IFormResponse>();
      responses.forEach(response => {
        if (response.form && typeof response.form === 'object' && 'formId' in response.form) {
          responseMap.set((response.form as any).formId, response);
        }
      });

      // Merge forms with responses
      return forms.map(form => {
        const userResponse = responseMap.get(form.formId);
        
        let isCompleted = false;
        let isExpired = false;

        if (userResponse) {
          isCompleted = [
            FormResponseStatus.ACTIVE,
            FormResponseStatus.REVIEWING,
            FormResponseStatus.ARCHIVED
          ].includes(userResponse.status);

          // Check if response is expired
          if (userResponse.expiryDate) {
            isExpired = new Date() > new Date(userResponse.expiryDate);
          }
        }

        return {
          ...form,
          userResponse,
          isCompleted,
          isExpired
        };
      });
    } catch (error) {
      console.error("Error fetching forms with user responses:", error);
      throw error;
    }
  },

  // Get user's onboarding progress
  getOnboardingProgress: async (userId: string): Promise<{
    totalForms: number;
    completedForms: number;
    pendingForms: FormWithResponse[];
    completedFormIds: string[];
    progressPercentage: number;
  }> => {
    try {
      const formsWithResponses = await formsService.getFormsWithUserResponses(userId, {
        onboardingOnly: true
      });

      const totalForms = formsWithResponses.length;
      const completedForms = formsWithResponses.filter(f => f.isCompleted).length;
      const pendingForms = formsWithResponses.filter(f => !f.isCompleted);
      const completedFormIds = formsWithResponses
        .filter(f => f.isCompleted)
        .map(f => f.formId);

      const progressPercentage = totalForms > 0 ? (completedForms / totalForms) * 100 : 0;

      return {
        totalForms,
        completedForms,
        pendingForms,
        completedFormIds,
        progressPercentage
      };
    } catch (error) {
      console.error("Error getting onboarding progress:", error);
      throw error;
    }
  },

  // Check if user has completed onboarding
  isOnboardingComplete: async (userId: string): Promise<boolean> => {
    try {
      const progress = await formsService.getOnboardingProgress(userId);
      return progress.completedForms === progress.totalForms && progress.totalForms > 0;
    } catch (error) {
      console.error("Error checking onboarding completion:", error);
      return false;
    }
  }
}; 