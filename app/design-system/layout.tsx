import type { Metadata } from 'next'
import Link from 'next/link'
import { Providers } from '../providers'
import { ThemeToggle } from '@/components/ui/theme-toggle'

export const metadata: Metadata = {
    title: 'Mercury Design System',
    description: 'A modern design system built with Radix Colors and Tailwind CSS',
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body className="bg-sand-3 min-h-screen text-foreground">
                <Providers>
                    <header className="sticky top-0 z-50 w-full border-b border-sand-6 bg-card/75 backdrop-blur supports-[backdrop-filter]:bg-card/75">
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-4">
                            <div className="flex justify-between h-16 items-center flex-1">
                                <div className="flex">
                                    <Link
                                        href="/"
                                        className="flex items-center text-primary font-bold text-lg"
                                    >
                                        Mercury Design System
                                    </Link>
                                </div>
                                <nav className="flex items-center space-x-6">
                                    <Link
                                        href="/"
                                        className="text-foreground/70 hover:text-foreground px-3 py-2 rounded-md text-sm font-medium transition-colors"
                                    >
                                        Home
                                    </Link>
                                    <Link
                                        href="/design-system"
                                        className="text-foreground/70 hover:text-foreground px-3 py-2 rounded-md text-sm font-medium transition-colors"
                                    >
                                        Design System
                                    </Link>
                                    <Link
                                        href="/caregiver-dashboard"
                                        className="text-foreground/70 hover:text-foreground px-3 py-2 rounded-md text-sm font-medium transition-colors"
                                    >
                                        Caregiver Dashboard
                                    </Link>
                                </nav>
                            </div>
                            <ThemeToggle />
                            <a href="/" className="text-primary-11 hover:text-primary-12 text-sm font-medium">
                                Back to Home
                            </a>
                        </div>
                    </header>
                    <main className="h-full">{children}</main>
                </Providers>
            </body>
        </html>
    )
} 