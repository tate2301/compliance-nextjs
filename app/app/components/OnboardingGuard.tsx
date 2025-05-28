"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuth } from "@/lib/auth/auth-context";
import { useOnboardingData } from "@/app/hooks/useOnboardingData";
import { Loader2 } from "lucide-react";

interface OnboardingGuardProps {
  children: React.ReactNode;
}

function LoadingSkeleton() {
  return (
    <div className="min-h-screen bg-slate-1">
      {/* Skeleton Header */}
      <header className="sticky top-0 z-50 p-4 w-full border-b border-slate-6 bg-card/75 backdrop-blur">
        <div className="max-w-7xl mx-auto flex justify-between w-full px-4 sm:px-6 lg:px-8">
          <div className="flex gap-4 items-center">
            <div className="h-6 w-32 bg-slate-3 rounded animate-pulse" />
            <div className="h-4 w-48 bg-slate-3 rounded animate-pulse hidden sm:block" />
          </div>
          <div className="flex gap-4 items-center">
            <div className="h-8 w-8 bg-slate-3 rounded-full animate-pulse" />
            <div className="h-6 w-6 bg-slate-3 rounded animate-pulse hidden md:block" />
          </div>
        </div>
      </header>

      {/* Main Content Loading */}
      <div className="container max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <div className="h-8 w-64 bg-slate-3 rounded animate-pulse" />
            <div className="h-5 w-32 bg-slate-3 rounded animate-pulse" />
          </div>
          <div className="h-2 w-full bg-slate-3 rounded animate-pulse" />
        </div>

        <div className="bg-card rounded-lg border border-slate-6 p-6">
          <div className="flex items-center justify-center p-12">
            <div className="flex flex-col items-center gap-4">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
              <div className="text-center space-y-1">
                <p className="text-lg font-medium text-slate-12">Please wait</p>
                <p className="text-sm text-slate-9">We're loading your forms</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function OnboardingGuard({ children }: OnboardingGuardProps) {
  const router = useRouter();
  const pathname = usePathname();
  const { isAuthenticated } = useAuth();
  const { isOnboardingComplete, isLoading, error,complianceUser } = useOnboardingData();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const checkOnboardingStatus = async () => {
      // Skip onboarding check if not authenticated
      if (!isAuthenticated) {
        setIsChecking(false);
        return;
      }

      // Skip onboarding check if already on onboarding page
      if (pathname?.startsWith("/app/onboarding")) {
        setIsChecking(false);
        return;
      }

      // Wait for onboarding status to load
      if (isLoading) {
        return;
      }

      // If there's an error, still allow access but log it
      if (error) {
        console.error("Onboarding status check failed:", error);
        setIsChecking(false);
        return;
      }

      // If onboarding is not complete, redirect to onboarding
      if (!complianceUser?.onboardingStatus.isCompleted) {
        return;
        router.push("/app/onboarding");
        return;
      }

      setIsChecking(false);
    };

    checkOnboardingStatus();
  }, [isAuthenticated, isOnboardingComplete, isLoading, error, pathname, router, complianceUser]);

  // Show loading skeleton while checking
  if (isAuthenticated && (isChecking || isLoading)) {
    return <LoadingSkeleton />;
  }

  // Render children if all checks pass
  return <>{children}</>;
} 