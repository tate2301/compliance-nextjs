'use client'

import { ReactNode } from 'react'
import { cn } from '@/lib/utils'

export interface EmptyStateProps {
    /** The title describing the empty state */
    title: string
    /** Longer description of empty state */
    description?: string
    /** Primary action button/link */
    primaryAction?: ReactNode
    /** Secondary action button/link */
    secondaryAction?: ReactNode
    /** Icon displayed above the title */
    icon?: ReactNode
    /** Custom CSS class for the container */
    className?: string
    /** Array of recommendation items to display */
    recommendations?: {
        id: string
        title: string
        description?: string
        icon?: ReactNode
        action?: ReactNode
    }[]
    /** Whether to display recommendations in a grid layout */
    gridLayout?: boolean
    /** Whether to show a dashed border around the component */
    dashedBorder?: boolean
    /** Custom CSS class for the recommendations container */
    recommendationsClassName?: string
}

/**
 * EmptyState - A component for displaying empty states with optional actions
 * 
 * Empty states inform users that there is no data to display and 
 * provide actions they can take to populate the empty view.
 */
export function EmptyState({
    title,
    description,
    primaryAction,
    secondaryAction,
    icon,
    className,
    recommendations,
    gridLayout = false,
    dashedBorder = false,
    recommendationsClassName
}: EmptyStateProps) {
    return (
        <div className={cn(
            "px-6 py-14 text-center",
            dashedBorder && "border-2 border-dashed border-slate-6 rounded-lg",
            className
        )}>
            {icon && (
                <div className="mx-auto h-12 w-12 flex items-center justify-center rounded-full bg-slate-3 text-slate-11 mb-4">
                    {icon}
                </div>
            )}
            <h3 className="mt-2 text-lg font-semibold text-slate-12">{title}</h3>
            {description && (
                <p className="mt-1 text-sm text-slate-11 max-w-md mx-auto">{description}</p>
            )}

            {(primaryAction || secondaryAction) && (
                <div className="mt-6 flex justify-center gap-3">
                    {primaryAction}
                    {secondaryAction}
                </div>
            )}

            {recommendations && recommendations.length > 0 && (
                <div className={cn(
                    "mt-10",
                    gridLayout
                        ? "grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3"
                        : "space-y-4",
                    recommendationsClassName
                )}>
                    {recommendations.map((item) => (
                        <div
                            key={item.id}
                            className={cn(
                                "relative",
                                gridLayout
                                    ? "rounded-lg border border-slate-6 p-6 text-left"
                                    : "flex items-start p-4 rounded-lg hover:bg-slate-2 transition-colors"
                            )}
                        >
                            {item.icon && (
                                <div className={cn(
                                    "flex-shrink-0 h-10 w-10 rounded-md flex items-center justify-center bg-slate-3 text-slate-11",
                                    gridLayout ? "mx-auto mb-4" : "mr-4"
                                )}>
                                    {item.icon}
                                </div>
                            )}
                            <div className={gridLayout ? "text-center" : ""}>
                                <h4 className="text-base font-medium text-slate-12">{item.title}</h4>
                                {item.description && (
                                    <p className="mt-1 text-sm text-slate-11">{item.description}</p>
                                )}
                                {item.action && <div className="mt-4">{item.action}</div>}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
} 