import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import { Form } from "@/forms_builder/types";
import { getJotFormById } from "@/app/actions/forms";
import { categories, formsByCategory } from "@/app/data/compliance-forms";

export type FormWithValues = Form & { values: Record<string, string> };

export function useOnboarding() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { toast } = useToast();

  const category = searchParams.get("category") || categories[0];
  const step = parseInt(searchParams.get("step") || "1");

  const currentForms = formsByCategory[category] || [];
  const currentForm = currentForms[step - 1];

  const [completedForms, setCompletedForms] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<Form | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!currentForm) {
      const currentCategoryIndex = categories.indexOf(category);
      if (currentCategoryIndex < categories.length - 1) {
        router.push(
          `/app/onboarding?category=${
            categories[currentCategoryIndex + 1]
          }&step=1`
        );
      } else {
        router.push("/dashboard");
      }
    }
  }, [currentForm, category, step, router]);

  useEffect(() => {
    async function loadForm() {
      if (currentForm) {
        setIsLoading(true);
        try {
          const formId = currentForm.url.split("/").pop() || "";
          const form = await getJotFormById(formId);
          setFormData(form);
        } catch (error) {
          console.error("Error loading form:", error);
          toast({
            title: "Error",
            description: "There was an error loading the form. Please try again.",
            variant: "destructive",
          });
        } finally {
          setIsLoading(false);
        }
      }
    }
    loadForm();
  }, [currentForm, toast]);

  const handleSubmitForm = async (formData: FormWithValues) => {
    setIsSubmitting(true);
    try {
      const hasEmptyRequiredFields = formData.fields.some(
        (field) => field.required && !formData.values[field.id]?.trim()
      );

      if (hasEmptyRequiredFields) {
        toast({
          title: "Error",
          description: "Please fill in all required fields before proceeding.",
          variant: "destructive",
        });
        return;
      }

      // Here you could submit the form data to JotForm using their submission API
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setCompletedForms((prev) => [...prev, currentForm.id]);

      if (step < currentForms.length) {
        router.push(
          `/app/onboarding?category=${category}&step=${step + 1}`
        );
      } else {
        const currentCategoryIndex = categories.indexOf(category);
        if (currentCategoryIndex < categories.length - 1) {
          router.push(
            `/app/onboarding?category=${
              categories[currentCategoryIndex + 1]
            }&step=1`
          );
        } else {
          router.push("/dashboard");
          toast({
            title: "Onboarding Complete",
            description: "All required forms have been submitted successfully.",
          });
        }
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "There was an error submitting the form. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const navigateToPrevious = () => {
    if (step > 1) {
      router.push(
        `/app/onboarding?category=${category}&step=${step - 1}`
      );
    } else {
      const currentCategoryIndex = categories.indexOf(category);
      if (currentCategoryIndex > 0) {
        const prevCategory = categories[currentCategoryIndex - 1];
        const prevCategoryForms = formsByCategory[prevCategory];
        router.push(
          `/app/onboarding?category=${prevCategory}&step=${prevCategoryForms.length}`
        );
      }
    }
  };

  const isPreviousDisabled = step === 1 && categories.indexOf(category) === 0;

  return {
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
  };
}