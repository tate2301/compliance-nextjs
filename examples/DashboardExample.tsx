import { useState } from 'react'
import Dashboard from '../components/Dashboard/Dashboard'

/**
 * Example implementation of a Mercury-inspired dashboard
 * 
 * This example demonstrates how to use the Mercury Design System
 * to create a modern, fluid dashboard interface.
 */
export default function DashboardExample() {
    const [userName] = useState('Taylor')
    const [userAvatar] = useState('https://api.dicebear.com/7.x/avataaars/svg?seed=Taylor')

    return (
        <div className="min-h-screen w-full bg-slate-1">
            <Dashboard
                userName={userName}
                userAvatar={userAvatar}
                spaceDescription="Your personalized workspace with Mercury Design System"
                backgroundImage="https://images.unsplash.com/photo-1579546929518-9e396f3cc809?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2370&q=80"
                className="bg-gradient-to-br from-slate-1 via-primary-2 to-slate-1"
            />
        </div>
    )
}

// Customization options for Mercury Design System
export const MercuryCustomizationGuide = () => {
    // This component is purely for documentation purposes
    return (
        <div className="hidden">
            {/* 
        Mercury Design System Customization Guide
        
        1. Theme Customization
           The Mercury Design System uses a semantic color system based on Radix Colors.
           Colors are organized in functional scales (slate, primary, secondary, etc.)
           with 12 steps each for maximum flexibility and accessibility.
           
        2. Component Customization
           Components follow these patterns:
           - Use Tailwind classes for styling
           - Accept className prop for custom styles
           - Follow mobile-first responsive design
           - Use semantic color tokens (e.g., bg-slate-1, text-slate-12)
           
        3. Creating New Spaces
           Spaces should:
           - Use appropriate semantic colors for hierarchy
           - Implement responsive layouts
           - Consider dark mode compatibility
           - Follow accessibility guidelines
           
        4. Creating Flows
           Flows should:
           - Use consistent spacing and alignment
           - Implement proper color contrast
           - Consider mobile breakpoints
           - Use semantic color tokens
           
        5. Creating Modules
           Modules should:
           - Follow atomic design principles
           - Use Mercury color system
           - Implement responsive patterns
           - Consider accessibility
           
        6. Best Practices
           - Use semantic color tokens (slate-1 through slate-12)
           - Implement dark mode support
           - Follow accessibility guidelines
           - Use responsive design patterns
           - Leverage Tailwind utility classes
      */}
        </div>
    )
} 