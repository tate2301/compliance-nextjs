"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { CheckCircle } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useOnboardingData } from "@/app/hooks/useOnboardingData";

export default function OnboardingCompletePage() {
  const router = useRouter();
  const { isOnboardingComplete, isLoading } = useOnboardingData();

  useEffect(() => {
    // If onboarding is not actually complete, redirect back to onboarding
    if (!isLoading && !isOnboardingComplete) {
      router.push("/app/onboarding");
      return;
    }

    // If onboarding is complete, redirect to main app after a delay
    if (!isLoading && isOnboardingComplete) {
      const timer = setTimeout(() => {
        router.push("/app/documents");
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [isOnboardingComplete, isLoading, router]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-slate-9">Checking completion status...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-[400px]">
      <Card className="w-full max-w-md text-center">
        <CardHeader>
          <div className="mx-auto w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
            <CheckCircle className="w-6 h-6 text-green-600" />
          </div>
          <CardTitle className="text-2xl font-semibold text-slate-12">
            Onboarding Complete!
          </CardTitle>
          <CardDescription className="text-slate-9">
            You&apos;ve successfully completed all required forms and documentation.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-slate-9 mb-4">
            You&apos;ll be redirected to the main application in a few seconds.
          </p>
          <div className="w-full bg-slate-3 rounded-full h-2">
            <div className="bg-primary h-2 rounded-full animate-pulse" style={{ width: "100%" }}></div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 