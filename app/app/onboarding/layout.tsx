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

    return (
        <div className="container px-1 max-w-7xl py-8">
            <div>
                {children}
            </div>
        </div>
    )
}
