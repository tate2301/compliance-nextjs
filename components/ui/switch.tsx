import * as React from "react"
import * as SwitchPrimitive from "@radix-ui/react-switch"
import { cn } from "@/lib/utils"

function Switch({
  className,
  ...props
}: React.ComponentProps<typeof SwitchPrimitive.Root>) {
  return (
    <SwitchPrimitive.Root
      className={cn(
        "peer inline-flex h-[20px] w-[36px] shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-7 focus-visible:ring-offset-2",
        "disabled:cursor-not-allowed disabled:opacity-50",
        "data-[state=checked]:bg-primary-9 data-[state=unchecked]:bg-slate-6",
        "dark:data-[state=checked]:bg-primary-9 dark:data-[state=unchecked]:bg-slate-7",
        className
      )}
      {...props}
    >
      <SwitchPrimitive.Thumb
        className={cn(
          "pointer-events-none block h-4 w-4 rounded-full shadow-lg ring-0 transition-transform",
          "data-[state=checked]:translate-x-4 data-[state=unchecked]:translate-x-0",
          "data-[state=checked]:bg-white data-[state=unchecked]:bg-slate-12",
          "dark:data-[state=checked]:bg-slate-1 dark:data-[state=unchecked]:bg-slate-12"
        )}
      />
    </SwitchPrimitive.Root>
  )
}

Switch.displayName = SwitchPrimitive.Root.displayName

export { Switch }
