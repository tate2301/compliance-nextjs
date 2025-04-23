"use client"

import { useEffect, useState, useRef } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { FormPreview, FormPreviewRef } from "@/forms_builder/components/FormPreview"
import complianceForms from "@/app/data/compliance-forms.json"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { FormProvider } from "@/forms_builder/context"
import { Form, FormField } from "@/forms_builder/types"
import { cn } from "@/lib/utils"
import { getJotFormById } from "@/app/actions/forms"

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

// Helper function to process form fields recursively
function processFields(formFields: any[]): FormField[] {
    const fields: FormField[] = [];

    formFields.forEach((field) => {
        if (field.type === 'section' && field.fields) {
            // For sections, add a label field and then process nested fields
            fields.push({
                id: `${field.id}_label`,
                type: "shortAnswer",
                label: field.label,
                required: false,
                properties: {
                    placeholder: field.label,
                    minLength: 0,
                    maxLength: 0
                }
            });
            fields.push(...processFields(field.fields));
        } else {
            // Map form field types to builder field types
            const fieldType = {
                text: 'shortAnswer',
                email: 'email',
                phone: 'shortAnswer',
                date: 'date',
                multipleChoice: 'multipleChoice',
                yesNo: 'yesNo',
                npsRating: 'npsRating',
                signature: 'signature',
                name: 'shortAnswer',
                address: 'longAnswer',
                paragraph: 'paragraph'
            }[field.type] || 'paragraph';

            // Process multiple choice options if they exist
            const choices = field.options?.map((option: any) =>
                typeof option === 'string' ? option : option.label || option.value
            );

            fields.push({
                id: field.id,
                type: fieldType,
                label: field.label,
                required: field.required || false,
                properties: {
                    placeholder: `Enter ${field.label.toLowerCase()}`,
                    ...(choices && { choices }),
                    minLength: 0,
                    maxLength: fieldType === 'shortAnswer' ? 1000 : 2000,
                    text: field.text
                }
            });
        }
    });

    return fields;
}


interface FormWithValues extends Form {
    values: Record<string, string>;
}

export default function OnboardingPage() {
    const router = useRouter()
    const searchParams = useSearchParams()
    const { toast } = useToast()
    const formRef = useRef<FormPreviewRef>(null)

    const category = searchParams.get("category") || categories[0]
    const step = parseInt(searchParams.get("step") || "1")

    const currentForms = formsByCategory[category] || []
    const currentForm = currentForms[step - 1]

    const [completedForms, setCompletedForms] = useState<string[]>([])
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [formData, setFormData] = useState<Form | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (!currentForm) {
            const currentCategoryIndex = categories.indexOf(category)
            if (currentCategoryIndex < categories.length - 1) {
                router.push(`/subdomains/app/onboarding?category=${categories[currentCategoryIndex + 1]}&step=1`)
            } else {
                router.push("/dashboard")
            }
        }
    }, [currentForm, category, step, router])

    useEffect(() => {
        async function loadForm() {
            if (currentForm) {
                setIsLoading(true);
                try {
                    // Extract form ID from the JotForm URL
                    const formId = currentForm.url.split("/").pop() || "";
                    const form = await getJotFormById(formId);
                    setFormData(form);
                } catch (error) {
                    console.error('Error loading form:', error);
                    toast({
                        title: "Error",
                        description: "There was an error loading the form. Please try again.",
                        variant: "destructive",
                    });
                } finally {
                    setIsLoading(false);
                }
            }
        }
        loadForm();
    }, [currentForm]);

    const handleSubmitForm = async (formData: FormWithValues) => {
        setIsSubmitting(true)
        try {
            const hasEmptyRequiredFields = formData.fields.some(
                field => field.required && !formData.values[field.id]?.trim()
            );

            if (hasEmptyRequiredFields) {
                toast({
                    title: "Error",
                    description: "Please fill in all required fields before proceeding.",
                    variant: "destructive",
                });
                return;
            }

            // Here you could submit the form data to JotForm using their submission API
            await new Promise((resolve) => setTimeout(resolve, 1000))
            setCompletedForms(prev => [...prev, currentForm.id])

            if (step < currentForms.length) {
                router.push(`/subdomains/app/onboarding?category=${category}&step=${step + 1}`)
            } else {
                const currentCategoryIndex = categories.indexOf(category)
                if (currentCategoryIndex < categories.length - 1) {
                    router.push(`/subdomains/app/onboarding?category=${categories[currentCategoryIndex + 1]}&step=1`)
                } else {
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


    return (
        <div className="flex flex-col lg:flex-row gap-4 lg:gap-8">


            {/* Left sidebar with steps */}
            <div className="w-full lg:w-72 lg:flex-none">
                <div className="flex lg:flex-col gap-2 lg:gap-1 pb-4 lg:pb-0 overflow-x-auto scrollbar-none">
                    {categories.map((cat, categoryIndex) => {
                        const catForms = formsByCategory[cat]
                        const isCurrentCategory = cat === category
                        const isCompleted = catForms.every(form => completedForms.includes(form.id))
                        const isActive = isCurrentCategory
                        const isPending = categoryIndex > categories.indexOf(category)

                        return (
                            <div key={cat} className="flex-none lg:flex-initial min-w-[200px] lg:min-w-0">
                                <button
                                    onClick={() => router.push(`/subdomains/app/onboarding?category=${cat}&step=1`)}
                                    className={cn(
                                        "w-full text-left",
                                        isActive && "cursor-default"
                                    )}
                                >
                                    <div className={cn(
                                        "flex items-center gap-3 rounded-lg border-2 p-3",
                                        isCompleted && "border-success-10 bg-primary/5",
                                        isActive && "border-secondary-10 bg-slate-1",
                                        isPending && "opacity-50 hover:opacity-75 transition-opacity"
                                    )}>
                                        <div className={cn(
                                            "flex h-6 w-6 shrink-0 items-center justify-center rounded-full border text-sm font-medium",
                                            isCompleted && "border-success-10 bg-success-4 text-white",
                                            isActive && "border-primary bg-primary text-white",
                                            isPending && "border-muted-foreground text-muted-foreground"
                                        )}>
                                            {isCompleted ? <CheckCircle className="h-4 w-4 text-white" /> : categoryIndex + 1}
                                        </div>
                                        <div className="flex flex-col min-w-0 flex-1">
                                            <div className="text-sm font-medium mb-1 truncate">
                                                {cat.charAt(0).toUpperCase() + cat.slice(1)}
                                            </div>
                                            <div className="text-xs text-slate-10">
                                                {catForms.filter(form => completedForms.includes(form.id)).length}/{catForms.length} completed
                                            </div>
                                        </div>
                                    </div>
                                </button>

                                {isCurrentCategory && (
                                    <div className="ml-7 space-y-1 border-l pl-4 hidden lg:block mt-2">
                                        {catForms.map((form, formIndex) => {
                                            const isCompleted = completedForms.includes(form.id)
                                            const isActive = formIndex + 1 === step
                                            const isPending = formIndex + 1 > step

                                            return (
                                                <button
                                                    key={form.id}
                                                    onClick={() => router.push(`/subdomains/app/onboarding?category=${cat}&step=${formIndex + 1}`)}
                                                    className={cn(
                                                        "flex w-full items-center gap-3 rounded-lg p-2 text-left text-sm transition-colors",
                                                        isCompleted && "text-primary",
                                                        isActive && "bg-accent text-accent-foreground",
                                                        isPending && "text-muted-foreground hover:text-muted-foreground/80"
                                                    )}
                                                >
                                                    <div className={cn(
                                                        "h-2 w-2 rounded-full shrink-0",
                                                        isCompleted && "bg-primary",
                                                        isActive && "bg-background",
                                                        isPending && "bg-muted-foreground"
                                                    )} />
                                                    <span className="truncate">{form.title}</span>
                                                </button>
                                            )
                                        })}
                                    </div>
                                )}
                            </div>
                        )
                    })}
                </div>
            </div>

            {/* Main content */}
            <div className="flex-1 min-w-0">
                <div className="grid gap-4">
                    <Card className="overflow-hidden">
                        {/* Form title for desktop */}
                        {currentForm && (
                            <div className="hidden lg:block px-6 py-4 border-b">
                                <h2 className="text-lg font-semibold text-slate-12">{currentForm.title}</h2>
                            </div>
                        )}

                        <div className="p-4 sm:p-6">
                            {isLoading ? (
                                <div className="flex items-center justify-center p-8">
                                    <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
                                </div>
                            ) : formData ? (
                                <FormProvider
                                    initialForm={JSON.stringify(formData)}
                                    onFormChange={(form) => {
                                        // Handle form changes if needed
                                    }}
                                >
                                    <FormPreview ref={formRef} onHandleSubmitForm={handleSubmitForm} />
                                </FormProvider>
                            ) : (
                                <div className="p-8 text-center text-muted-foreground">
                                    Form could not be loaded
                                </div>
                            )}
                        </div>
                    </Card>

                    <div className="flex  justify-between gap-3 px-6 lg:px-0 sticky bottom-0 bg-background/80 backdrop-blur-sm p-4 -mx-4 border-t lg:mx-0 lg:p-0 lg:border-0 lg:bg-transparent lg:backdrop-blur-none">
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
                            className="sm:w-auto"
                        >
                            Previous
                        </Button>
                        <Button
                            onClick={async () => {
                                if (formRef.current) {
                                    const isValid = await formRef.current.submitForm();
                                    if (isValid) {
                                        // The form submission is handled by onHandleSubmitForm
                                    }
                                }
                            }}
                            disabled={isSubmitting}
                            className="sm:w-auto"
                        >
                            {isSubmitting ? (
                                <span className="flex items-center gap-2">
                                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-background border-t-transparent" />
                                    Submitting...
                                </span>
                            ) : completedForms.includes(currentForm.id) ? (
                                <span className="flex items-center gap-2">
                                    <CheckCircle className="h-4 w-4" />
                                    Next Step
                                </span>
                            ) : (
                                "Submit and Continue"
                            )}
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}
