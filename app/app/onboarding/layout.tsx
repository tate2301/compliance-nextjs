"use client";

import { Progress } from "@/components/ui/progress";
import OnboardingHeader from "@/app/app/components/OnboardingHeader";
import { useOnboardingData } from "@/app/hooks/useOnboardingData";

interface OnboardingLayoutProps {
    children: React.ReactNode;
}

export default function OnboardingLayout({ children }: OnboardingLayoutProps) {
    
    return (
        <div className="min-h-screen bg-sand-1  flex flex-col">
            <OnboardingHeader />
            
            <div className="container max-w-7xl mx-auto px-4 py-8 h-full">
                    {children}
            </div>
        </div>
    )
}
