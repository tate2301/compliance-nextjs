'use client'

import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Plus, Trash, Edit, Download, Upload, MoreHorizontal, Search, Filter, Loader2, ChevronRight, ChevronLeft } from 'lucide-react'
import { Separator } from '@/components/ui/separator'

interface ExampleCardProps {
    title: string
    children: React.ReactNode
    description?: string
    className?: string
}

function ExampleCard({ title, children, description, className = '' }: ExampleCardProps) {
    return (
        <div className="space-y-3">
            <div className="space-y-1">
                <h3 className="text-lg font-semibold text-sand-12">{title}</h3>
                {description && <p className="text-sm text-sand-11">{description}</p>}
            </div>
            <Card className={`p-4 border-sand-6 bg-sand-2 ${className}`}>
                {children}
            </Card>
        </div>
    )
}

export default function ButtonExamples() {
    return (
        <div className="space-y-10">
            <div className="space-y-4">
                <h2 className="text-2xl font-bold tracking-tight text-sand-12">Button Examples</h2>
                <p className="text-sand-11">Examples of button patterns commonly used in admin dashboards.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* CRUD Action Buttons */}
                <ExampleCard
                    title="CRUD Action Buttons"
                    description="Common buttons for create, read, update, delete operations"
                >
                    <div className="space-y-6">
                        <div className="flex flex-wrap gap-3">
                            <Button className="bg-primary-9 hover:bg-primary-10 text-white transition-all duration-300">
                                <Plus className="mr-2 h-4 w-4" /> Add New
                            </Button>
                            <Button variant="outline" className="border-sand-7 text-sand-11 hover:text-sand-12 hover:bg-sand-3 transition-all duration-300">
                                <Edit className="mr-2 h-4 w-4" /> Edit
                            </Button>
                            <Button variant="destructive" className="transition-all duration-300">
                                <Trash className="mr-2 h-4 w-4" /> Delete
                            </Button>
                        </div>
                        <div className="text-sm text-sand-11 font-mono">Primary action buttons with consistent spacing</div>
                    </div>
                </ExampleCard>

                {/* Data Table Actions */}
                <ExampleCard
                    title="Data Table Actions"
                    description="Button patterns for tables and data grids"
                >
                    <div className="space-y-6">
                        <div className="flex items-center justify-between w-full">
                            <div className="flex gap-2">
                                <Button variant="outline" size="sm" className="h-8 transition-all duration-300">
                                    <Filter className="mr-2 h-3.5 w-3.5" /> Filter
                                </Button>
                                <Button variant="outline" size="sm" className="h-8 transition-all duration-300">
                                    <Download className="mr-2 h-3.5 w-3.5" /> Export
                                </Button>
                            </div>
                            <Button size="sm" className="h-8 text-white transition-all duration-300">
                                <Plus className="mr-2 h-3.5 w-3.5" /> Add Record
                            </Button>
                        </div>
                        <div className="text-sm text-sand-11 font-mono">Table-specific action buttons</div>
                    </div>
                </ExampleCard>

                {/* Button Groups */}
                <ExampleCard
                    title="Button Groups"
                    description="Grouped buttons for related actions"
                >
                    <div className="space-y-6">
                        <div className="inline-flex rounded-md shadow-sm">
                            <Button variant="outline" className="rounded-r-none border-r-0 transition-all duration-300">Day</Button>
                            <Button variant="outline" className="rounded-none border-r-0 transition-all duration-300">Week</Button>
                            <Button variant="outline" className="rounded-l-none transition-all duration-300">Month</Button>
                        </div>

                        <div className="flex gap-1 rounded-md bg-sand-3 p-1 w-fit">
                            <Button variant="ghost" className="bg-sand-1 shadow-sm text-sand-12 transition-all duration-300">List</Button>
                            <Button variant="ghost" className="text-sand-11 hover:text-sand-12 transition-all duration-300">Grid</Button>
                            <Button variant="ghost" className="text-sand-11 hover:text-sand-12 transition-all duration-300">Table</Button>
                        </div>
                        <div className="text-sm text-sand-11 font-mono">Visually connected button groups</div>
                    </div>
                </ExampleCard>

                {/* Loading States */}
                <ExampleCard
                    title="Loading States"
                    description="Buttons showing loading and progress states"
                >
                    <div className="space-y-6">
                        <div className="flex flex-wrap gap-3">
                            <Button disabled className="text-white transition-all duration-300">
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Processing
                            </Button>
                            <Button variant="outline" disabled className="transition-all duration-300">
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Saving
                            </Button>
                            <Button variant="secondary" disabled className="transition-all duration-300">
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Uploading
                            </Button>
                        </div>
                        <div className="text-sm text-sand-11 font-mono">Buttons with loading indicators</div>
                    </div>
                </ExampleCard>

                {/* Pagination Buttons */}
                <ExampleCard
                    title="Pagination"
                    description="Navigation buttons for paginated data"
                >
                    <div className="space-y-6">
                        <div className="flex items-center justify-center gap-1">
                            <Button variant="outline" size="icon" className="w-8 h-8 transition-all duration-300">
                                <ChevronLeft className="h-4 w-4" />
                            </Button>
                            <Button variant="outline" size="sm" className="h-8 w-8 transition-all duration-300">1</Button>
                            <Button variant="outline" size="sm" className="h-8 w-8 bg-primary-4 text-primary-11 transition-all duration-300">2</Button>
                            <Button variant="outline" size="sm" className="h-8 w-8 transition-all duration-300">3</Button>
                            <Button variant="outline" size="sm" className="h-8 w-8 transition-all duration-300">...</Button>
                            <Button variant="outline" size="sm" className="h-8 w-8 transition-all duration-300">10</Button>
                            <Button variant="outline" size="icon" className="w-8 h-8 transition-all duration-300">
                                <ChevronRight className="h-4 w-4" />
                            </Button>
                        </div>
                        <div className="text-sm text-sand-11 font-mono">Pagination controls with active state</div>
                    </div>
                </ExampleCard>

                {/* Action Buttons */}
                <ExampleCard
                    title="Dropdown & Context Buttons"
                    description="Buttons for revealing additional options"
                >
                    <div className="space-y-6">
                        <div className="flex flex-wrap gap-3">
                            <Button size="sm" variant="ghost" className="h-8 w-8 p-0 transition-all duration-300">
                                <MoreHorizontal className="h-4 w-4" />
                            </Button>
                            <Button size="sm" variant="outline" className="h-8 transition-all duration-300">
                                More Options <ChevronRight className="ml-2 h-4 w-4" />
                            </Button>
                            <Button size="sm" variant="secondary" className="h-8 transition-all duration-300">
                                Bulk Actions <ChevronRight className="ml-2 h-4 w-4" />
                            </Button>
                        </div>
                        <div className="text-sm text-sand-11 font-mono">Buttons for accessing additional actions</div>
                    </div>
                </ExampleCard>
            </div>

            {/* Full Width Button Section */}
            <Separator className="my-8 bg-sand-6" />

            <ExampleCard
                title="Admin Toolbar Example"
                description="A complete toolbar for admin dashboard header"
            >
                <div className="space-y-6">
                    <div className="flex items-center justify-between w-full flex-wrap gap-4">
                        <div className="flex items-center gap-3">
                            <Button className="bg-primary-9 hover:bg-primary-10 text-white transition-all duration-300">
                                <Plus className="mr-2 h-4 w-4" /> Create New
                            </Button>
                            <Button variant="outline" className="border-sand-7 transition-all duration-300">
                                <Upload className="mr-2 h-4 w-4" /> Import
                            </Button>
                            <Button variant="outline" className="border-sand-7 transition-all duration-300">
                                <Download className="mr-2 h-4 w-4" /> Export
                            </Button>
                        </div>

                        <div className="flex items-center gap-3">
                            <Button variant="outline" size="sm" className="h-9 transition-all duration-300">
                                <Filter className="mr-2 h-4 w-4" /> Filter
                            </Button>
                            <Button variant="outline" size="sm" className="h-9 transition-all duration-300">
                                <Search className="mr-2 h-4 w-4" /> Search
                            </Button>
                            <Button variant="secondary" size="sm" className="h-9 transition-all duration-300">
                                <MoreHorizontal className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>
                    <div className="text-sm text-sand-11 font-mono">Complete admin dashboard toolbar layout</div>
                </div>
            </ExampleCard>
        </div>
    )
} 