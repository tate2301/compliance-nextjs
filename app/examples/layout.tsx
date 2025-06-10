import '../globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Mercury Design System Examples',
    description: 'Example components from Mercury Design System',
}

export default function ExamplesLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body className="min-h-screen bg-sand-1">
                {children}
            </body>
        </html>
    )
} 