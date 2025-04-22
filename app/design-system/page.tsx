'use client'

import React, { useState } from 'react'
import { cn } from '@/lib/utils'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import TabsDemo from './tabs-demo'
import ColorSystem from './color-system'
import TypographySystem from './typography-system'
import CaregiverDashboardExamples from './examples/caregiver-dashboard'
import PrimitivesPage from './examples/primitives/page'
import AdminDashboardExamples from './examples/admin-dashboard/page'

interface SidebarNavProps extends React.HTMLAttributes<HTMLElement> {
    items: {
        title: string
        value: string
        icon?: React.ReactNode
    }[]
    activeSection: string
    setActiveSection: (section: string) => void
}

function SidebarNav({ className, items, activeSection, setActiveSection, ...props }: SidebarNavProps) {
    return (
        <nav
            className={cn(
                "space-y-1",
                className
            )}
            {...props}
        >
            {items.map((item) => (
                <button
                    key={item.value}
                    onClick={() => setActiveSection(item.value)}
                    className={cn(
                        "flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all",
                        activeSection === item.value
                            ? "bg-primary-5 text-primary-11"
                            : "text-slate-11 hover:bg-slate-3 hover:text-slate-12"
                    )}
                >
                    {item.icon}
                    {item.title}
                </button>
            ))}
        </nav>
    )
}

const sidebarItems = [
    { title: "Examples", value: "examples" },
    { title: "Primitives", value: "primitives" },
    { title: "Admin Dashboard", value: "admin-dashboard" },
    { title: "Typography", value: "typography" },
    { title: "Colors", value: "colors" },
    { title: "Components", value: "components" },
    { title: "Tabs", value: "tabs" },
]

export default function DesignSystemPage() {
    const [activeSection, setActiveSection] = useState('examples')

    return (
        <div className="min-h-screen bg-slate-1">


            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    <aside className="lg:col-span-3">
                        <div className="sticky top-24">
                            <div className="space-y-4">
                                <div className="px-3">
                                    <h2 className="mb-2 text-lg font-semibold text-slate-12">Documentation</h2>
                                    <p className="text-sm text-slate-11">
                                        Browse through our design system documentation and examples.
                                    </p>
                                </div>
                                <Separator className="bg-slate-6" />
                                <ScrollArea className="h-[calc(100vh-12rem)]">
                                    <div className="px-1">
                                        <SidebarNav
                                            items={sidebarItems}
                                            activeSection={activeSection}
                                            setActiveSection={setActiveSection}
                                        />
                                    </div>
                                </ScrollArea>
                            </div>
                        </div>
                    </aside>

                    <main className="lg:col-span-9">
                        <div className="rounded-lg border border-slate-6 bg-slate-2 p-6">
                            {activeSection === 'examples' && <CaregiverDashboardExamples />}
                            {activeSection === 'primitives' && <PrimitivesPage />}
                            {activeSection === 'admin-dashboard' && <AdminDashboardExamples />}
                            {activeSection === 'typography' && <TypographySystem />}
                            {activeSection === 'colors' && <ColorSystem />}
                            {activeSection === 'components' && (
                                <div className="space-y-8">
                                    <h1 className="text-3xl font-bold text-slate-12">Components</h1>
                                    <p className="text-slate-11">Components overview coming soon</p>
                                </div>
                            )}
                            {activeSection === 'tabs' && <TabsDemo />}
                        </div>
                    </main>
                </div>
            </div>

            <footer className="border-t border-slate-6 bg-slate-2 py-8 mt-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <p className="text-center text-slate-11 text-sm">
                        Mercury Design System • Built with Next.js and Tailwind CSS
                    </p>
                </div>
            </footer>
        </div>
    )
} 