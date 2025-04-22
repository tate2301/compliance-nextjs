'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import ButtonExamples from './buttons'
import FormExamples from './form-elements'
import FileUploadExamples from './file-upload'
import ModalExamples from './modals'
import LayoutExamples from './layouts'

const sections = [
    { id: 'buttons', title: 'Buttons', component: ButtonExamples },
    { id: 'forms', title: 'Form Elements', component: FormExamples },
    { id: 'file-upload', title: 'File Upload', component: FileUploadExamples },
    { id: 'modals', title: 'Modals', component: ModalExamples },
    { id: 'layouts', title: 'Page Layouts', component: LayoutExamples },
]

export default function AdminDashboardExamples() {
    const [activeSection, setActiveSection] = useState('buttons')

    return (
        <div className="relative">
            {/* Page Header */}
            <div className="flex items-center justify-between pb-8">
                <div className="space-y-1">
                    <h1 className="text-3xl font-bold tracking-tight text-slate-12">Admin Dashboard</h1>
                    <p className="text-lg text-slate-11">
                        UI patterns and components for building administrative interfaces
                    </p>
                </div>
            </div>

            <div className="flex flex-col space-y-8">
                {/* Navigation */}
                <div className="sticky top-0 z-30 -mx-6 bg-slate-1/95 px-6 py-4 backdrop-blur">
                    <ScrollArea orientation="horizontal" className="pb-2.5">
                        <div className="inline-flex h-9 items-center justify-start rounded-lg bg-slate-3 p-1">
                            {sections.map(({ id, title }) => (
                                <button
                                    key={id}
                                    onClick={() => setActiveSection(id)}
                                    className={cn(
                                        "inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-sm font-medium transition-all duration-300",
                                        activeSection === id
                                            ? "bg-slate-1 text-slate-12 shadow-sm"
                                            : "text-slate-11 hover:text-slate-12"
                                    )}
                                >
                                    {title}
                                </button>
                            ))}
                        </div>
                    </ScrollArea>
                    <Separator className="mt-4 bg-slate-6" />
                </div>

                {/* Content */}
                <div className="relative">
                    {sections.map(({ id, component: Component }) => (
                        activeSection === id && <Component key={id} />
                    ))}
                </div>
            </div>
        </div>
    )
} 