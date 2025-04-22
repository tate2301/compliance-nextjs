"use client"

import React, { useState } from "react"
import { useRouter } from "next/navigation"
import { AuthForm } from "../components/auth-form"
import { toast } from "sonner"

export default function SignUp() {
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter()

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        // Form elements are accessed via the form event
        const formData = new FormData(e.currentTarget)
        const email = formData.get("email") as string
        const password = formData.get("password") as string
        const confirmPassword = formData.get("confirm-password") as string

        if (!email || !password || !confirmPassword) {
            return toast.error("Please fill in all fields")
        }

        if (password !== confirmPassword) {
            return toast.error("Passwords do not match")
        }

        if (password.length < 8) {
            return toast.error("Password must be at least 8 characters long")
        }

        try {
            setIsLoading(true)

            // This is where you would typically make an API call to create the user
            // For example:
            // const response = await createUser({ email, password })

            // Simulate API call delay
            await new Promise(resolve => setTimeout(resolve, 1500))

            // For demonstration purposes, we'll just redirect to the dashboard
            router.push("/dashboard")

            // Show success message
            toast.success("Account created successfully!")
        } catch (error) {
            console.error("Failed to create account:", error)
            toast.error("Failed to create account. Please try again later.")
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="space-y-6">
            <div className="space-y-2 text-center">
                <h1 className="text-2xl font-semibold tracking-tight text-slate-12">
                    Create your account
                </h1>
                <p className="text-sm text-slate-9">
                    Enter your details to create a new account
                </p>
            </div>

            <AuthForm
                mode="signup"
                onSubmit={handleSubmit}
                isLoading={isLoading}
            />
        </div>
    )
}
