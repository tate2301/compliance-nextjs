"use client"

import { AuthProvider } from '@/lib/auth/auth-context'
import { ReactNode } from 'react'
import StaffHeader from './components/Header'
import { StaffSidebar } from './components/StaffSidebar'
import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import { Separator } from '@/components/ui/separator'
import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbPage } from '@/components/ui/breadcrumb'
import { Toaster } from '@/components/ui/toaster'

import {
    isServer,
    QueryClient,
    QueryClientProvider,
} from "@tanstack/react-query";

function makeQueryClient() {
    return new QueryClient({
        defaultOptions: {
            queries: {
                // With SSR, we usually want to set some default staleTime
                // above 0 to avoid refetching immediately on the client
                staleTime: 60 * 1000,
            },
        },
    });
}

let browserQueryClient: QueryClient | undefined = undefined;

function getQueryClient() {
    if (isServer) {
        // Server: always make a new query client
        return makeQueryClient();
    } else {
        // Browser: make a new query client if we don't already have one
        // This is very important, so we don't re-make a new client if React
        // suspends during the initial render. This may not be needed if we
        // have a suspense boundary BELOW the creation of the query client
        if (!browserQueryClient) browserQueryClient = makeQueryClient();
        return browserQueryClient;
    }
}
interface ProvidersProps {
    children: ReactNode
}

export default function Providers({ children }: ProvidersProps) {
    const queryClient = getQueryClient();

    return (
        <QueryClientProvider client={queryClient}>
            <AuthProvider>
                <SidebarProvider>
                    <StaffSidebar />
                    <SidebarInset>
                        {children}
                    </SidebarInset>
                    <Toaster />
                </SidebarProvider>
            </AuthProvider>
        </QueryClientProvider>
    )
} 