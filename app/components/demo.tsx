'use client'

import { useState } from 'react'
import { PlusCircle, Mail, Info, AlertTriangle, CheckCircle, FileQuestion, PackageOpen, Folder } from 'lucide-react'
import { Alert, AlertWithList } from '@/app/components/ui/alert'
import { Badge } from '@/app/components/ui/badge'
import { EmptyState } from '@/app/components/ui/empty-state'
import {
    indigo, slate, jade, amber, crimson, sky,
    spacing, elevation, radii
} from '@/lib/colors'
import { range } from '@/lib/utils'

export default function ComponentDemo() {
    const [showAlert1, setShowAlert1] = useState(true)
    const [showAlert2, setShowAlert2] = useState(true)

    return (
        <div className="p-8 bg-slate-1">
            <h1 className="text-3xl font-bold text-slate-12 mb-2">Mercury Design System</h1>
            <p className="text-slate-11 mb-8">Enhanced with a comprehensive Radix UI color system</p>

            {/* Color Palette */}
            <section className="mb-12">
                <h2 className="text-xl font-semibold text-slate-12 mb-4">Color Palette</h2>

                <div className="mb-8">
                    <h3 className="text-lg font-medium text-slate-12 mb-3">Primary (Indigo)</h3>
                    <div className="flex flex-wrap gap-2">
                        {Object.entries(indigo).map(([key, color]) => (
                            <div key={key} className="flex flex-col items-center">
                                <div
                                    className="h-14 w-14 rounded-md border border-slate-5"
                                    style={{ backgroundColor: color }}
                                ></div>
                                <div className="text-xs mt-1 text-slate-11">indigo-{key}</div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="mb-8">
                    <h3 className="text-lg font-medium text-slate-12 mb-3">Neutral (Slate)</h3>
                    <div className="flex flex-wrap gap-2">
                        {Object.entries(slate).map(([key, color]) => (
                            <div key={key} className="flex flex-col items-center">
                                <div
                                    className="h-14 w-14 rounded-md border border-slate-5"
                                    style={{ backgroundColor: color }}
                                ></div>
                                <div className="text-xs mt-1 text-slate-11">slate-{key}</div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-4">
                    <div>
                        <h3 className="text-lg font-medium text-slate-12 mb-3">Success (Jade)</h3>
                        <div className="flex flex-wrap gap-2">
                            {Object.entries(jade).map(([key, color]) => (
                                <div key={key} className="flex flex-col items-center">
                                    <div
                                        className="h-10 w-10 rounded-md border border-slate-5"
                                        style={{ backgroundColor: color }}
                                    ></div>
                                    <div className="text-xs mt-1 text-slate-11">{key}</div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div>
                        <h3 className="text-lg font-medium text-slate-12 mb-3">Warning (Amber)</h3>
                        <div className="flex flex-wrap gap-2">
                            {Object.entries(amber).map(([key, color]) => (
                                <div key={key} className="flex flex-col items-center">
                                    <div
                                        className="h-10 w-10 rounded-md border border-slate-5"
                                        style={{ backgroundColor: color }}
                                    ></div>
                                    <div className="text-xs mt-1 text-slate-11">{key}</div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div>
                        <h3 className="text-lg font-medium text-slate-12 mb-3">Error (Crimson)</h3>
                        <div className="flex flex-wrap gap-2">
                            {Object.entries(crimson).map(([key, color]) => (
                                <div key={key} className="flex flex-col items-center">
                                    <div
                                        className="h-10 w-10 rounded-md border border-slate-5"
                                        style={{ backgroundColor: color }}
                                    ></div>
                                    <div className="text-xs mt-1 text-slate-11">{key}</div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div>
                        <h3 className="text-lg font-medium text-slate-12 mb-3">Info/Focus (Sky)</h3>
                        <div className="flex flex-wrap gap-2">
                            {Object.entries(sky).map(([key, color]) => (
                                <div key={key} className="flex flex-col items-center">
                                    <div
                                        className="h-10 w-10 rounded-md border border-slate-5"
                                        style={{ backgroundColor: color }}
                                    ></div>
                                    <div className="text-xs mt-1 text-slate-11">{key}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Spacing */}
            <section className="mb-12">
                <h2 className="text-xl font-semibold text-slate-12 mb-4">Spacing</h2>
                <div className="flex flex-wrap gap-4 bg-slate-2 p-6 rounded-lg mb-4">
                    {Object.entries(spacing)
                        .filter(([key]) => Number(key) <= 12)
                        .map(([key, value]) => (
                            <div key={key} className="flex flex-col items-center">
                                <div
                                    className="bg-primary-9 rounded-sm"
                                    style={{ width: value, height: value }}
                                ></div>
                                <div className="text-xs mt-2 text-slate-11">spacing-{key}</div>
                                <div className="text-xs text-slate-9">{value}</div>
                            </div>
                        ))}
                </div>
            </section>

            {/* Elevation */}
            <section className="mb-12">
                <h2 className="text-xl font-semibold text-slate-12 mb-4">Elevation (Shadow)</h2>
                <div className="flex flex-wrap gap-8 bg-slate-2 p-6 rounded-lg">
                    {Object.entries(elevation)
                        .filter(([key]) => key !== 'focus')
                        .map(([key, value]) => (
                            <div key={key} className="flex flex-col items-center">
                                <div
                                    className="bg-white rounded-lg w-24 h-24"
                                    style={{ boxShadow: value }}
                                ></div>
                                <div className="text-xs mt-2 text-slate-11">elevation-{key}</div>
                            </div>
                        ))}
                </div>
            </section>

            {/* Border Radius */}
            <section className="mb-12">
                <h2 className="text-xl font-semibold text-slate-12 mb-4">Border Radius</h2>
                <div className="flex flex-wrap gap-8 bg-slate-2 p-6 rounded-lg">
                    {Object.entries(radii)
                        .map(([key, value]) => (
                            <div key={key} className="flex flex-col items-center">
                                <div
                                    className="bg-primary-9 w-16 h-16"
                                    style={{ borderRadius: value }}
                                ></div>
                                <div className="text-xs mt-2 text-slate-11">radii-{key}</div>
                                <div className="text-xs text-slate-9">{value}</div>
                            </div>
                        ))}
                </div>
            </section>

            {/* Alerts Demo */}
            <section className="mb-12">
                <h2 className="text-xl font-semibold text-slate-12 mb-4">Alerts</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {showAlert1 && (
                        <Alert
                            variant="info"
                            title="Important Update"
                            dismissible
                            onDismiss={() => setShowAlert1(false)}
                        >
                            Our platform will be undergoing maintenance on Saturday from 2-4am EST.
                        </Alert>
                    )}

                    {showAlert2 && (
                        <Alert
                            variant="destructive"
                            title="Action Required"
                            dismissible
                            onDismiss={() => setShowAlert2(false)}
                        >
                            Your subscription will expire in 3 days. Please renew to avoid service interruption.
                        </Alert>
                    )}

                    <Alert variant="success" title="Submission Received">
                        Your application has been successfully submitted. We will review it shortly.
                    </Alert>

                    <Alert variant="warning">
                        This action will permanently delete the selected items. This cannot be undone.
                    </Alert>

                    <Alert variant="accent" title="Pro Tip" icon={<Info className="h-4 w-4" />}>
                        You can press <kbd className="px-1 py-0.5 text-xs rounded border border-slate-6 bg-slate-3">⌘K</kbd> to open the command menu at any time.
                    </Alert>

                    <AlertWithList
                        variant="info"
                        title="Before you continue, please note:"
                        items={[
                            "All changes are saved automatically",
                            "You can invite up to 5 team members on the free plan",
                            "Upgrade to Pro for advanced features"
                        ]}
                    />
                </div>
            </section>

            {/* Badges Demo */}
            <section className="mb-12">
                <h2 className="text-xl font-semibold text-slate-12 mb-4">Badges</h2>
                <div className="space-y-6 bg-white p-6 rounded-lg shadow-1">
                    <div>
                        <h3 className="text-base font-medium text-slate-12 mb-3">Variants</h3>
                        <div className="flex flex-wrap gap-3">
                            <Badge>Default</Badge>
                            <Badge variant="primary">Primary</Badge>
                            <Badge variant="secondary">Secondary</Badge>
                            <Badge variant="success">Success</Badge>
                            <Badge variant="warning">Warning</Badge>
                            <Badge variant="destructive">Destructive</Badge>
                            <Badge variant="outline">Outline</Badge>
                        </div>
                    </div>

                    <div>
                        <h3 className="text-base font-medium text-slate-12 mb-3">Sizes</h3>
                        <div className="flex flex-wrap gap-3 items-center">
                            <Badge size="sm">Small</Badge>
                            <Badge>Default</Badge>
                            <Badge size="lg">Large</Badge>
                        </div>
                    </div>

                    <div>
                        <h3 className="text-base font-medium text-slate-12 mb-3">Shapes</h3>
                        <div className="flex flex-wrap gap-3">
                            <Badge shape="rounded">Rounded</Badge>
                            <Badge shape="square">Square</Badge>
                        </div>
                    </div>

                    <div>
                        <h3 className="text-base font-medium text-slate-12 mb-3">With Dot</h3>
                        <div className="flex flex-wrap gap-3">
                            <Badge withDot>With Dot</Badge>
                            <Badge variant="primary" withDot>Primary</Badge>
                            <Badge variant="success" withDot>Success</Badge>
                            <Badge variant="warning" withDot>Warning</Badge>
                            <Badge variant="destructive" withDot>Error</Badge>
                        </div>
                    </div>

                    <div>
                        <h3 className="text-base font-medium text-slate-12 mb-3">Removable</h3>
                        <div className="flex flex-wrap gap-3">
                            <Badge removable onRemove={() => alert('Badge removed')}>Removable</Badge>
                            <Badge variant="primary" removable onRemove={() => alert('Badge removed')}>Primary</Badge>
                            <Badge variant="success" removable onRemove={() => alert('Badge removed')}>Success</Badge>
                        </div>
                    </div>
                </div>
            </section>

            {/* Empty States Demo */}
            <section className="mb-12">
                <h2 className="text-xl font-semibold text-slate-12 mb-4">Empty States</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-white rounded-lg shadow-2">
                        <EmptyState
                            title="No projects found"
                            description="Get started by creating a new project."
                            icon={<Folder className="h-6 w-6" />}
                            primaryAction={
                                <button className="px-4 py-2 bg-primary-9 text-white rounded-md inline-flex items-center shadow-1 hover:bg-primary-10 transition-colors">
                                    <PlusCircle className="mr-2 h-4 w-4" />
                                    New Project
                                </button>
                            }
                            secondaryAction={
                                <button className="px-4 py-2 bg-white border border-slate-6 text-slate-11 rounded-md hover:bg-slate-2 transition-colors">
                                    Import
                                </button>
                            }
                        />
                    </div>

                    <div className="bg-white rounded-lg shadow-2">
                        <EmptyState
                            title="Your inbox is empty"
                            description="You've processed all your messages. Check back later for new notifications."
                            icon={<Mail className="h-6 w-6" />}
                            dashedBorder
                        />
                    </div>

                    <div className="bg-white rounded-lg shadow-2 md:col-span-2">
                        <EmptyState
                            title="Get started with templates"
                            description="Choose from our pre-built templates to jump-start your project"
                            icon={<FileQuestion className="h-6 w-6" />}
                            recommendations={[
                                {
                                    id: "1",
                                    title: "Marketing Website",
                                    description: "A complete website with homepage, about, and contact pages",
                                    icon: <PackageOpen className="h-5 w-5" />,
                                    action: <button className="px-3 py-1.5 bg-primary-9 text-white text-sm rounded hover:bg-primary-10 transition-colors">Use template</button>
                                },
                                {
                                    id: "2",
                                    title: "E-commerce Store",
                                    description: "Product catalog, cart, and checkout flow",
                                    icon: <PackageOpen className="h-5 w-5" />,
                                    action: <button className="px-3 py-1.5 bg-primary-9 text-white text-sm rounded hover:bg-primary-10 transition-colors">Use template</button>
                                },
                                {
                                    id: "3",
                                    title: "Portfolio",
                                    description: "Showcase your work with this minimal portfolio template",
                                    icon: <PackageOpen className="h-5 w-5" />,
                                    action: <button className="px-3 py-1.5 bg-primary-9 text-white text-sm rounded hover:bg-primary-10 transition-colors">Use template</button>
                                }
                            ]}
                        />
                    </div>
                </div>
            </section>

            {/* Usage Guide */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-slate-12 mb-4">Color Usage Guide</h2>
                <div className="bg-white p-6 rounded-lg shadow-2">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b border-slate-6">
                                <th className="text-left py-2 text-slate-12">Purpose</th>
                                <th className="text-left py-2 text-slate-12">Token</th>
                                <th className="text-left py-2 text-slate-12">Usage</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="border-b border-slate-4">
                                <td className="py-2 text-slate-12">Primary Actions</td>
                                <td className="py-2 text-slate-11">primary-9</td>
                                <td className="py-2 text-slate-11">Buttons, links, focus states</td>
                            </tr>
                            <tr className="border-b border-slate-4">
                                <td className="py-2 text-slate-12">Primary Text</td>
                                <td className="py-2 text-slate-11">slate-12</td>
                                <td className="py-2 text-slate-11">Headings, important text</td>
                            </tr>
                            <tr className="border-b border-slate-4">
                                <td className="py-2 text-slate-12">Secondary Text</td>
                                <td className="py-2 text-slate-11">slate-11</td>
                                <td className="py-2 text-slate-11">Body text, labels</td>
                            </tr>
                            <tr className="border-b border-slate-4">
                                <td className="py-2 text-slate-12">Subtle Text</td>
                                <td className="py-2 text-slate-11">slate-9</td>
                                <td className="py-2 text-slate-11">Placeholder text, hints</td>
                            </tr>
                            <tr className="border-b border-slate-4">
                                <td className="py-2 text-slate-12">Backgrounds</td>
                                <td className="py-2 text-slate-11">slate-1, white</td>
                                <td className="py-2 text-slate-11">Page and card backgrounds</td>
                            </tr>
                            <tr className="border-b border-slate-4">
                                <td className="py-2 text-slate-12">Subtle Backgrounds</td>
                                <td className="py-2 text-slate-11">slate-2, slate-3</td>
                                <td className="py-2 text-slate-11">Secondary buttons, hover states</td>
                            </tr>
                            <tr className="border-b border-slate-4">
                                <td className="py-2 text-slate-12">Borders</td>
                                <td className="py-2 text-slate-11">slate-6</td>
                                <td className="py-2 text-slate-11">Separators, borders around elements</td>
                            </tr>
                            <tr className="border-b border-slate-4">
                                <td className="py-2 text-slate-12">Success</td>
                                <td className="py-2 text-slate-11">success-9 (jade)</td>
                                <td className="py-2 text-slate-11">Success messages, confirmations</td>
                            </tr>
                            <tr className="border-b border-slate-4">
                                <td className="py-2 text-slate-12">Warning</td>
                                <td className="py-2 text-slate-11">warning-9 (amber)</td>
                                <td className="py-2 text-slate-11">Warnings, cautions</td>
                            </tr>
                            <tr>
                                <td className="py-2 text-slate-12">Error</td>
                                <td className="py-2 text-slate-11">error-9 (crimson)</td>
                                <td className="py-2 text-slate-11">Error messages, destructive actions</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </section>
        </div>
    )
} 