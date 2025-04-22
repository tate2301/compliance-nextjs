'use client'

import { Button } from '@/components/ui/button'
import { Dashboard } from '@/components/ui/dashboard'
import { ThemeToggle } from '@/components/ui/theme-toggle'
import Link from 'next/link'

export default function HomePage() {
    return (
        <>
            <header className="sticky top-0 z-50 p-4 w-full border-b border-slate-6 bg-card/75 backdrop-blur supports-[backdrop-filter]:bg-card/75">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
                    <p className='text-slate-12 text-lg font-medium'>Compliance Aide</p>
                    <nav className='flex items-center gap-6'>
                        <Link href="/#features" className='text-slate-11 hover:text-slate-12'>Features</Link>
                        <Link href="/#pricing" className='text-slate-11 hover:text-slate-12'>Pricing</Link>
                        <Link href="/#about" className='text-slate-11 hover:text-slate-12'>About</Link>
                    </nav>
                    <div className='flex items-center gap-4'>
                        <Button asChild variant="outline">
                            <Link href="/auth/signin">Login</Link>
                        </Button>
                        <Button asChild variant="default">
                            <Link href="/auth/signup">Create account</Link>
                        </Button>
                        <ThemeToggle />
                    </div>
                </div>
            </header>
            <div className="min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center p-6">

                <div className="max-w-3xl text-center">
                    <h1 className="text-4xl md:text-5xl font-bold text-slate-12 mb-6">
                        Mercury Design System
                        <span className="text-primary-9">+</span>
                        <span className="text-primary-9">Radix UI Colors</span>
                    </h1>

                    <p className="text-xl text-slate-11 mb-8 max-w-2xl mx-auto">
                        A fluid, focused, and familiar design system inspired by Mercury,
                        enhanced with accessible colors from Radix UI.
                    </p>

                    <div className="flex flex-wrap gap-4 justify-center">
                        <Link
                            href="/design-system"
                            className="inline-flex items-center px-6 py-3 bg-primary-9 text-white rounded-lg text-lg font-medium hover:bg-primary-10 transition-colors shadow-2"
                        >
                            Explore Design System
                        </Link>

                        <Link
                            href="/caregiver-dashboard"
                            className="inline-flex items-center px-6 py-3 border-2 text-slate-12 rounded-lg text-lg font-medium hover:bg-info-10 transition-colors shadow-2"
                        >
                            Launch Demo
                        </Link>
                    </div>

                    <div className="mt-12  p-6 rounded-lg shadow-2 text-left max-w-2xl mx-auto">
                        <h2 className="text-lg font-semibold text-slate-12 mb-2">About the Design System</h2>
                        <p className="text-slate-11 mb-4">
                            This design system is implemented in a comprehensive platform for caregivers that includes:
                        </p>
                        <ul className="list-disc pl-6 space-y-1 text-slate-11">
                            <li>Dashboard for managing shifts and compliance documents</li>
                            <li>Profile management with form validation</li>
                            <li>Document management with status indicators</li>
                            <li>Shift booking and management system</li>
                            <li>Notifications and alerts with context-appropriate styling</li>
                        </ul>
                    </div>


                </div>
            </div>
        </>
    )
} 