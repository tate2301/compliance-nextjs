"use client"

import { AuthProvider } from '@/lib/auth/auth-context'
import { ReactNode } from 'react'
import StaffHeader from './components/Header'
import { StaffSidebar } from './components/StaffSidebar'
import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import { Separator } from '@/components/ui/separator'
import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbPage } from '@/components/ui/breadcrumb'
import { Toaster } from '@/components/ui/toaster'

interface ProvidersProps {
    children: ReactNode
}

export default function Providers({ children }: ProvidersProps) {
    return (
        <AuthProvider>
            <SidebarProvider>
                <StaffSidebar />
                <SidebarInset>
                    {children}
                </SidebarInset>
                <Toaster />
            </SidebarProvider>
        </AuthProvider>
    )
} 