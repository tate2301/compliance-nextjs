import * as React from "react"

import { cn } from "@/lib/utils"

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "file:text-slate-12 placeholder:text-slate-9 selection:bg-primary-9 selection:text-slate-1 dark:bg-slate-2 border-slate-7 focus:border-slate-8 hover:border-slate-8 flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        "focus-visible:border-focus focus-visible:ring-focus/50 focus-visible:ring-[3px]",
        "aria-invalid:ring-error/20 dark:aria-invalid:ring-error/40 aria-invalid:border-error-7 aria-invalid:border-2",
        className
      )}
      {...props}
    />
  )
}

export { Input }
