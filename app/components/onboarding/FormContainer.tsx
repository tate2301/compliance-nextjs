import { forwardRef } from "react";
import { Card } from "@/components/ui/card";
import { FormProvider } from "@/forms_builder/context";
import {
  FormPreview,
  FormPreviewRef,
} from "@/forms_builder/components/FormPreview";
import { Form } from "@/forms_builder/types";
import { FormWithValues } from "@/app/app/contexts/OnboardingContext";

interface FormContainerProps {
  isLoading: boolean;
  formData: Form | null;
  onSubmitForm: (formData: FormWithValues) => void;
}

export const FormContainer = forwardRef<FormPreviewRef, FormContainerProps>(
  ({ isLoading, formData, onSubmitForm }, ref) => {
    return (
      <Card className="overflow-hidden">
        <div className="">
          {isLoading ? (
            <div className="flex items-center justify-center p-8">
              <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
            </div>
          ) : formData ? (
            <FormProvider
              initialForm={JSON.stringify(formData)}
              onFormChange={() => {
                // Handle form changes if needed
              }}
            >
              <FormPreview
                ref={ref}
                form={formData}
                onHandleSubmitForm={onSubmitForm}
              />
            </FormProvider>
          ) : (
            <div className="p-8 text-center text-muted-foreground">
              Form could not be loaded
            </div>
          )}
        </div>
      </Card>
    );
  }
);

FormContainer.displayName = "FormContainer";

export { type FormPreviewRef };
