import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center justify-center rounded-md border px-2 py-0.5 text-xs font-semibold tracking-loose w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none focus-visible:border-focus focus-visible:ring-focus/50 focus-visible:ring-[3px] aria-invalid:ring-error/20 dark:aria-invalid:ring-error/40 aria-invalid:border-error transition-[color,box-shadow] overflow-hidden",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary-9 text-slate-1 [a&]:hover:bg-primary-10",
        primary:
          "border-transparent bg-primary-9 text-slate-1 [a&]:hover:bg-primary-10",
        secondary:
          "border-transparent bg-secondary-9 text-slate-1 [a&]:hover:bg-secondary-10",
        success:
          "border-transparent bg-success-9 text-slate-1 [a&]:hover:bg-success-10",
        warning:
          "border-transparent bg-warning-6 text-slate-12 [a&]:hover:bg-warning-10",
        destructive:
          "border-transparent bg-error-9 text-white [a&]:hover:bg-error-10 focus-visible:ring-error/20 dark:focus-visible:ring-error/40 dark:bg-error-8",
        outline: "text-slate-10 [a&]:hover:bg-slate-3 [a&]:hover:text-slate-12",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

function Badge({
  className,
  variant,
  asChild = false,
  ...props
}: React.ComponentProps<"span"> &
  VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "span";

  return (
    <Comp
      data-slot="badge"
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  );
}

export { Badge, badgeVariants };
