// @ts-nocheck
import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const inputVariants = cva(
  "flex w-full rounded-md border bg-transparent px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-slate-9 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "border-slate-7 focus:border-primary-8",
        error: "border-error-8 focus:border-error-9 focus-visible:ring-error-7",
      },
      size: {
        sm: "h-8 px-3 text-xs rounded-md",
        md: "h-9 px-3 text-sm rounded-md",
        lg: "h-10 px-4 text-base rounded-md",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
);

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof inputVariants> {
  error?: boolean;
  leftElement?: React.ReactNode;
  rightElement?: React.ReactNode;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      variant,
      size,
      error,
      leftElement,
      rightElement,
      type,
      ...props
    },
    ref
  ) => {
    const variantToUse = error ? "error" : variant;

    if (leftElement || rightElement) {
      return (
        <div className="relative w-full">
          {leftElement && (
            <div className="absolute left-2 top-1/2 -translate-y-1/2 text-slate-11">
              {leftElement}
            </div>
          )}
          <input
            type={type}
            className={cn(
              inputVariants({ variant: variantToUse, size, className }),
              leftElement && "pl-8",
              rightElement && "pr-8"
            )}
            ref={ref}
            {...props}
          />
          {rightElement && (
            <div className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-11">
              {rightElement}
            </div>
          )}
        </div>
      );
    }

    return (
      <input
        type={type}
        className={cn(
          inputVariants({ variant: variantToUse, size, className })
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export interface InputFieldProps extends InputProps {
  label?: string;
  helperText?: string;
  errorMessage?: string;
}

const InputField = React.forwardRef<HTMLInputElement, InputFieldProps>(
  ({ label, helperText, errorMessage, error, className, ...props }, ref) => {
    const id = React.useId();
    const hasError = error || !!errorMessage;

    return (
      <div className={cn("space-y-1.5", className)}>
        {label && (
          <label htmlFor={id} className="text-sm font-medium text-slate-12">
            {label}
          </label>
        )}
        <Input id={id} error={hasError} ref={ref} {...props} />
        {(helperText || errorMessage) && (
          <p
            className={cn(
              "text-xs",
              hasError ? "text-error-11" : "text-slate-11"
            )}
          >
            {hasError ? errorMessage : helperText}
          </p>
        )}
      </div>
    );
  }
);
InputField.displayName = "InputField";

export { Input, InputField, inputVariants };
