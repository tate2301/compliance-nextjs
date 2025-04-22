'use client'

import { ReactNode } from 'react'
import { X, AlertCircle, CheckCircle, Info, AlertTriangle } from 'lucide-react'
import { cn } from '@/lib/utils'

interface AlertProps {
    /** The variant of the alert */
    variant?: 'default' | 'destructive' | 'success' | 'warning' | 'info' | 'accent'
    /** Custom CSS class */
    className?: string
    /** Alert title */
    title?: string
    /** Alert content */
    children: ReactNode
    /** Whether the alert can be dismissed */
    dismissible?: boolean
    /** Function to call when the alert is dismissed */
    onDismiss?: () => void
    /** Custom icon to display */
    icon?: ReactNode
    /** Whether to show a border on the left side */
    withAccentBorder?: boolean
    /** Custom actions to display in the alert */
    actions?: ReactNode
}

/**
 * Alert - Provides important contextual feedback messages
 * 
 * Alerts are used to communicate important information to users,
 * such as success messages, error notifications, or general information.
 */
export function Alert({
    variant = 'default',
    className,
    title,
    children,
    dismissible = false,
    onDismiss,
    icon,
    withAccentBorder = false,
    actions,
}: AlertProps) {
    // Base styles for all alerts
    const baseStyles = "relative w-full rounded-lg p-4"

    // Variant styles for different alert types
    const variantStyles = {
        default: "bg-slate-2 text-slate-12 border border-slate-6",
        destructive: "bg-error-2 text-error-11 border border-error-6",
        success: "bg-success-2 text-success-11 border border-success-6",
        warning: "bg-warning-2 text-warning-11 border border-warning-6",
        info: "bg-blue-2 text-blue-11 border border-blue-6",
        accent: "bg-primary-2 text-primary-11 border border-primary-6",
    }

    // Accent border styles
    const accentBorderStyles = {
        default: "border-l-4 border-l-slate-9",
        destructive: "border-l-4 border-l-error-9",
        success: "border-l-4 border-l-success-9",
        warning: "border-l-4 border-l-warning-9",
        info: "border-l-4 border-l-blue-9",
        accent: "border-l-4 border-l-primary-9",
    }

    // Default icons based on variant
    const getDefaultIcon = () => {
        switch (variant) {
            case 'destructive':
                return <AlertCircle className="h-5 w-5 text-error-9" />;
            case 'success':
                return <CheckCircle className="h-5 w-5 text-success-9" />;
            case 'warning':
                return <AlertTriangle className="h-5 w-5 text-warning-9" />;
            case 'info':
                return <Info className="h-5 w-5 text-blue-9" />;
            case 'accent':
                return <Info className="h-5 w-5 text-primary-9" />;
            default:
                return <Info className="h-5 w-5 text-slate-9" />;
        }
    };

    return (
        <div
            className={cn(
                baseStyles,
                variantStyles[variant],
                withAccentBorder && accentBorderStyles[variant],
                className
            )}
        >
            {/* Dismiss button */}
            {dismissible && (
                <button
                    type="button"
                    onClick={onDismiss}
                    className="absolute right-3 top-3 rounded-full p-1 hover:bg-slate-4 focus:outline-none focus:ring-2 focus:ring-primary-8"
                    aria-label="Dismiss alert"
                >
                    <X className="h-4 w-4" />
                </button>
            )}

            <div className="flex">
                {/* Icon */}
                {(icon || getDefaultIcon()) && (
                    <div className="mr-3 flex-shrink-0 pt-0.5">
                        {icon || getDefaultIcon()}
                    </div>
                )}

                <div className="flex-1">
                    {/* Title */}
                    {title && (
                        <h5 className="mb-1 font-medium">
                            {title}
                        </h5>
                    )}

                    {/* Content */}
                    <div className={cn("text-sm", title && "mt-1")}>
                        {children}
                    </div>

                    {/* Actions */}
                    {actions && (
                        <div className="mt-3">
                            {actions}
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

interface AlertWithListProps extends Omit<AlertProps, 'children'> {
    items: string[];
}

export function AlertWithList({
    items,
    ...props
}: AlertWithListProps) {
    return (
        <Alert {...props}>
            <ul className="ml-6 list-disc">
                {items.map((item, index) => (
                    <li key={index} className="mt-1.5 first:mt-0">
                        {item}
                    </li>
                ))}
            </ul>
        </Alert>
    )
} 