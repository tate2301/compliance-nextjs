"use client";

import { useRef } from "react";
import { useOnboardingData } from "@/app/hooks/useOnboardingData";
import { CategorySidebar } from "@/components/onboarding/CategorySidebar";
import {
  FormContainer,
  FormPreviewRef,
} from "@/components/onboarding/FormContainer";
import { NavigationButtons } from "@/components/onboarding/NavigationButtons";
import { Loader2 } from "lucide-react";

function OnboardingLoadingSkeleton() {
  return (
    <div className="flex flex-col lg:flex-row gap-4 lg:gap-8">
      

      {/* Main content skeleton */}
      <div className="flex-1 min-w-0">
        <div className="grid gap-4">
          <div className="bg-card rounded-lg p-6">
            <div className="flex items-center justify-center p-12">
              <div className="flex flex-col items-center gap-4">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
                
              </div>
            </div>
          </div>

          {/* Navigation skeleton */}
          <div className="flex justify-between gap-3">
            <div className="h-10 w-24 bg-sand-3 rounded animate-pulse" />
            <div className="h-10 w-40 bg-sand-3 rounded animate-pulse" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function OnboardingPage() {
  const formRef = useRef<FormPreviewRef>(null);

  const {
    category,
    step,
    categories,
    formsByCategory,
    currentForm,
    completedForms,
    isSubmitting,
    formData,
    isDataReady,
    handleSubmitForm,
    navigateToPrevious,
    isPreviousDisabled,
    handleCategorySelect,
    handleStepSelect,
    onboardingForms,
  } = useOnboardingData();

  // Show loading until we have all the data we need
  if (!isDataReady) {
    return <OnboardingLoadingSkeleton />;
  }

  return (
    <div className="flex flex-col lg:flex-row gap-4 lg:gap-8 h-full overflow-auto">
      {/* Left sidebar with steps */}
      <CategorySidebar
        categories={categories}
        currentCategory={category}
        formsByCategory={formsByCategory}
        completedForms={completedForms}
        step={step}
        onCategorySelect={handleCategorySelect}
        onStepSelect={handleStepSelect}
      />

      {/* Main content */}
      <div className="flex-1 min-w-0">
        <div className="grid gap-4">
          <FormContainer
            ref={formRef}
            isLoading={false} // We already checked loading above
            formData={formData}
            onSubmitForm={handleSubmitForm}
          />

          <NavigationButtons
            formRef={formRef}
            onPrevious={navigateToPrevious}
            isPreviousDisabled={isPreviousDisabled}
            isSubmitting={isSubmitting}
            isCompleted={completedForms.includes(currentForm.id)}
          />
        </div>
      </div>
    </div>
  );
}
