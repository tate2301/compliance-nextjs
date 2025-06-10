'use client'

import React, { useState } from 'react'
import { Moon, Sun } from 'lucide-react'

interface ColorSwatch {
    scale: number
    description: string
    usage: string
    example?: React.ReactNode
}

interface ColorScale {
    name: string
    description: string
    swatches: ColorSwatch[]
}

const colorScales: ColorScale[] = [
    {
        name: 'sand',
        description: 'The default neutral color scale used for backgrounds, text, and dividers',
        swatches: [
            {
                scale: 1,
                description: 'App background',
                usage: 'Main page backgrounds',
                example: <div className="w-full h-8 bg-sand-1 rounded" />
            },
            {
                scale: 2,
                description: 'Subtle background',
                usage: 'Subtle backgrounds for hover states',
                example: <div className="w-full h-8 bg-sand-2 rounded" />
            },
            {
                scale: 3,
                description: 'UI element background',
                usage: 'Background for UI elements like cards and inputs',
                example: <div className="w-full h-8 bg-sand-3 rounded" />
            },
            {
                scale: 4,
                description: 'Hovered UI element background',
                usage: 'Background for hovered UI elements',
                example: <div className="w-full h-8 bg-sand-4 rounded" />
            },
            {
                scale: 5,
                description: 'Active UI element background',
                usage: 'Background for active UI elements',
                example: <div className="w-full h-8 bg-sand-5 rounded" />
            },
            {
                scale: 6,
                description: 'Subtle borders',
                usage: 'Subtle borders for containers',
                example: <div className="w-full h-8 border-2 border-sand-6 rounded" />
            },
            {
                scale: 7,
                description: 'UI element borders',
                usage: 'Borders for UI elements like cards and inputs',
                example: <div className="w-full h-8 border-2 border-sand-7 rounded" />
            },
            {
                scale: 8,
                description: 'Hovered UI element borders',
                usage: 'Borders for hovered UI elements',
                example: <div className="w-full h-8 border-2 border-sand-8 rounded" />
            },
            {
                scale: 9,
                description: 'Solid backgrounds',
                usage: 'Solid background for UI elements',
                example: <div className="w-full h-8 bg-sand-9 rounded" />
            },
            {
                scale: 10,
                description: 'Hovered solid backgrounds',
                usage: 'Hovered background for UI elements',
                example: <div className="w-full h-8 bg-sand-10 rounded" />
            },
            {
                scale: 11,
                description: 'Low-contrast text',
                usage: 'Low-contrast text like placeholders and descriptions',
                example: <p className="text-sand-11">Example Text</p>
            },
            {
                scale: 12,
                description: 'High-contrast text',
                usage: 'High-contrast text like headings and body text',
                example: <p className="text-sand-12 font-medium">Example Text</p>
            },
        ]
    },
    {
        name: 'primary',
        description: 'The primary color scale used for main actions and primary UI elements',
        swatches: [
            {
                scale: 1,
                description: 'Subtle background',
                usage: 'Subtle primary backgrounds',
                example: <div className="w-full h-8 bg-primary-1 rounded" />
            },
            {
                scale: 2,
                description: 'UI element background',
                usage: 'Background for primary UI elements',
                example: <div className="w-full h-8 bg-primary-2 rounded" />
            },
            {
                scale: 3,
                description: 'Hovered UI element background',
                usage: 'Background for hovered primary UI elements',
                example: <div className="w-full h-8 bg-primary-3 rounded" />
            },
            {
                scale: 4,
                description: 'Active UI element background',
                usage: 'Background for active primary UI elements',
                example: <div className="w-full h-8 bg-primary-4 rounded" />
            },
            {
                scale: 5,
                description: 'Subtle borders',
                usage: 'Subtle borders for primary UI elements',
                example: <div className="w-full h-8 border-2 border-primary-5 rounded" />
            },
            {
                scale: 6,
                description: 'UI element borders',
                usage: 'Borders for primary UI elements',
                example: <div className="w-full h-8 border-2 border-primary-6 rounded" />
            },
            {
                scale: 7,
                description: 'Hovered UI element borders',
                usage: 'Borders for hovered primary UI elements',
                example: <div className="w-full h-8 border-2 border-primary-7 rounded" />
            },
            {
                scale: 8,
                description: 'Solid borders',
                usage: 'Solid borders for primary UI elements',
                example: <div className="w-full h-8 border-2 border-primary-8 rounded" />
            },
            {
                scale: 9,
                description: 'Solid backgrounds',
                usage: 'Main primary color for buttons and highlights',
                example: <button className="px-4 py-2 bg-primary-9 text-white rounded">Button Example</button>
            },
            {
                scale: 10,
                description: 'Hovered solid backgrounds',
                usage: 'Hover state for primary buttons',
                example: <div className="w-full h-8 bg-primary-10 rounded" />
            },
            {
                scale: 11,
                description: 'Low-contrast text',
                usage: 'Low-contrast primary text',
                example: <p className="text-primary-11">Example Text</p>
            },
            {
                scale: 12,
                description: 'High-contrast text',
                usage: 'High-contrast primary text',
                example: <p className="text-primary-12 font-medium">Example Text</p>
            },
        ]
    },
    {
        name: 'secondary',
        description: 'The secondary color scale used for secondary actions and UI elements',
        swatches: [
            {
                scale: 1,
                description: 'Subtle background',
                usage: 'Subtle secondary backgrounds',
                example: <div className="w-full h-8 bg-secondary-1 rounded" />
            },
            {
                scale: 2,
                description: 'UI element background',
                usage: 'Background for secondary UI elements',
                example: <div className="w-full h-8 bg-secondary-2 rounded" />
            },
            {
                scale: 3,
                description: 'Hovered UI element background',
                usage: 'Background for hovered secondary UI elements',
                example: <div className="w-full h-8 bg-secondary-3 rounded" />
            },
            {
                scale: 4,
                description: 'Active UI element background',
                usage: 'Background for active secondary UI elements',
                example: <div className="w-full h-8 bg-secondary-4 rounded" />
            },
            {
                scale: 5,
                description: 'Subtle borders',
                usage: 'Subtle borders for secondary UI elements',
                example: <div className="w-full h-8 border-2 border-secondary-5 rounded" />
            },
            {
                scale: 6,
                description: 'UI element borders',
                usage: 'Borders for secondary UI elements',
                example: <div className="w-full h-8 border-2 border-secondary-6 rounded" />
            },
            {
                scale: 7,
                description: 'Hovered UI element borders',
                usage: 'Borders for hovered secondary UI elements',
                example: <div className="w-full h-8 border-2 border-secondary-7 rounded" />
            },
            {
                scale: 8,
                description: 'Solid borders',
                usage: 'Solid borders for secondary UI elements',
                example: <div className="w-full h-8 border-2 border-secondary-8 rounded" />
            },
            {
                scale: 9,
                description: 'Solid backgrounds',
                usage: 'Main secondary color for buttons and highlights',
                example: <button className="px-4 py-2 bg-secondary-9 text-white rounded">Button Example</button>
            },
            {
                scale: 10,
                description: 'Hovered solid backgrounds',
                usage: 'Hover state for secondary buttons',
                example: <div className="w-full h-8 bg-secondary-10 rounded" />
            },
            {
                scale: 11,
                description: 'Low-contrast text',
                usage: 'Low-contrast secondary text',
                example: <p className="text-secondary-11">Example Text</p>
            },
            {
                scale: 12,
                description: 'High-contrast text',
                usage: 'High-contrast secondary text',
                example: <p className="text-secondary-12 font-medium">Example Text</p>
            },
        ]
    },
    {
        name: 'success',
        description: 'The success color scale used for successful states and actions',
        swatches: [
            {
                scale: 1,
                description: 'Subtle background',
                usage: 'Success status backgrounds',
                example: <div className="w-full h-8 bg-success-1 rounded" />
            },
            {
                scale: 2,
                description: 'UI element background',
                usage: 'Background for success UI elements',
                example: <div className="w-full h-8 bg-success-2 rounded" />
            },
            {
                scale: 9,
                description: 'Solid backgrounds',
                usage: 'Success alerts and indicators',
                example: <div className="flex items-center space-x-2 px-4 py-2 bg-success-9 text-white rounded">
                    <span>✓</span>
                    <span>Operation successful</span>
                </div>
            },
            {
                scale: 11,
                description: 'Low-contrast text',
                usage: 'Success text and descriptions',
                example: <p className="text-success-11">Example Success Text</p>
            },
            {
                scale: 12,
                description: 'High-contrast text',
                usage: 'High-contrast success text',
                example: <p className="text-success-12 font-medium">Example Success Text</p>
            },
        ]
    },
    {
        name: 'warning',
        description: 'The warning color scale used for warning states and actions',
        swatches: [
            {
                scale: 1,
                description: 'Subtle background',
                usage: 'Warning status backgrounds',
                example: <div className="w-full h-8 bg-warning-1 rounded" />
            },
            {
                scale: 2,
                description: 'UI element background',
                usage: 'Background for warning UI elements',
                example: <div className="w-full h-8 bg-warning-2 rounded" />
            },
            {
                scale: 9,
                description: 'Solid backgrounds',
                usage: 'Warning alerts and indicators',
                example: <div className="flex items-center space-x-2 px-4 py-2 bg-warning-9 text-white rounded">
                    <span>⚠️</span>
                    <span>Warning message</span>
                </div>
            },
            {
                scale: 11,
                description: 'Low-contrast text',
                usage: 'Warning text and descriptions',
                example: <p className="text-warning-11">Example Warning Text</p>
            },
            {
                scale: 12,
                description: 'High-contrast text',
                usage: 'High-contrast warning text',
                example: <p className="text-warning-12 font-medium">Example Warning Text</p>
            },
        ]
    },
    {
        name: 'error',
        description: 'The error color scale used for error states and actions',
        swatches: [
            {
                scale: 1,
                description: 'Error background',
                usage: 'Error status backgrounds',
                example: <div className="w-full h-8 bg-error-1 rounded" />
            },
            {
                scale: 2,
                description: 'UI element background',
                usage: 'Background for error UI elements',
                example: <div className="w-full h-8 bg-error-2 rounded" />
            },
            {
                scale: 7,
                description: 'Error borders',
                usage: 'Borders for error inputs and elements',
                example: <input type="text" className="w-full border-2 border-error-7 rounded px-3 py-1" placeholder="Error input" />
            },
            {
                scale: 8,
                description: 'Focused error borders',
                usage: 'Focused borders for error inputs',
                example: <div className="w-full h-8 border-2 border-error-8 rounded" />
            },
            {
                scale: 9,
                description: 'Error indicators',
                usage: 'Error alerts and indicators',
                example: <div className="flex items-center space-x-2 text-error-9">
                    <span>⚠️</span>
                    <span>Error message</span>
                </div>
            },
            {
                scale: 11,
                description: 'Low-contrast text',
                usage: 'Error text and descriptions',
                example: <p className="text-error-11">Example Text</p>
            },
            {
                scale: 12,
                description: 'High-contrast text',
                usage: 'High-contrast error text',
                example: <p className="text-error-12 font-medium">Example Text</p>
            },
        ]
    },
]

export default function ColorSystem() {
    const [theme, setTheme] = useState<'light' | 'dark'>('light')

    const toggleTheme = () => {
        setTheme(theme === 'light' ? 'dark' : 'light')
        // In a real application, this would update the theme in localStorage and trigger
        // document class changes to apply dark mode
    }

    return (
        <div className={`space-y-12 ${theme === 'dark' ? 'dark' : ''}`}>
            <div className="flex justify-between items-center">
                <div className="space-y-4">
                    <h1 className="text-3xl font-bold text-sand-12">Mercury Design System Color System</h1>
                    <p className="text-lg text-sand-11">
                        Mercury uses a hierarchical color system with functional scales following the Radix Colors convention.
                        Each color scale includes 12 steps, where step 1 is the lightest and step 12 is the darkest.
                    </p>
                </div>
                <button
                    onClick={toggleTheme}
                    className="p-2 rounded-full bg-sand-3 hover:bg-sand-4 transition-colors"
                    aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
                >
                    {theme === 'light' ? (
                        <Moon className="w-5 h-5 text-sand-11" />
                    ) : (
                        <Sun className="w-5 h-5 text-sand-11" />
                    )}
                </button>
            </div>

            <div className="space-y-2">
                <h2 className="text-2xl font-semibold text-sand-12">Color Principles</h2>
                <ul className="list-disc pl-5 space-y-2 text-sand-11">
                    <li><strong>Semantic:</strong> Colors have specific meanings and usages throughout the interface</li>
                    <li><strong>Accessible:</strong> Color combinations are designed for maximum readability and accessibility</li>
                    <li><strong>Consistent:</strong> Color usage is consistent across similar UI elements</li>
                    <li><strong>Hierarchical:</strong> Colors help establish visual hierarchy</li>
                </ul>
            </div>

            <div className="space-y-2">
                <h2 className="text-2xl font-semibold text-sand-12">Naming Convention</h2>
                <p className="text-sand-11">
                    Our color variables follow the naming pattern: <code className="bg-sand-3 text-sand-12 px-1 py-0.5 rounded">color-scale</code>, for example <code className="bg-sand-3 text-sand-12 px-1 py-0.5 rounded">primary-9</code> or <code className="bg-sand-3 text-sand-12 px-1 py-0.5 rounded">sand-12</code>.
                </p>
            </div>

            <div className="space-y-8">
                {colorScales.map((scale) => (
                    <div key={scale.name} className="space-y-4">
                        <div>
                            <h2 className="text-2xl font-semibold text-sand-12 capitalize">{scale.name}</h2>
                            <p className="text-sand-11">{scale.description}</p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            {scale.swatches.map((swatch) => (
                                <div
                                    key={`${scale.name}-${swatch.scale}`}
                                    className="border border-sand-6 rounded-lg p-4 bg-white"
                                >
                                    <div className="space-y-3">
                                        <div className="flex justify-between items-center">
                                            <code className="text-xs bg-sand-3 px-2 py-1 rounded">
                                                {scale.name}-{swatch.scale}
                                            </code>
                                        </div>
                                        <div className="h-12">
                                            {swatch.example}
                                        </div>
                                        <div className="space-y-1">
                                            <p className="text-sm font-medium text-sand-12">
                                                {swatch.description}
                                            </p>
                                            <p className="text-xs text-sand-11">
                                                {swatch.usage}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            <div className="space-y-4 pt-8">
                <h2 className="text-2xl font-semibold text-sand-12">Gradient Color Variants</h2>
                <p className="text-sand-11">
                    Mercury Design System supports gradient color variants for enhanced visual appeal and hierarchy.
                    Gradients can be applied to components like tabs, cards, and buttons.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-4">
                    <div className="rounded-lg overflow-hidden shadow-sm">
                        <div className="h-24 bg-gradient-to-r from-primary-9 to-secondary-9"></div>
                        <div className="p-4 bg-white border border-sand-6 border-t-0 rounded-b-lg">
                            <h3 className="font-medium text-sand-12">Primary to Secondary</h3>
                            <p className="text-sm text-sand-11">Used for prominent UI elements</p>
                            <code className="mt-2 block text-xs bg-sand-3 p-2 rounded">bg-gradient-to-r from-primary-9 to-secondary-9</code>
                        </div>
                    </div>

                    <div className="rounded-lg overflow-hidden shadow-sm">
                        <div className="h-24 bg-gradient-to-br from-secondary-8 via-primary-9 to-secondary-9"></div>
                        <div className="p-4 bg-white border border-sand-6 border-t-0 rounded-b-lg">
                            <h3 className="font-medium text-sand-12">Tri-tone Gradient</h3>
                            <p className="text-sm text-sand-11">Used for call-to-action elements</p>
                            <code className="mt-2 block text-xs bg-sand-3 p-2 rounded">bg-gradient-to-br from-secondary-8 via-primary-9 to-secondary-9</code>
                        </div>
                    </div>

                    <div className="rounded-lg overflow-hidden shadow-sm">
                        <div className="h-24 bg-gradient-to-t from-sand-1 to-primary-2"></div>
                        <div className="p-4 bg-white border border-sand-6 border-t-0 rounded-b-lg">
                            <h3 className="font-medium text-sand-12">Subtle Background</h3>
                            <p className="text-sm text-sand-11">Used for section backgrounds</p>
                            <code className="mt-2 block text-xs bg-sand-3 p-2 rounded">bg-gradient-to-t from-sand-1 to-primary-2</code>
                        </div>
                    </div>

                    <div className="rounded-lg overflow-hidden shadow-sm">
                        <div className="h-24 bg-gradient-to-r from-success-8 to-success-9"></div>
                        <div className="p-4 bg-white border border-sand-6 border-t-0 rounded-b-lg">
                            <h3 className="font-medium text-sand-12">Success Gradient</h3>
                            <p className="text-sm text-sand-11">Used for positive status indicators</p>
                            <code className="mt-2 block text-xs bg-sand-3 p-2 rounded">bg-gradient-to-r from-success-8 to-success-9</code>
                        </div>
                    </div>

                    <div className="rounded-lg overflow-hidden shadow-sm">
                        <div className="h-24 bg-gradient-to-r from-error-8 to-error-9"></div>
                        <div className="p-4 bg-white border border-sand-6 border-t-0 rounded-b-lg">
                            <h3 className="font-medium text-sand-12">Error Gradient</h3>
                            <p className="text-sm text-sand-11">Used for critical status indicators</p>
                            <code className="mt-2 block text-xs bg-sand-3 p-2 rounded">bg-gradient-to-r from-error-8 to-error-9</code>
                        </div>
                    </div>

                    <div className="rounded-lg overflow-hidden shadow-sm">
                        <div className="h-24 bg-gradient-to-br from-sand-12 to-sand-10"></div>
                        <div className="p-4 bg-white border border-sand-6 border-t-0 rounded-b-lg">
                            <h3 className="font-medium text-sand-12">Neutral Gradient</h3>
                            <p className="text-sm text-sand-11">Used for neutral or disabled states</p>
                            <code className="mt-2 block text-xs bg-sand-3 p-2 rounded">bg-gradient-to-br from-sand-12 to-sand-10</code>
                        </div>
                    </div>
                </div>
            </div>

            <div className="space-y-4 pt-6">
                <h3 className="text-xl font-medium text-sand-12">Gradient Usage Guidelines</h3>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="space-y-3 bg-sand-1 p-4 rounded-lg">
                        <h4 className="font-medium text-sand-12">Best Practices</h4>
                        <ul className="list-disc pl-5 space-y-2 text-sm text-sand-11">
                            <li>Use gradients sparingly to maintain visual hierarchy</li>
                            <li>Ensure sufficient contrast for any text overlaid on gradients</li>
                            <li>Keep gradient directions consistent throughout the application</li>
                            <li>Use subtle gradients for large areas and stronger gradients for smaller elements</li>
                            <li>Test gradient visibility across different screen brightness settings</li>
                        </ul>
                    </div>

                    <div className="space-y-3 bg-sand-1 p-4 rounded-lg">
                        <h4 className="font-medium text-sand-12">Component Applications</h4>
                        <ul className="list-disc pl-5 space-y-2 text-sm text-sand-11">
                            <li><span className="font-medium">Buttons & CTAs:</span> Use primary-to-secondary gradients for emphasis</li>
                            <li><span className="font-medium">Cards & Containers:</span> Apply subtle gradients for visual depth</li>
                            <li><span className="font-medium">Status Indicators:</span> Use appropriate semantic gradients</li>
                            <li><span className="font-medium">Navigation:</span> Highlight active states with gradient accents</li>
                            <li><span className="font-medium">Backgrounds:</span> Use subtle gradients for section differentiation</li>
                        </ul>
                    </div>
                </div>
            </div>

            <div className="space-y-4 pt-4">
                <h2 className="text-2xl font-semibold text-sand-12">Color Usage Guidelines</h2>

                <div className="space-y-4">
                    <div>
                        <h3 className="text-lg font-medium text-sand-12">Text Hierarchy</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
                            <div className="p-4 bg-white rounded-md shadow-sm">
                                <p className="text-sand-12 font-semibold mb-1">High-contrast Text (sand-12)</p>
                                <p className="text-sand-11 mb-1">Medium-contrast Text (sand-11)</p>
                                <p className="text-sand-10">Low-contrast Text (sand-10)</p>
                            </div>
                            <div className="p-4 bg-sand-12 rounded-md shadow-sm">
                                <p className="text-white font-semibold mb-1">Light Text on Dark (white)</p>
                                <p className="text-sand-4 mb-1">Medium-contrast Text (sand-4)</p>
                                <p className="text-sand-6">Low-contrast Text (sand-6)</p>
                            </div>
                        </div>
                    </div>

                    <div>
                        <h3 className="text-lg font-medium text-sand-12">Interactive Elements</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-2">
                            <button className="px-4 py-2 bg-primary-9 text-white rounded-md shadow-sm hover:bg-primary-10 transition-colors">
                                Primary Button
                            </button>
                            <button className="px-4 py-2 bg-secondary-9 text-white rounded-md shadow-sm hover:bg-secondary-10 transition-colors">
                                Secondary Button
                            </button>
                            <button className="px-4 py-2 bg-sand-3 text-sand-12 rounded-md shadow-sm hover:bg-sand-4 transition-colors">
                                Tertiary Button
                            </button>
                        </div>
                    </div>

                    <div>
                        <h3 className="text-lg font-medium text-sand-12">Status Colors</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-2">
                            <div className="p-4 bg-success-2 border-l-4 border-success-9 rounded-md">
                                <p className="text-success-12 font-medium">Success Message</p>
                                <p className="text-success-11 text-sm">Operation completed successfully.</p>
                            </div>
                            <div className="p-4 bg-warning-2 border-l-4 border-warning-9 rounded-md">
                                <p className="text-warning-12 font-medium">Warning Message</p>
                                <p className="text-warning-11 text-sm">Please review before proceeding.</p>
                            </div>
                            <div className="p-4 bg-error-2 border-l-4 border-error-9 rounded-md">
                                <p className="text-error-12 font-medium">Error Message</p>
                                <p className="text-error-11 text-sm">Something went wrong.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="space-y-4 pt-4">
                <h2 className="text-2xl font-semibold text-sand-12">Accessibility</h2>
                <p className="text-sand-11">
                    Our color system is designed to meet WCAG 2.1 AA accessibility standards. Text and interactive elements
                    maintain appropriate contrast ratios for readability.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
                    <div className="p-4 bg-white rounded-md shadow-sm border border-sand-6">
                        <h4 className="font-medium text-sand-12 mb-2">Accessible Color Combinations</h4>
                        <div className="space-y-2">
                            <div className="flex items-center">
                                <div className="w-16 h-8 bg-primary-9 rounded-l-md"></div>
                                <div className="w-16 h-8 bg-white rounded-r-md flex items-center justify-center text-sm font-medium">
                                    4.5:1
                                </div>
                            </div>
                            <div className="flex items-center">
                                <div className="w-16 h-8 bg-secondary-9 rounded-l-md"></div>
                                <div className="w-16 h-8 bg-white rounded-r-md flex items-center justify-center text-sm font-medium">
                                    4.8:1
                                </div>
                            </div>
                            <div className="flex items-center">
                                <div className="w-16 h-8 bg-sand-12 rounded-l-md"></div>
                                <div className="w-16 h-8 bg-white rounded-r-md flex items-center justify-center text-sm font-medium">
                                    16:1
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="p-4 bg-white rounded-md shadow-sm border border-sand-6">
                        <h4 className="font-medium text-sand-12 mb-2">Accessible Text</h4>
                        <div className="space-y-2">
                            <p className="text-sand-12 font-medium">Primary Text (sand-12)</p>
                            <p className="text-primary-9 font-medium">Primary Brand Color</p>
                            <p className="text-secondary-9 font-medium">Secondary Brand Color</p>
                            <div className="p-2 bg-primary-9 rounded-md">
                                <p className="text-white font-medium">White on Primary</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
} 