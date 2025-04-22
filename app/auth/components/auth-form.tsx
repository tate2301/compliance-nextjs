"use client"

import React from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { GithubIcon } from "lucide-react"

interface AuthFormProps {
    mode: "signin" | "signup"
    onSubmit: (e: React.FormEvent<HTMLFormElement>) => void
    isLoading?: boolean
}

export function AuthForm({ mode, onSubmit, isLoading = false }: AuthFormProps) {
    const router = useRouter()

    return (
        <div className="space-y-6">
            <form onSubmit={onSubmit} className="space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="you@example.com"
                        required
                        autoComplete="email"
                    />
                </div>

                <div className="space-y-2">
                    <div className="flex items-center justify-between">
                        <Label htmlFor="password">Password</Label>
                        {mode === "signin" && (
                            <button
                                type="button"
                                onClick={() => router.push("/auth/reset-password")}
                                className="text-sm text-primary-9 hover:underline"
                            >
                                Forgot password?
                            </button>
                        )}
                    </div>
                    <Input
                        id="password"
                        name="password"
                        type="password"
                        placeholder={mode === "signin" ? "Enter your password" : "Create a password"}
                        required
                        autoComplete={mode === "signin" ? "current-password" : "new-password"}
                    />
                </div>

                {mode === "signup" && (
                    <div className="space-y-2">
                        <Label htmlFor="confirm-password">Confirm Password</Label>
                        <Input
                            id="confirm-password"
                            name="confirm-password"
                            type="password"
                            placeholder="Confirm your password"
                            required
                            autoComplete="new-password"
                        />
                    </div>
                )}

                <Button
                    type="submit"
                    className="w-full"
                    disabled={isLoading}
                >
                    {isLoading ? (
                        <span className="flex items-center gap-2">
                            <span className="h-4 w-4 animate-spin rounded-full border-2 border-slate-1 border-t-transparent" />
                            {mode === "signin" ? "Signing in..." : "Creating account..."}
                        </span>
                    ) : (
                        <span>{mode === "signin" ? "Sign in" : "Create account"}</span>
                    )}
                </Button>
            </form>

            <div className="relative">
                <div className="absolute inset-0 flex items-center">
                    <Separator className="w-full" />
                </div>
                <div className="relative flex justify-center">
                    <span className="bg-slate-1 px-2 text-sm text-slate-9">
                        Or continue with
                    </span>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
                <Button variant="outline" type="button" className="w-full">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" className="mr-2 h-5 w-5">
                        <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z" />
                        <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z" />
                        <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z" />
                        <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z" />
                    </svg>
                    Google
                </Button>

                <Button variant="outline" type="button" className="w-full">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" className="mr-2 h-5 w-5">
                        <linearGradient id="Ld6sqrtcxMyckEl6xeDdMa" x1="9.993" x2="40.615" y1="9.993" y2="40.615" gradientUnits="userSpaceOnUse">
                            <stop offset="0" stopColor="#2aa4f4" />
                            <stop offset="1" stopColor="#007ad9" />
                        </linearGradient>
                        <path fill="url(#Ld6sqrtcxMyckEl6xeDdMa)" d="M24,4C12.954,4,4,12.954,4,24s8.954,20,20,20s20-8.954,20-20S35.046,4,24,4z" />
                        <path fill="#fff" d="M26.707,29.301h5.176l0.813-5.258h-5.989v-2.874c0-2.184,0.714-4.121,2.757-4.121h3.283V12.46 c-0.577-0.078-1.797-0.248-4.102-0.248c-4.814,0-7.636,2.542-7.636,8.334v3.498H16.06v5.258h4.948v14.452 C21.988,43.9,22.981,44,24,44c0.921,0,1.82-0.084,2.707-0.204V29.301z" />
                    </svg>
                    Facebook
                </Button>
            </div>

            <div className="text-center text-sm">
                {mode === "signin" ? (
                    <p className="text-slate-11">
                        Don't have an account?{" "}
                        <button
                            type="button"
                            onClick={() => router.push("/auth/signup")}
                            className="text-primary-9 hover:underline"
                        >
                            Sign up
                        </button>
                    </p>
                ) : (
                    <p className="text-slate-11">
                        Already have an account?{" "}
                        <button
                            type="button"
                            onClick={() => router.push("/auth/signin")}
                            className="text-primary-9 hover:underline"
                        >
                            Sign in
                        </button>
                    </p>
                )}
            </div>
        </div>
    )
} 