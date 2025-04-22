'use client'

import { ReactNode } from 'react'
import { X } from 'lucide-react'
import { cn } from '@/lib/utils'

interface BadgeProps {
    children: ReactNode
    variant?: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'destructive' | 'outline'
    size?: 'sm' | 'md' | 'lg'
    withDot?: boolean
    removable?: boolean
    onRemove?: () => void
    className?: string
}

/**
 * Badge - Small status descriptor for UI elements
 * 
 * Badges are used to highlight status, show counts, or categorize items
 * with small color-coded indicators.
 */
export function Badge({
    children,
    variant = 'default',
    size = 'md',
    withDot = false,
    removable = false,
    onRemove,
    className,
}: BadgeProps) {
    // Base styles for all badges
    const baseStyles = "inline-flex items-center font-medium rounded-full"

    // Size variations
    const sizeStyles = {
        sm: "px-2 py-0.5 text-xs",
        md: "px-2.5 py-0.5 text-xs",
        lg: "px-3 py-1 text-sm",
    }

    // Variant styles including background, text, and border colors
    const variantStyles = {
        default: "bg-slate-5 text-slate-12",
        primary: "bg-primary-9 text-white",
        secondary: "bg-secondary-9 text-white",
        success: "bg-success-9 text-white",
        warning: "bg-warning-9 text-slate-12",
        destructive: "bg-error-9 text-white",
        outline: "bg-transparent text-slate-12 border border-slate-6",
    }

    // Dot indicator styles with different colors based on variant
    const dotColorStyles = {
        default: "bg-slate-11",
        primary: "bg-primary-3",
        secondary: "bg-slate-3",
        success: "bg-success-3",
        warning: "bg-warning-3",
        destructive: "bg-error-3",
        outline: "bg-slate-9",
    }

    return (
        <span
            className={cn(
                baseStyles,
                sizeStyles[size],
                variantStyles[variant],
                className
            )}
        >
            {withDot && (
                <span className={cn("w-1.5 h-1.5 rounded-full mr-1", dotColorStyles[variant])} />
            )}

            <span className="flex-1">{children}</span>

            {removable && (
                <button
                    type="button"
                    onClick={onRemove}
                    className={cn(
                        "ml-1 -mr-1 rounded-full p-0.5 hover:bg-slate-5",
                        {
                            "hover:bg-primary-10": variant === "primary",
                            "hover:bg-slate-8": variant === "secondary",
                            "hover:bg-success-10": variant === "success",
                            "hover:bg-warning-10": variant === "warning",
                            "hover:bg-error-10": variant === "destructive",
                            "hover:bg-slate-4": variant === "outline",
                        }
                    )}
                >
                    <X className="h-3 w-3" />
                </button>
            )}
        </span>
    )
} 