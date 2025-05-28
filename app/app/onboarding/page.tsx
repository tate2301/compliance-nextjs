"use client";

import { useRef } from "react";
import { useOnboardingData } from "@/app/hooks/useOnboardingData";
import { CategorySidebar } from "@/app/components/onboarding/CategorySidebar";
import {
  FormContainer,
  FormPreviewRef,
} from "@/app/components/onboarding/FormContainer";
import { NavigationButtons } from "@/app/components/onboarding/NavigationButtons";
import { Loader2 } from "lucide-react";

function OnboardingLoadingSkeleton() {
  return (
    <div className="flex flex-col lg:flex-row gap-4 lg:gap-8">
      {/* Left sidebar skeleton */}
      <div className="w-full lg:w-72 lg:flex-none">
        <div className="space-y-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="space-y-3">
              <div className="h-16 bg-slate-3 rounded-lg animate-pulse" />
              <div className="ml-7 space-y-2">
                {[...Array(2)].map((_, j) => (
                  <div key={j} className="h-8 bg-slate-3 rounded animate-pulse" />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main content skeleton */}
      <div className="flex-1 min-w-0">
        <div className="grid gap-4">
          <div className="bg-card rounded-lg border border-slate-6 p-6">
            <div className="flex items-center justify-center p-12">
              <div className="flex flex-col items-center gap-4">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
                <div className="text-center space-y-1">
                  <p className="text-lg font-medium text-slate-12">Please wait</p>
                  <p className="text-sm text-slate-9">We're loading your forms</p>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation skeleton */}
          <div className="flex justify-between gap-3">
            <div className="h-10 w-24 bg-slate-3 rounded animate-pulse" />
            <div className="h-10 w-40 bg-slate-3 rounded animate-pulse" />
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
    <div className="flex flex-col lg:flex-row gap-4 lg:gap-8">
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
