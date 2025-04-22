"use client"

import React from "react"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { AuthProvider } from "@/lib/auth/auth-context"

interface AuthLayoutProps {
    children: React.ReactNode
}

export default function AuthLayout({ children }: AuthLayoutProps) {
    return (
        <AuthProvider>
            <div className="flex min-h-screen flex-col bg-slate-1">
                <div className="container flex flex-1 items-center justify-center py-12 md:py-20">
                    <div className="w-full max-w-md space-y-6">
                        <div className="flex flex-col space-y-2 text-center">


                            <div className="flex justify-center">
                                <div className="bg-gradient-primary inline-flex h-12 w-12 items-center justify-center rounded-lg">
                                    <span className="text-white font-bold text-xl">CA</span>
                                </div>
                            </div>

                            <h1 className="text-2xl font-bold tracking-tight text-slate-12">
                                Compliance Aide
                            </h1>
                            <p className="text-slate-9">
                                Your trusted compliance management platform
                            </p>
                        </div>

                        <div className="bg-slate-1 p-6 shadow-md border-2 border-slate-6 rounded-lg">
                            {children}
                        </div>
                        <div className="flex justify-center">
                            <Link
                                href="/"
                                className="mb-4 inline-flex items-center gap-2 text-sm font-bold text-primary-11 hover:text-primary-12 transition-colors"
                            >
                                <ArrowLeft className="h-4 w-4" />
                                <span>Back to home</span>
                            </Link>

                        </div>
                        <div className="text-center text-sm text-slate-9">
                            <p>
                                &copy; {new Date().getFullYear()} Compliance Aide. All rights reserved.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </AuthProvider>
    )
} 