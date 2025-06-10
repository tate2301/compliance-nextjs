import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

export type ModalVariant = "default" | "destructive" | "success" | "warning";

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm?: () => void;
  title: string;
  description?: string;
  children?: React.ReactNode;
  isLoading?: boolean;
  variant?: ModalVariant;
  confirmText?: string;
  cancelText?: string;
  showCancel?: boolean;
  hideConfirm?: boolean;
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
}

const variantStyles: Record<ModalVariant, { button: string; title: string }> = {
  default: {
    button: "bg-primary-11 hover:bg-primary-9",
    title: "text-sand-12",
  },
  destructive: {
    button: "bg-error-1 hover:bg-error-9 text-error-1",
    title: "text-destructive",
  },
  success: {
    button: "bg-success hover:bg-success/90 text-success-foreground",
    title: "text-success",
  },
  warning: {
    button: "bg-warning hover:bg-warning/90 text-warning-foreground",
    title: "text-warning",
  },
};

const sizeStyles = {
  sm: "sm:max-w-[425px]",
  md: "sm:max-w-[600px]",
  lg: "sm:max-w-[800px]",
  xl: "sm:max-w-[1000px]",
};

export function Modal({
  isOpen,
  onClose,
  onConfirm,
  title,
  description,
  children,
  isLoading,
  variant = "default",
  confirmText = "Confirm",
  cancelText = "Cancel",
  showCancel = true,
  hideConfirm = false,
  size = "sm",
  className,
}: ModalProps) {
  const variantStyle = variantStyles[variant];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        className={cn(
          "border-sand-6 bg-sand-2",
          sizeStyles[size],
          "w-[95%] rounded-lg md:w-full",
          className
        )}
      >
        <DialogHeader>
          <DialogTitle className={variantStyle.title}>{title}</DialogTitle>
          {description && (
            <DialogDescription className="text-sand-11">
              {description}
            </DialogDescription>
          )}
        </DialogHeader>
        <div className="py-4">{children}</div>
        {!hideConfirm && (
          <DialogFooter className="sm:flex-row gap-2">
            {showCancel && (
              <Button
                variant="outline"
                onClick={onClose}
                className="w-full sm:w-auto"
              >
                {cancelText}
              </Button>
            )}
            <Button
              onClick={onConfirm}
              disabled={isLoading}
              className={cn("w-full sm:w-auto", variantStyle.button)}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Loading...
                </>
              ) : (
                confirmText
              )}
            </Button>
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  );
}
