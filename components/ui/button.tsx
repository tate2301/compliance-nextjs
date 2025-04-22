import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex font-semibold items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-focus focus-visible:ring-focus/50 focus-visible:ring-[3px] aria-invalid:ring-error/20 dark:aria-invalid:ring-error/40 aria-invalid:border-error",
  {
    variants: {
      variant: {
        default:
          "bg-primary-9 text-slate-1 shadow-xs hover:bg-primary-10",
        destructive:
          "bg-error-9 text-white shadow-xs hover:bg-error-10 focus-visible:ring-error/20 dark:focus-visible:ring-error/40 dark:bg-error-8",
        outline:
          "border-2 border-slate-7 text-slate-11 bg-transparent hover:border-slate-8 focus:border-slate-8 hover:bg-slate-3 hover:text-slate-12 dark:bg-slate-2 dark:border-slate-7 dark:hover:bg-slate-3",
        secondary:
          "bg-secondary-9 text-secondary-1 shadow-xs hover:bg-secondary-10",
        ghost:
          "hover:bg-slate-6 hover:text-slate-12 dark:hover:bg-slate-3",
        link: "text-primary-9 underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
        icon: "size-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot : "button"

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
