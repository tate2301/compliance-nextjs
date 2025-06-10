'use client'

import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { X, Check, Circle } from 'lucide-react'

interface ExampleCardProps {
    title: string
    children: React.ReactNode
    className?: string
}

function ExampleCard({ title, children, className = '' }: ExampleCardProps) {
    return (
        <div className="space-y-3">
            <h3 className="text-lg font-semibold text-sand-12">{title}</h3>
            <Card className={`p-4 border-sand-6 bg-sand-2 ${className}`}>
                {children}
            </Card>
        </div>
    )
}

export default function BadgeExamples() {
    return (
        <div className="space-y-8">
            <div className="space-y-4">
                <h2 className="text-2xl font-bold tracking-tight text-sand-12">Badge Examples</h2>
                <p className="text-sand-11">Examples of badge components following our Mercury design system guidelines.</p>
            </div>

            <div className="grid grid-cols-1 gap-6">
                {/* Basic Badges */}
                <ExampleCard title="Basic Badges">
                    <div className="flex flex-wrap gap-4">
                        <Badge>Default</Badge>
                        <Badge variant="secondary">Secondary</Badge>
                        <Badge variant="outline">Outline</Badge>
                        <Badge variant="destructive">Destructive</Badge>
                        <Badge className="bg-primary-9 hover:bg-primary-10">Primary</Badge>
                        <Badge className="bg-green-9 hover:bg-green-10 text-sand-1">Success</Badge>
                        <Badge className="bg-amber-9 hover:bg-amber-10 text-sand-1">Warning</Badge>
                        <Badge className="bg-red-9 hover:bg-red-10">Error</Badge>
                    </div>
                    <div className="mt-4 text-sm text-sand-11 font-mono">Badge variants using Radix colors</div>
                </ExampleCard>

                {/* Badges with Icons */}
                <ExampleCard title="Badges with Icons">
                    <div className="flex flex-wrap gap-4">
                        <Badge className="gap-1 bg-green-9 hover:bg-green-10 text-sand-1">
                            <Check className="h-3 w-3" /> Verified
                        </Badge>
                        <Badge className="gap-1 bg-red-9 hover:bg-red-10">
                            <X className="h-3 w-3" /> Rejected
                        </Badge>
                        <Badge variant="outline" className="gap-1">
                            <Circle className="h-2 w-2 fill-current" /> Recording
                        </Badge>
                    </div>
                    <div className="mt-4 text-sm text-sand-11 font-mono">Badges with icon+text combinations</div>
                </ExampleCard>

                {/* Status Badges */}
                <ExampleCard title="Status Badges">
                    <div className="flex flex-wrap gap-4">
                        <Badge className="gap-1.5 pl-1.5 bg-green-9 hover:bg-green-10 text-sand-1">
                            <Circle className="h-2 w-2 fill-green-5" /> Active
                        </Badge>
                        <Badge className="gap-1.5 pl-1.5 bg-amber-9 hover:bg-amber-10 text-sand-1">
                            <Circle className="h-2 w-2 fill-amber-5" /> Pending
                        </Badge>
                        <Badge className="gap-1.5 pl-1.5 bg-red-9 hover:bg-red-10">
                            <Circle className="h-2 w-2 fill-red-5" /> Offline
                        </Badge>
                        <Badge variant="outline" className="gap-1.5 pl-1.5">
                            <Circle className="h-2 w-2 fill-sand-5" /> Unknown
                        </Badge>
                    </div>
                    <div className="mt-4 text-sm text-sand-11 font-mono">Status indicators with subtle dot indicators</div>
                </ExampleCard>

                {/* Removable Badges */}
                <ExampleCard title="Removable Badges">
                    <div className="flex flex-wrap gap-4">
                        <Badge className="gap-1 pr-1">
                            Default
                            <button className="rounded-full hover:bg-sand-5 p-0.5 transition-all duration-300">
                                <X className="h-3 w-3" />
                            </button>
                        </Badge>
                        <Badge variant="secondary" className="gap-1 pr-1">
                            Secondary
                            <button className="rounded-full hover:bg-sand-7 p-0.5 transition-all duration-300">
                                <X className="h-3 w-3" />
                            </button>
                        </Badge>
                        <Badge variant="outline" className="gap-1 pr-1">
                            Outline
                            <button className="rounded-full hover:bg-sand-3 p-0.5 transition-all duration-300">
                                <X className="h-3 w-3" />
                            </button>
                        </Badge>
                    </div>
                    <div className="mt-4 text-sm text-sand-11 font-mono">Removable badges with smooth hover transitions</div>
                </ExampleCard>

                {/* Semantic Badges */}
                <ExampleCard title="Semantic Badges">
                    <div className="space-y-4">
                        <div className="flex flex-wrap gap-4">
                            <Badge className="bg-green-9 hover:bg-green-10 text-sand-1 transition-all duration-300">Completed</Badge>
                            <Badge className="bg-amber-9 hover:bg-amber-10 text-sand-1 transition-all duration-300">In Progress</Badge>
                            <Badge className="bg-red-9 hover:bg-red-10 transition-all duration-300">Failed</Badge>
                            <Badge className="bg-primary-9 hover:bg-primary-10 transition-all duration-300">Updated</Badge>
                        </div>
                        <div className="flex flex-wrap gap-4">
                            <Badge variant="outline" className="border-green-7 text-green-11 transition-all duration-300">Approved</Badge>
                            <Badge variant="outline" className="border-amber-7 text-amber-11 transition-all duration-300">Pending Review</Badge>
                            <Badge variant="outline" className="border-red-7 text-red-11 transition-all duration-300">Rejected</Badge>
                            <Badge variant="outline" className="border-primary-7 text-primary-11 transition-all duration-300">Draft</Badge>
                        </div>
                    </div>
                    <div className="mt-4 text-sm text-sand-11 font-mono">Context-appropriate semantic state indicators</div>
                </ExampleCard>

                {/* Large Badges */}
                <ExampleCard title="Large Badges">
                    <div className="flex flex-wrap gap-4">
                        <Badge className="text-base px-4 py-1 transition-all duration-300">Large Default</Badge>
                        <Badge variant="secondary" className="text-base px-4 py-1 transition-all duration-300">Large Secondary</Badge>
                        <Badge variant="outline" className="text-base px-4 py-1 transition-all duration-300">Large Outline</Badge>
                        <Badge className="text-base px-4 py-1 bg-primary-9 hover:bg-primary-10 transition-all duration-300">Large Primary</Badge>
                    </div>
                    <div className="mt-4 text-sm text-sand-11 font-mono">Larger badge variants for emphasis</div>
                </ExampleCard>
            </div>
        </div>
    )
} 