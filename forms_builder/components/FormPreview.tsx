import { Button } from "@/components/ui/button";
import { useFormContext } from "../context";
import { renderField } from "../utils/fieldRenderer";
import { ensureCompleteTheme, getCssVariables } from "../utils/themeUtils";
import { Form } from "../types";
import { useState, forwardRef, useImperativeHandle } from "react";
import { useToast } from "@/components/ui/use-toast";

interface FormValues {
  [key: string]: string;
}

interface FormErrors {
  [key: string]: string;
}

export interface FormPreviewRef {
  submitForm: () => Promise<boolean>;
}

export const FormPreview = forwardRef<FormPreviewRef, {
  onHandleSubmitForm: (form: Form & { values: FormValues }) => void;
}>(({ onHandleSubmitForm }, ref) => {
  const { form } = useFormContext();
  const { toast } = useToast();
  const safeTheme = ensureCompleteTheme(form.theme);
  const [formValues, setFormValues] = useState<FormValues>({});
  const [formErrors, setFormErrors] = useState<FormErrors>({});

  const validateForm = () => {
    const errors: FormErrors = {};
    let isValid = true;

    form.fields.forEach((field) => {
      if (field.required && !formValues[field.id]?.trim()) {
        errors[field.id] = `${field.label} is required`;
        isValid = false;
      }
    });

    setFormErrors(errors);
    return isValid;
  };

  const handleFieldChange = (fieldId: string, value: string) => {
    setFormValues((prev) => ({
      ...prev,
      [fieldId]: value,
    }));

    // Clear error when field is modified
    if (formErrors[fieldId]) {
      setFormErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[fieldId];
        return newErrors;
      });
    }
  };

  useImperativeHandle(ref, () => ({
    submitForm: async () => {
      if (validateForm()) {
        onHandleSubmitForm({ ...form, values: formValues });
        return true;
      } else {
        toast({
          title: "Validation Error",
          description: "Please fill in all required fields",
          variant: "destructive",
        });
        return false;
      }
    }
  }));

  return (
    <div className="relative">
      <div
        className="p-3"
        style={{
          ...getCssVariables(safeTheme),
          backgroundColor: "var(--background)",
          fontFamily: "'Sohne', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
          color: "var(--text)",
        }}
      >
        <div className="space-y-8">
          <div className="space-y-4 border-b pb-6">
            <h1
              className="text-3xl font-bold tracking-tight"
              style={{ color: "var(--primary)" }}
            >
              {form.title}
            </h1>
            {form.description && (
              <p
                className="text-lg"
                style={{ color: "var(--text-secondary)" }}
              >
                {form.description}
              </p>
            )}
          </div>
          <div className="space-y-8">
            {form.fields.map((field) => (
              <div
                key={field.id}
                className="rounded-lg has-[active]:bg-slate-2 p-6 transition-all hover:bg-slate-2"
              >
                {renderField(field, {
                  value: formValues[field.id] || "",
                  onChange: (value: string) => handleFieldChange(field.id, value),
                  error: formErrors[field.id],
                })}
                {formErrors[field.id] && (
                  <p className="mt-1 text-sm text-error-9">{formErrors[field.id]}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
});
