"use client";

import { ReactNode } from "react"
import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { useSearchParams } from "next/navigation"

interface OnboardingLayoutProps {
    children: ReactNode
}

export default function OnboardingLayout({ children }: OnboardingLayoutProps) {
    const searchParams = useSearchParams()
    const step = parseInt(searchParams.get("step") || "1")
    const totalSteps = 4 // Total number of onboarding forms

    return (
        <div className="container max-w-7xl py-8">
            <div className="mb-8 space-y-2">

                <Progress value={(step / totalSteps) * 100} className="h-2" />
            </div>
            <div >
                {children}
            </div>
        </div>
    )
}
