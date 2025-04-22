"use client"

import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { FormPreview } from "@/forms_builder/components/FormPreview"
import complianceForms from "@/app/data/compliance-forms.json"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { FormProvider } from "@/forms_builder/context"
import { Form, FormField } from "@/forms_builder/types"

// Group forms by category
const formsByCategory = complianceForms.forms.reduce((acc, form) => {
    const category = form.category
    if (!acc[category]) {
        acc[category] = []
    }
    acc[category].push(form)
    return acc
}, {} as Record<string, typeof complianceForms.forms>)

// Get all categories
const categories = Object.keys(formsByCategory)

// Convert compliance form to builder form format
function convertToBuilderForm(form: typeof complianceForms.forms[0]): Form {
    // Create fields based on sections if available
    const fields: FormField[] = form.sections ? form.sections.map((section, index) => ({
        id: `${form.id}_section_${index}`,
        type: "shortAnswer", // Default to short answer for now
        label: section,
        required: form.required || false,
        properties: {
            placeholder: `Enter details for ${section}`,
            minLength: 0,
            maxLength: 1000
        }
    })) : [
        // Default field if no sections
        {
            id: `${form.id}_default`,
            type: "longAnswer",
            label: "Additional Information",
            required: form.required || false,
            properties: {
                placeholder: "Please provide the required information",
                minLength: 0,
                maxLength: 2000
            }
        }
    ]

    return {
        id: form.id,
        title: form.title,
        description: form.description || "",
        fields,
        theme: {
            id: form.id,
            name: form.title,
            description: form.description || "",
            colors: {
                primary: "rgb(var(--primary))",
                secondary: "rgb(var(--muted-foreground))",
                accent: "rgb(var(--accent))",
                background: "transparent",
                surface: "rgb(var(--card))",
                text: "rgb(var(--foreground))"
            },
            font: "Inter"
        }
    }
}

export default function OnboardingPage() {
    const router = useRouter()
    const searchParams = useSearchParams()
    const { toast } = useToast()

    const category = searchParams.get("category") || categories[0]
    const step = parseInt(searchParams.get("step") || "1")

    const currentForms = formsByCategory[category] || []
    const currentForm = currentForms[step - 1]

    const [completedForms, setCompletedForms] = useState<string[]>([])
    const [isSubmitting, setIsSubmitting] = useState(false)

    // Calculate progress for current category
    const categoryProgress = {
        completed: completedForms.length,
        total: currentForms.length,
        percentage: (completedForms.length / currentForms.length) * 100
    }

    useEffect(() => {
        if (!currentForm) {
            // If no form in current step, go to first step of next category
            const currentCategoryIndex = categories.indexOf(category)
            if (currentCategoryIndex < categories.length - 1) {
                router.push(`/subdomains/app/onboarding?category=${categories[currentCategoryIndex + 1]}&step=1`)
            } else {
                // All forms completed
                router.push("/dashboard")
            }
        }
    }, [currentForm, category, step, router])

    const handleSubmitForm = async (formData: Form) => {
        setIsSubmitting(true)
        try {
            // Here you would submit the form data to your backend
            await new Promise((resolve) => setTimeout(resolve, 1000))

            // Mark form as completed
            setCompletedForms(prev => [...prev, currentForm.id])

            // Calculate next step
            if (step < currentForms.length) {
                // Move to next form in current category
                router.push(`/subdomains/app/onboarding?category=${category}&step=${step + 1}`)
            } else {
                // Move to next category
                const currentCategoryIndex = categories.indexOf(category)
                if (currentCategoryIndex < categories.length - 1) {
                    router.push(`/subdomains/app/onboarding?category=${categories[currentCategoryIndex + 1]}&step=1`)
                } else {
                    // All categories completed
                    router.push("/dashboard")
                    toast({
                        title: "Onboarding Complete",
                        description: "All required forms have been submitted successfully.",
                    })
                }
            }
        } catch (error) {
            toast({
                title: "Error",
                description: "There was an error submitting the form. Please try again.",
                variant: "destructive",
            })
        } finally {
            setIsSubmitting(false)
        }
    }

    if (!currentForm) return null

    const builderForm = convertToBuilderForm(currentForm)

    return (
        <div className="space-y-8">
            <Tabs value={category} className="w-full flex flex-row">
                <TabsList className="justify-start flex-col w-fit">
                    {categories.map((cat) => {
                        const catForms = formsByCategory[cat]
                        const completedInCategory = catForms.filter(form => completedForms.includes(form.id)).length

                        return (
                            <TabsTrigger
                                key={cat}
                                value={cat}
                                className="w-full flex items-center gap-2 !justify-between min-w-56 !text-left !shadow-none !bg-transparent"
                                onClick={() => router.push(`/subdomains/app/onboarding?category=${cat}&step=1`)}
                            >
                                {cat.charAt(0).toUpperCase() + cat.slice(1)}
                                <Badge variant={completedInCategory === catForms.length ? "default" : "outline"}>
                                    {completedInCategory}/{catForms.length}
                                </Badge>
                            </TabsTrigger>
                        )
                    })}
                </TabsList>

                {categories.map((cat) => (
                    <TabsContent key={cat} value={cat} className="space-y-8 flex-1">
                        <div className="grid gap-4">


                            <Card className="p-6">
                                <FormProvider
                                    initialForm={JSON.stringify(builderForm)}
                                    onFormChange={(form) => {
                                        // Handle form changes if needed
                                    }}
                                >
                                    <FormPreview onHandleSubmitForm={() => handleSubmitForm(builderForm)} />
                                </FormProvider>
                            </Card>

                            <div className="flex justify-between">
                                <Button
                                    variant="outline"
                                    onClick={() => {
                                        if (step > 1) {
                                            router.push(`/subdomains/app/onboarding?category=${category}&step=${step - 1}`)
                                        } else {
                                            const currentCategoryIndex = categories.indexOf(category)
                                            if (currentCategoryIndex > 0) {
                                                const prevCategory = categories[currentCategoryIndex - 1]
                                                const prevCategoryForms = formsByCategory[prevCategory]
                                                router.push(`/subdomains/app/onboarding?category=${prevCategory}&step=${prevCategoryForms.length}`)
                                            }
                                        }
                                    }}
                                    disabled={step === 1 && categories.indexOf(category) === 0 || isSubmitting}
                                >
                                    Previous
                                </Button>
                                <Button
                                    onClick={() => handleSubmitForm(builderForm)}
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ? (
                                        <span className="flex items-center gap-2">
                                            <span className="h-4 w-4 animate-spin rounded-full border-2 border-background border-t-transparent" />
                                            Submitting...
                                        </span>
                                    ) : completedForms.includes(currentForm.id) ? (
                                        <span className="flex items-center gap-2">
                                            <CheckCircle className="h-4 w-4" />
                                            Completed - Next Form
                                        </span>
                                    ) : (
                                        "Submit and Continue"
                                    )}
                                </Button>
                            </div>
                        </div>
                    </TabsContent>
                ))}
            </Tabs>
        </div>
    )
}
