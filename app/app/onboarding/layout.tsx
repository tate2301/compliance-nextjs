"use client";

import { Progress } from "@/components/ui/progress";
import OnboardingHeader from "@/app/app/components/OnboardingHeader";
import { useOnboardingData } from "@/app/hooks/useOnboardingData";

interface OnboardingLayoutProps {
    children: React.ReactNode;
}

export default function OnboardingLayout({ children }: OnboardingLayoutProps) {
    const { totalSteps, completedSteps, progressPercentage } = useOnboardingData();
    
    return (
        <div className="min-h-screen bg-slate-1">
            <OnboardingHeader />
            
            <div className="container max-w-7xl mx-auto px-4 py-8">
                

                {/* Main content */}
                <div className="bg-card rounded-lg border border-slate-6 p-6">
                    {children}
                </div>
            </div>
        </div>
    )
}
