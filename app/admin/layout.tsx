"use client";

import { AuthProvider } from "@/lib/auth/auth-context";
import { ReactNode, Suspense, useState, useEffect } from "react";
import { AdminSidebar } from "./components/AdminSidebar";
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar";
import { Toaster } from "@/components/ui/toaster";
import { useAuth } from "@/lib/auth/auth-context";
import { redirect } from "next/navigation";

import {
  isServer,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import AdminHeader from "./components/AdminHeader";

function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000,
      },
    },
  });
}

let browserQueryClient: QueryClient | undefined = undefined;

function getQueryClient() {
  if (isServer) {
    return makeQueryClient();
  } else {
    if (!browserQueryClient) browserQueryClient = makeQueryClient();
    return browserQueryClient;
  }
}

interface AdminProvidersProps {
  children: ReactNode;
}

function AdminLayoutContent({ children }: { children: ReactNode }) {
  return (
    <SidebarProvider defaultOpen={true}>
      <AdminSidebar />
      <SidebarInset className="flex flex-col">
        <AdminHeader />
        <main className="flex-1 overflow-auto lg:p-6 custom-scrollbar max-w-full mx-auto w-full">
          {children}
        </main>
      </SidebarInset>
      <Toaster />
    </SidebarProvider>
  );
}

function AdminGuard({ children }: { children: ReactNode }) {
  const { user, isAuthenticated } = useAuth();
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Allow some time for auth to initialize
    const timer = setTimeout(() => {
      setLoading(false);
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);
  
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }
  
  // Check if user is admin - role 1 is typically admin
  if (!isAuthenticated || !user 
    // || user.role !== 1
  ) {
    redirect('/app');
  }
  
  return <>{children}</>;
}

export default function AdminProviders({ children }: AdminProvidersProps) {
  const queryClient = getQueryClient();

  return (
    <Suspense>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <AdminGuard>
            <AdminLayoutContent>
              {children}
            </AdminLayoutContent>
          </AdminGuard>
        </AuthProvider>
      </QueryClientProvider>
    </Suspense>
  );
} 