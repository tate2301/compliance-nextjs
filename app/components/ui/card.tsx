import { ReactNode, forwardRef } from 'react'
import { cn } from '@/lib/utils'

interface CardProps {
    /** The content of the card */
    children: ReactNode
    /** Custom CSS class for the card */
    className?: string
    /** Card variant */
    variant?: 'default' | 'outline' | 'ghost' | 'interactive' | 'elevated'
    /** HTML element to render the card as */
    as?: 'div' | 'article' | 'section'
    /** Whether the card should take the full height of its container */
    fullHeight?: boolean
}

/** 
 * Card - A versatile container component for grouping related content
 */
export const Card = forwardRef<HTMLDivElement, CardProps>(
    ({
        children,
        className,
        variant = 'default',
        as: Component = 'div',
        fullHeight = false,
        ...props
    }, ref) => {
        const variantStyles = {
            default: 'bg-slate-1 border border-slate-6',
            outline: 'border border-slate-6 bg-transparent',
            ghost: 'border-none bg-transparent',
            interactive: 'bg-slate-1 border border-slate-6 hover:border-slate-8 transition-colors cursor-pointer',
            elevated: 'bg-slate-1 border border-slate-6 shadow-md'
        }

        return (
            <Component
                ref={ref}
                className={cn(
                    'rounded-lg overflow-hidden',
                    variantStyles[variant],
                    fullHeight && 'h-full',
                    className
                )}
                {...props}
            >
                {children}
            </Component>
        )
    }
)
Card.displayName = 'Card'

interface CardHeaderProps {
    /** The content of the card header */
    children: ReactNode
    /** Custom CSS class for the header */
    className?: string
}

/**
 * CardHeader - Container for the title and description of a card
 */
export function CardHeader({
    children,
    className,
}: CardHeaderProps) {
    return (
        <div
            className={cn(
                'flex flex-col space-y-1.5 p-6',
                className
            )}
        >
            {children}
        </div>
    )
}

interface CardTitleProps {
    /** The content of the card title */
    children: ReactNode
    /** Custom CSS class for the title */
    className?: string
    /** HTML element to render the title as */
    as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
}

/**
 * CardTitle - A heading element for card titles
 */
export function CardTitle({
    children,
    className,
    as: Component = 'h3',
}: CardTitleProps) {
    return (
        <Component
            className={cn(
                'text-lg font-semibold leading-none tracking-tight text-slate-12',
                className
            )}
        >
            {children}
        </Component>
    )
}

interface CardDescriptionProps {
    /** The content of the card description */
    children: ReactNode
    /** Custom CSS class for the description */
    className?: string
}

/**
 * CardDescription - Text element for additional context
 */
export function CardDescription({
    children,
    className,
}: CardDescriptionProps) {
    return (
        <p
            className={cn(
                'text-sm text-slate-11',
                className
            )}
        >
            {children}
        </p>
    )
}

interface CardContentProps {
    /** The content of the card content section */
    children: ReactNode
    /** Custom CSS class for the content area */
    className?: string
    /** Remove default padding */
    noPadding?: boolean
}

/**
 * CardContent - Container for the main content of a card
 */
export function CardContent({
    children,
    className,
    noPadding = false,
}: CardContentProps) {
    return (
        <div
            className={cn(
                !noPadding && 'p-6 pt-0',
                className
            )}
        >
            {children}
        </div>
    )
}

interface CardFooterProps {
    /** The content of the card footer */
    children: ReactNode
    /** Custom CSS class for the footer */
    className?: string
}

/**
 * CardFooter - Container for supplementary content or actions
 */
export function CardFooter({
    children,
    className,
}: CardFooterProps) {
    return (
        <div
            className={cn(
                'flex items-center p-6 pt-0',
                className
            )}
        >
            {children}
        </div>
    )
}

interface CardActionsProps {
    /** The action buttons or links */
    children: ReactNode
    /** Custom CSS class for the actions container */
    className?: string
    /** Whether to align actions to the right */
    alignRight?: boolean
}

/**
 * CardActions - Container for card action buttons or links
 */
export function CardActions({
    children,
    className,
    alignRight = false,
}: CardActionsProps) {
    return (
        <div
            className={cn(
                'flex gap-2',
                alignRight && 'justify-end',
                className
            )}
        >
            {children}
        </div>
    )
} 