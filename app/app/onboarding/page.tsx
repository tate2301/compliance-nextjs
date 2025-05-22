"use client";

import { useRef } from "react";
import { useRouter } from "next/navigation";
import { useOnboarding } from "@/app/hooks/useOnboarding";
import { CategorySidebar } from "@/app/components/onboarding/CategorySidebar";
import {
  FormContainer,
  FormPreviewRef,
} from "@/app/components/onboarding/FormContainer";
import { NavigationButtons } from "@/app/components/onboarding/NavigationButtons";

export default function OnboardingPage() {
  const router = useRouter();
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
    isLoading,
    handleSubmitForm,
    navigateToPrevious,
    isPreviousDisabled,
  } = useOnboarding();

  if (!currentForm) return null;

  const handleCategorySelect = (cat: string) => {
    router.push(`/app/onboarding?category=${cat}&step=1`);
  };

  const handleStepSelect = (cat: string, stepNum: number) => {
    router.push(`/app/onboarding?category=${cat}&step=${stepNum}`);
  };

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
            isLoading={isLoading}
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
