import './globals.css'
import type { Metadata } from 'next'
import Link from 'next/link'
import { Providers } from './providers'
import { ThemeToggle } from '@/components/ui/theme-toggle'

export const metadata: Metadata = {
    title: 'Mercury Design System',
    description: 'A modern design system built with Radix Colors and Tailwind CSS',
}

interface SubdomainLayoutProps {
    params: {
        subdomain: string
    }
    children: React.ReactNode
}

export default function RootLayout({
    params,
    children,
}: SubdomainLayoutProps) {
    const subdomain = params?.subdomain

    return (
        <html lang="en" suppressHydrationWarning>
            <body className="bg-slate-3 min-h-screen text-foreground">
                <Providers>
                    <main className="h-full" data-subdomain={subdomain}>
                        {children}
                    </main>
                </Providers>
            </body>
        </html>
    )
}