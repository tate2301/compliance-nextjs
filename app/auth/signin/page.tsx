"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { AuthForm } from "../components/auth-form";
import { toast } from "sonner";
import { useAuth } from "@/lib/auth/auth-context";
import { authService } from "@/lib/auth";

export default function SignIn() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const { login, isAuthenticated } = useAuth();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    if (!email || !password) {
      return toast.error("Please enter both email and password");
    }

    try {
      setIsLoading(true);
      const response = await authService.login({ email, password });

      // Access data from axios response
      const { user, token } = response.data;
      login(user, token);

      // Check for return URL in search params
      const returnUrl = searchParams.get("return_url");
      if (returnUrl) {
        router.push(returnUrl);
      } else {
        router.push("/home");
      }

      toast.success("Successfully signed in!");
    } catch (error) {
      console.error("Failed to sign in:", error);
      toast.error(
        "Failed to sign in. Please check your credentials and try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      router.push("/home");
    }
  }, [isAuthenticated, router]);

  return (
    <div className="space-y-6">
      <div className="space-y-2 text-center">
        <h1 className="text-2xl font-semibold tracking-tight text-slate-12">
          Sign in to your account
        </h1>
        <p className="text-sm text-slate-9">
          Enter your credentials to access your account
        </p>
      </div>

      <AuthForm mode="signin" onSubmit={handleSubmit} isLoading={isLoading} />
    </div>
  );
}
