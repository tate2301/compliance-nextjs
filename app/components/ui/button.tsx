import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { Loader2 } from "lucide-react"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
    "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
    {
        variants: {
            variant: {
                default: "bg-primary-9 text-white hover:bg-primary-10 focus-visible:ring-primary-8/20",
                destructive: "bg-error-9 text-white hover:bg-error-10 focus-visible:ring-error-8/20",
                outline: "border border-sand-7 bg-transparent hover:bg-sand-3 focus-visible:ring-sand-8/20",
                secondary: "bg-secondary-3 text-secondary-11 hover:bg-sand-4 active:bg-sand-5",
                ghost: "bg-transparent hover:bg-sand-3 active:bg-sand-4 text-sand-11",
                link: "text-primary-9 underline-offset-4 hover:underline bg-transparent",
            },
            size: {
                xs: "h-7 rounded-md px-2.5 text-xs",
                sm: "h-8 rounded-md px-3 text-xs",
                md: "h-9 rounded-md px-4 text-sm",
                lg: "h-10 rounded-md px-5 text-base",
                icon: "h-9 w-9",
            },
        },
        defaultVariants: {
            variant: "default",
            size: "md",
        },
    }
)

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
    asChild?: boolean
    loading?: boolean
    leftIcon?: React.ReactNode
    rightIcon?: React.ReactNode
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant, size, asChild = false, loading = false, leftIcon, rightIcon, children, disabled, ...props }, ref) => {
        const Comp = asChild ? Slot : "button"
        const isDisabled = disabled || loading

        return (
            <Comp
                className={cn(buttonVariants({ variant, size, className }))}
                ref={ref}
                disabled={isDisabled}
                {...props}
            >
                {loading && (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                )}

                {!loading && leftIcon && (
                    <span className="mr-2 -ml-1">{leftIcon}</span>
                )}

                {children}

                {!loading && rightIcon && (
                    <span className="ml-2 -mr-1">{rightIcon}</span>
                )}
            </Comp>
        )
    }
)
Button.displayName = "Button"

export { Button, buttonVariants }

export interface ButtonGroupProps {
    /** Buttons to be grouped together */
    children: React.ReactNode
    /** Spacing between buttons */
    spacing?: 'none' | 'sm' | 'md'
    /** Whether buttons should take full width */
    fullWidth?: boolean
    /** Custom CSS classes */
    className?: string
}

/**
 * ButtonGroup - Container for grouping related buttons
 */
export function ButtonGroup({
    children,
    spacing = 'md',
    fullWidth = false,
    className,
}: ButtonGroupProps) {
    const spacingStyles = {
        none: 'gap-0',
        sm: 'gap-1',
        md: 'gap-2',
    }

    return (
        <div
            className={cn(
                'flex',
                spacingStyles[spacing],
                fullWidth && 'w-full',
                className
            )}
        >
            {children}
        </div>
    )
} 