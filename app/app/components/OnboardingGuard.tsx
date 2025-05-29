"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuth } from "@/lib/auth/auth-context";

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

        <div className="grid gap-4">
          {/* Form skeleton */}
          <div className="bg-card rounded-lg border border-slate-6 p-6">
            <div className="space-y-6">
              <div className="h-6 w-48 bg-slate-3 rounded animate-pulse" />
              <div className="space-y-4">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="space-y-2">
                    <div className="h-4 w-32 bg-slate-3 rounded animate-pulse" />
                    <div className="h-10 w-full bg-slate-3 rounded animate-pulse" />
                  </div>
                ))}
              </div>
              <div className="flex justify-between">
                <div className="h-10 w-24 bg-slate-3 rounded animate-pulse" />
                <div className="h-10 w-24 bg-slate-3 rounded animate-pulse" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function SimpleLoadingSkeleton() {
  return (
    <div className="min-h-screen bg-slate-1 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
        <p className="mt-4 text-slate-9">Checking access permissions...</p>
      </div>
    </div>
  );
}

export default function OnboardingGuard({ children }: OnboardingGuardProps) {
  const router = useRouter();
  const pathname = usePathname();
  const { isAuthenticated, user } = useAuth();
  const [isChecking, setIsChecking] = useState(true);
  const [hasChecked, setHasChecked] = useState(false);

  const isOnboardingRoute = pathname?.startsWith("/app/onboarding");
  const isOnboardingCompleteRoute = pathname === "/app/onboarding/complete";
  const isRegularOnboardingRoute = isOnboardingRoute && !isOnboardingCompleteRoute;

  useEffect(() => {
    const checkOnboardingStatus = async () => {
      // Skip if not authenticated
      if (!isAuthenticated || !user?.id) {
        setIsChecking(false);
        return;
      }

      // Skip if already checked to prevent loops
      if (hasChecked) {
        setIsChecking(false);
        return;
      }

      try {
        // Check onboarding and verification status
        const response = await fetch(`/api/user/onboarding-status?authUserId=${user.id}`);
        
        if (!response.ok) {
          console.error('Failed to check onboarding status');
          setIsChecking(false);
          return;
        }

        const { isCompleted, isVerified } = await response.json();

        const isAppRoute = pathname?.startsWith("/app") && !isOnboardingRoute;

        // If onboarding is not completed, redirect to onboarding
        if (!isCompleted && !isOnboardingRoute) {
          router.push("/app/onboarding");
          return;
        }

        // If completed but trying to access regular onboarding pages, redirect to complete
        if (isCompleted && isRegularOnboardingRoute) {
          router.push("/app/onboarding/complete");
          return;
        }

        // If completed but not verified, only allow complete page
        if (isCompleted && !isVerified && isAppRoute) {
          router.push("/app/onboarding/complete");
          return;
        }

        // If completed and verified, redirect away from onboarding
        if (isCompleted && isVerified && isOnboardingRoute) {
          router.push("/app/documents");
          return;
        }

        setHasChecked(true);
        setIsChecking(false);

      } catch (error) {
        console.error("Error checking onboarding status:", error);
        setIsChecking(false);
      }
    };

    checkOnboardingStatus();
  }, [isAuthenticated, user?.id, pathname, router, hasChecked, isOnboardingRoute, isRegularOnboardingRoute]);

  // Show loading while checking
  if (isAuthenticated && isChecking) {
    // Show detailed skeleton for onboarding routes to prevent flash of content
    if (isRegularOnboardingRoute) {
      return <LoadingSkeleton />;
    }
    // Show simple loading for other routes
    return <SimpleLoadingSkeleton />;
  }

  // If not authenticated, let middleware handle redirect
  if (!isAuthenticated) {
    return null;
  }

  return <>{children}</>;
} 