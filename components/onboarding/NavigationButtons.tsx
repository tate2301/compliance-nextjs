import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";
import { FormPreviewRef } from "./FormContainer";

interface NavigationButtonsProps {
  formRef: React.RefObject<FormPreviewRef>;
  onPrevious: () => void;
  isPreviousDisabled: boolean;
  isSubmitting: boolean;
  isCompleted: boolean;
}

export function NavigationButtons({
  formRef,
  onPrevious,
  isPreviousDisabled,
  isSubmitting,
  isCompleted,
}: NavigationButtonsProps) {
  return (
    <div className="flex justify-between gap-3 px-6 lg:px-0 lg:relative bottom-0 bg-background/80 backdrop-blur-sm p-4 -mx-4 border-t lg:mx-0 lg:p-0 lg:border-0 lg:bg-transparent lg:backdrop-blur-none">
      <Button
        variant="outline"
        onClick={onPrevious}
        disabled={isPreviousDisabled || isSubmitting}
        className="sm:w-auto"
      >
        Previous
      </Button>
      <Button
        onClick={async () => {
          if (formRef.current) {
            await formRef.current.submitForm();
          }
        }}
        disabled={isSubmitting}
        className="sm:w-auto"
      >
        {isSubmitting ? (
          <span className="flex items-center gap-2">
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-background border-t-transparent" />
            Submitting...
          </span>
        ) : isCompleted ? (
          <span className="flex items-center gap-2">
            <CheckCircle className="h-4 w-4" />
            Next Step
          </span>
        ) : (
          "Submit and Continue"
        )}
      </Button>
    </div>
  );
}