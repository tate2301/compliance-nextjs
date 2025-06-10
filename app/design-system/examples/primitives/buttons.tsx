'use client'

import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Loader2, Send, Plus, Trash, Settings, Check, X } from 'lucide-react'

interface ExampleCardProps {
    title: string
    children: React.ReactNode
    className?: string
}

function ExampleCard({ title, children, className = '' }: ExampleCardProps) {
    return (
        <div className="space-y-3">
            <h3 className="text-lg font-semibold text-sand-12">{title}</h3>
            <Card className={`p-4 ${className}`}>
                {children}
            </Card>
        </div>
    )
}

export default function ButtonExamples() {
    return (
        <div className="space-y-8">
            <div className="space-y-4">
                <h2 className="text-2xl font-bold text-sand-12">Button Examples</h2>
                <p className="text-sand-11">Examples of button components following our design system guidelines.</p>
            </div>

            <div className="grid grid-cols-1 gap-6">
                {/* Basic Buttons */}
                <ExampleCard title="Basic Buttons">
                    <div className="flex flex-wrap gap-4">
                        <Button>Default</Button>
                        <Button variant="secondary">Secondary</Button>
                        <Button variant="outline">Outline</Button>
                        <Button variant="ghost">Ghost</Button>
                        <Button variant="link">Link</Button>
                        <Button variant="destructive">Destructive</Button>
                    </div>
                    <code className="mt-4 block text-sm text-sand-11">Basic button variants</code>
                </ExampleCard>

                {/* Semantic Buttons */}
                <ExampleCard title="Semantic Buttons">
                    <div className="flex flex-wrap gap-4">
                        <Button className="bg-primary-9 hover:bg-primary-10">Primary Action</Button>
                        <Button className="bg-success-9 hover:bg-success-10 text-sand-1">Success</Button>
                        <Button className="bg-warning-9 hover:bg-warning-10 text-sand-1">Warning</Button>
                        <Button className="bg-error-9 hover:bg-error-10">Error</Button>
                    </div>
                    <code className="mt-4 block text-sm text-sand-11">Semantic button states</code>
                </ExampleCard>

                {/* Buttons with Icons */}
                <ExampleCard title="Buttons with Icons">
                    <div className="space-y-4">
                        <div className="flex flex-wrap gap-4">
                            <Button>
                                <Plus className="mr-2 h-4 w-4" /> Add New
                            </Button>
                            <Button variant="secondary">
                                <Settings className="mr-2 h-4 w-4" /> Settings
                            </Button>
                            <Button variant="destructive">
                                <Trash className="mr-2 h-4 w-4" /> Delete
                            </Button>
                        </div>
                        <div className="flex flex-wrap gap-4">
                            <Button variant="outline" size="icon">
                                <Plus className="h-4 w-4" />
                            </Button>
                            <Button variant="outline" size="icon">
                                <Settings className="h-4 w-4" />
                            </Button>
                            <Button variant="outline" size="icon">
                                <Trash className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>
                    <code className="mt-4 block text-sm text-sand-11">Buttons with icons and icon-only variants</code>
                </ExampleCard>

                {/* Button States */}
                <ExampleCard title="Button States">
                    <div className="space-y-4">
                        <div className="flex flex-wrap gap-4">
                            <Button disabled>Disabled</Button>
                            <Button disabled variant="secondary">Disabled</Button>
                            <Button disabled variant="destructive">Disabled</Button>
                        </div>
                        <div className="flex flex-wrap gap-4">
                            <Button>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Loading
                            </Button>
                            <Button variant="secondary">
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Loading
                            </Button>
                            <Button variant="outline">
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Loading
                            </Button>
                        </div>
                    </div>
                    <code className="mt-4 block text-sm text-sand-11">Button states: disabled and loading</code>
                </ExampleCard>

                {/* Button Sizes */}
                <ExampleCard title="Button Sizes">
                    <div className="flex items-center gap-4">
                        <Button size="lg">Large</Button>
                        <Button>Default</Button>
                        <Button size="sm">Small</Button>
                    </div>
                    <code className="mt-4 block text-sm text-sand-11">Button size variants</code>
                </ExampleCard>

                {/* Button Groups */}
                <ExampleCard title="Button Groups">
                    <div className="space-y-4">
                        <div className="inline-flex rounded-lg border border-sand-6 p-1">
                            <Button variant="ghost" className="rounded-sm">Day</Button>
                            <Button variant="ghost" className="rounded-sm">Week</Button>
                            <Button variant="default" className="rounded-sm">Month</Button>
                            <Button variant="ghost" className="rounded-sm">Year</Button>
                        </div>
                        <div className="flex gap-2">
                            <Button variant="outline" className="w-full">Cancel</Button>
                            <Button className="w-full">Submit</Button>
                        </div>
                    </div>
                    <code className="mt-4 block text-sm text-sand-11">Button groups and layouts</code>
                </ExampleCard>

                {/* Action Buttons */}
                <ExampleCard title="Action Buttons">
                    <div className="space-y-4">
                        <div className="flex flex-wrap gap-4">
                            <Button className="bg-success-9 hover:bg-success-10 text-sand-1">
                                <Check className="mr-2 h-4 w-4" /> Approve
                            </Button>
                            <Button className="bg-error-9 hover:bg-error-10">
                                <X className="mr-2 h-4 w-4" /> Reject
                            </Button>
                            <Button variant="outline" className="border-warning-7 text-warning-11 hover:bg-warning-3">
                                <Send className="mr-2 h-4 w-4" /> Send for Review
                            </Button>
                        </div>
                    </div>
                    <code className="mt-4 block text-sm text-sand-11">Contextual action buttons</code>
                </ExampleCard>
            </div>
        </div>
    )
} 