"use client";

import { Clock } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function OnboardingCompletePage() {
  return (
    <div className="flex items-center justify-center min-h-[400px]">
      <Card className="w-full max-w-md text-center">
        <CardHeader>
          <div className="mx-auto w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mb-4">
            <Clock className="w-6 h-6 text-amber-600" />
          </div>
          <CardTitle className="text-2xl font-semibold text-slate-12">
            Onboarding Complete!
          </CardTitle>
          <CardDescription className="text-slate-9">
            You've successfully completed all required forms and documentation.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-slate-9 mb-4">
            Your submission is now being reviewed by our team. You'll receive an email notification once your account has been verified.
          </p>
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-4">
            <p className="text-sm text-amber-800">
              <strong>What happens next?</strong><br />
              Our compliance team will review your submission within 1-2 business days. 
              You'll be notified via email when your account is ready to use.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 