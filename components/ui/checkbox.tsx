import * as React from "react"
import * as CheckboxPrimitive from "@radix-ui/react-checkbox"
import { CheckIcon } from "lucide-react"

import { cn } from "@/lib/utils"

function Checkbox({
  className,
  ...props
}: React.ComponentProps<typeof CheckboxPrimitive.Root>) {
  return (
    <CheckboxPrimitive.Root
      data-slot="checkbox"
      className={cn(
        "peer border-slate-7 border-2 dark:bg-slate-2 data-[state=checked]:bg-primary-9 data-[state=checked]:text-slate-1 dark:data-[state=checked]:bg-primary-9 data-[state=checked]:border-primary-9 hover:border-slate-8 focus:border-slate-8 focus-visible:border-focus focus-visible:ring-focus/50 aria-invalid:ring-error/20 dark:aria-invalid:ring-error/40 aria-invalid:border-error-7 aria-invalid:border-2 size-4 shrink-0 rounded-[4px] border shadow-xs transition-shadow outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    >
      <CheckboxPrimitive.Indicator
        data-slot="checkbox-indicator"
        className="flex items-center justify-center text-current transition-none"
      >
        <CheckIcon className="size-3.5" />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  )
}

export { Checkbox }
