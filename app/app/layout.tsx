"use client";

import { AuthProvider } from "@/lib/auth/auth-context";
import { ReactNode, Suspense } from "react";
import { StaffSidebar } from "./components/StaffSidebar";
import OnboardingGuard from "./components/OnboardingGuard";
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import { Toaster } from "@/components/ui/toaster";
import { GlobalComplianceAlert } from "./components/GlobalComplianceAlert";
import { usePathname } from "next/navigation";
import { OnboardingProvider } from "./contexts/OnboardingContext";
import MobileHeader from "./components/MobileHeader";

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
  children: ReactNode;
}

function AppLayoutContent({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const isOnboardingPage = pathname?.startsWith("/app/onboarding");

  // If on onboarding page, render children directly (OnboardingHeader will be shown in onboarding layout)
  if (isOnboardingPage) {
    return (
      <>
        {children}
        <Toaster />
      </>
    );
  }

  // For all other pages, show sidebar and staff header (no onboarding header)
  return (
    <SidebarProvider defaultOpen={true}>
      <StaffSidebar />
      <SidebarInset className="flex flex-col">
        <MobileHeader />
        <main className="flex-1 overflow-auto p-6 custom-scrollbar max-w-6xl mx-auto w-full">
          <GlobalComplianceAlert />
          {children}
        </main>
      </SidebarInset>
      <Toaster />
    </SidebarProvider>
  );
}

export default function Providers({ children }: ProvidersProps) {
  const queryClient = getQueryClient();

  return (
    <Suspense>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <OnboardingProvider>
            <OnboardingGuard>
              <AppLayoutContent>
                {children}
              </AppLayoutContent>
            </OnboardingGuard>
          </OnboardingProvider>
        </AuthProvider>
      </QueryClientProvider>
    </Suspense>
  );
}
