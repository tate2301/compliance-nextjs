'use client'

import { useState } from 'react'
import { User, Calendar, Mail, Phone, MapPin, Award, ChevronDown, Save } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Card } from '../../components/ui/card'

interface ProfileFormData {
    firstName: string
    lastName: string
    email: string
    phone: string
    dob: string
    address: string
    city: string
    state: string
    zip: string
    specialty: string
    experience: string
    license: string
    licenseExpiry: string
}

export default function ProfileForm() {
    const [formData, setFormData] = useState<ProfileFormData>({
        firstName: 'Sarah',
        lastName: 'Johnson',
        email: 'sarah.johnson@example.com',
        phone: '(555) 123-4567',
        dob: '1985-06-15',
        address: '123 Main Street',
        city: 'San Francisco',
        state: 'CA',
        zip: '94105',
        specialty: 'Registered Nurse',
        experience: '5',
        license: 'RN1234567',
        licenseExpiry: '2024-05-15'
    })

    const [errors, setErrors] = useState<Record<string, string>>({})
    const [isSaving, setIsSaving] = useState(false)
    const [saveSuccess, setSaveSuccess] = useState(false)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))

        // Clear error when field is modified
        if (errors[name]) {
            setErrors(prev => {
                const newErrors = { ...prev }
                delete newErrors[name]
                return newErrors
            })
        }
    }

    const validateForm = () => {
        const newErrors: Record<string, string> = {}

        if (!formData.firstName.trim()) newErrors.firstName = 'First name is required'
        if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required'

        if (!formData.email.trim()) {
            newErrors.email = 'Email is required'
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Email is invalid'
        }

        if (!formData.phone.trim()) {
            newErrors.phone = 'Phone number is required'
        }

        if (!formData.license.trim()) {
            newErrors.license = 'License number is required'
        }

        if (!formData.licenseExpiry.trim()) {
            newErrors.licenseExpiry = 'License expiry date is required'
        }

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()

        if (validateForm()) {
            setIsSaving(true)
            setSaveSuccess(false)

            // Simulate API call
            setTimeout(() => {
                setIsSaving(false)
                setSaveSuccess(true)

                // Hide success message after 3 seconds
                setTimeout(() => setSaveSuccess(false), 3000)
            }, 1500)
        }
    }

    return (
        <Card className="rounded-lg shadow-2 p-6">
            <div className="mb-6">
                <h1 className="text-xl font-semibold text-slate-12 mb-2">Profile Information</h1>
                <p className="text-sm text-slate-11">Update your personal and professional information</p>
            </div>

            {saveSuccess && (
                <div className="mb-6 px-4 py-3 bg-success-2 border border-success-6 text-success-11 rounded-md flex items-center">
                    <CheckCircleIcon className="h-5 w-5 mr-2 text-success-9" />
                    <span>Your profile has been successfully updated!</span>
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Personal Information section */}
                <div>
                    <h2 className="text-md font-medium text-slate-12 mb-4 flex items-center">
                        <User className="h-4 w-4 text-primary-9 mr-2" />
                        Personal Information
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-slate-11 mb-1" htmlFor="firstName">
                                First Name
                            </label>
                            <input
                                id="firstName"
                                name="firstName"
                                type="text"
                                value={formData.firstName}
                                onChange={handleChange}
                                className={cn(
                                    "w-full rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-1",
                                    errors.firstName
                                        ? "border-error-7 focus:border-error-8 focus:ring-error-8"
                                        : "border-slate-6 focus:border-primary-8 focus:ring-primary-8"
                                )}
                            />
                            {errors.firstName && (
                                <p className="mt-1 text-xs text-error-9">{errors.firstName}</p>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-11 mb-1" htmlFor="lastName">
                                Last Name
                            </label>
                            <input
                                id="lastName"
                                name="lastName"
                                type="text"
                                value={formData.lastName}
                                onChange={handleChange}
                                className={cn(
                                    "w-full rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-1",
                                    errors.lastName
                                        ? "border-error-7 focus:border-error-8 focus:ring-error-8"
                                        : "border-slate-6 focus:border-primary-8 focus:ring-primary-8"
                                )}
                            />
                            {errors.lastName && (
                                <p className="mt-1 text-xs text-error-9">{errors.lastName}</p>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-11 mb-1" htmlFor="email">
                                Email Address
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Mail className="h-4 w-4 text-slate-9" />
                                </div>
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className={cn(
                                        "w-full rounded-md border pl-10 px-3 py-2 text-sm focus:outline-none focus:ring-1",
                                        errors.email
                                            ? "border-error-7 focus:border-error-8 focus:ring-error-8"
                                            : "border-slate-6 focus:border-primary-8 focus:ring-primary-8"
                                    )}
                                />
                            </div>
                            {errors.email && (
                                <p className="mt-1 text-xs text-error-9">{errors.email}</p>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-11 mb-1" htmlFor="phone">
                                Phone Number
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Phone className="h-4 w-4 text-slate-9" />
                                </div>
                                <input
                                    id="phone"
                                    name="phone"
                                    type="tel"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    className={cn(
                                        "w-full rounded-md border pl-10 px-3 py-2 text-sm focus:outline-none focus:ring-1",
                                        errors.phone
                                            ? "border-error-7 focus:border-error-8 focus:ring-error-8"
                                            : "border-slate-6 focus:border-primary-8 focus:ring-primary-8"
                                    )}
                                />
                            </div>
                            {errors.phone && (
                                <p className="mt-1 text-xs text-error-9">{errors.phone}</p>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-11 mb-1" htmlFor="dob">
                                Date of Birth
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Calendar className="h-4 w-4 text-slate-9" />
                                </div>
                                <input
                                    id="dob"
                                    name="dob"
                                    type="date"
                                    value={formData.dob}
                                    onChange={handleChange}
                                    className="w-full rounded-md border border-slate-6 pl-10 px-3 py-2 text-sm focus:outline-none focus:border-primary-8 focus:ring-1 focus:ring-primary-8"
                                />
                            </div>
                        </div>

                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-slate-11 mb-1" htmlFor="address">
                                Address
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <MapPin className="h-4 w-4 text-slate-9" />
                                </div>
                                <input
                                    id="address"
                                    name="address"
                                    type="text"
                                    value={formData.address}
                                    onChange={handleChange}
                                    className="w-full rounded-md border border-slate-6 pl-10 px-3 py-2 text-sm focus:outline-none focus:border-primary-8 focus:ring-1 focus:ring-primary-8"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-11 mb-1" htmlFor="city">
                                City
                            </label>
                            <input
                                id="city"
                                name="city"
                                type="text"
                                value={formData.city}
                                onChange={handleChange}
                                className="w-full rounded-md border border-slate-6 px-3 py-2 text-sm focus:outline-none focus:border-primary-8 focus:ring-1 focus:ring-primary-8"
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <label className="block text-sm font-medium text-slate-11 mb-1" htmlFor="state">
                                    State
                                </label>
                                <select
                                    id="state"
                                    name="state"
                                    value={formData.state}
                                    onChange={handleChange}
                                    className="w-full rounded-md border border-slate-6 px-3 py-2 text-sm focus:outline-none focus:border-primary-8 focus:ring-1 focus:ring-primary-8 pr-10 appearance-none bg-no-repeat bg-right"
                                    style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20' stroke-width='1.5' stroke='%2374787a' class='w-5 h-5'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' d='M19.5 8.25l-7.5 7.5-7.5-7.5' /%3E%3C/svg%3E")`, backgroundSize: '20px 20px', backgroundPosition: 'right 8px center' }}
                                >
                                    <option value="AL">Alabama</option>
                                    <option value="AK">Alaska</option>
                                    <option value="AZ">Arizona</option>
                                    <option value="CA">California</option>
                                    <option value="CO">Colorado</option>
                                    <option value="CT">Connecticut</option>
                                    <option value="DE">Delaware</option>
                                    <option value="FL">Florida</option>
                                    <option value="GA">Georgia</option>
                                    <option value="HI">Hawaii</option>
                                    <option value="ID">Idaho</option>
                                    <option value="IL">Illinois</option>
                                    {/* Additional states omitted for brevity */}
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-11 mb-1" htmlFor="zip">
                                    ZIP Code
                                </label>
                                <input
                                    id="zip"
                                    name="zip"
                                    type="text"
                                    value={formData.zip}
                                    onChange={handleChange}
                                    className="w-full rounded-md border border-slate-6 px-3 py-2 text-sm focus:outline-none focus:border-primary-8 focus:ring-1 focus:ring-primary-8"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Professional Information section */}
                <div>
                    <h2 className="text-md font-medium text-slate-12 mb-4 flex items-center">
                        <Award className="h-4 w-4 text-primary-9 mr-2" />
                        Professional Information
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-slate-11 mb-1" htmlFor="specialty">
                                Specialty
                            </label>
                            <select
                                id="specialty"
                                name="specialty"
                                value={formData.specialty}
                                onChange={handleChange}
                                className="w-full rounded-md border border-slate-6 px-3 py-2 text-sm focus:outline-none focus:border-primary-8 focus:ring-1 focus:ring-primary-8 pr-10 appearance-none bg-no-repeat bg-right"
                                style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20' stroke-width='1.5' stroke='%2374787a' class='w-5 h-5'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' d='M19.5 8.25l-7.5 7.5-7.5-7.5' /%3E%3C/svg%3E")`, backgroundSize: '20px 20px', backgroundPosition: 'right 8px center' }}
                            >
                                <option value="Registered Nurse">Registered Nurse</option>
                                <option value="Licensed Practical Nurse">Licensed Practical Nurse</option>
                                <option value="Certified Nursing Assistant">Certified Nursing Assistant</option>
                                <option value="Home Health Aide">Home Health Aide</option>
                                <option value="Physical Therapist">Physical Therapist</option>
                                <option value="Occupational Therapist">Occupational Therapist</option>
                                <option value="Speech Therapist">Speech Therapist</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-11 mb-1" htmlFor="experience">
                                Years of Experience
                            </label>
                            <input
                                id="experience"
                                name="experience"
                                type="number"
                                min="0"
                                max="50"
                                value={formData.experience}
                                onChange={handleChange}
                                className="w-full rounded-md border border-slate-6 px-3 py-2 text-sm focus:outline-none focus:border-primary-8 focus:ring-1 focus:ring-primary-8"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-11 mb-1" htmlFor="license">
                                License Number
                            </label>
                            <input
                                id="license"
                                name="license"
                                type="text"
                                value={formData.license}
                                onChange={handleChange}
                                className={cn(
                                    "w-full rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-1",
                                    errors.license
                                        ? "border-error-7 focus:border-error-8 focus:ring-error-8"
                                        : "border-slate-6 focus:border-primary-8 focus:ring-primary-8"
                                )}
                            />
                            {errors.license && (
                                <p className="mt-1 text-xs text-error-9">{errors.license}</p>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-11 mb-1" htmlFor="licenseExpiry">
                                License Expiry Date
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Calendar className="h-4 w-4 text-slate-9" />
                                </div>
                                <input
                                    id="licenseExpiry"
                                    name="licenseExpiry"
                                    type="date"
                                    value={formData.licenseExpiry}
                                    onChange={handleChange}
                                    className={cn(
                                        "w-full rounded-md border pl-10 px-3 py-2 text-sm focus:outline-none focus:ring-1",
                                        errors.licenseExpiry
                                            ? "border-error-7 focus:border-error-8 focus:ring-error-8"
                                            : "border-slate-6 focus:border-primary-8 focus:ring-primary-8"
                                    )}
                                />
                            </div>
                            {errors.licenseExpiry && (
                                <p className="mt-1 text-xs text-error-9">{errors.licenseExpiry}</p>
                            )}
                        </div>
                    </div>
                </div>

                {/* Form Actions */}
                <div className="pt-4 border-t border-slate-6 flex justify-end">
                    <div className="flex space-x-3">
                        <button
                            type="button"
                            className="px-4 py-2 border border-slate-6 text-slate-11 rounded-md text-sm hover:bg-slate-2 transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={isSaving}
                            className={cn(
                                "px-4 py-2 bg-primary-9 text-white rounded-md text-sm hover:bg-primary-10 transition-colors flex items-center",
                                isSaving && "opacity-70 cursor-not-allowed"
                            )}
                        >
                            {isSaving ? (
                                <>
                                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Saving...
                                </>
                            ) : (
                                <>
                                    <Save className="h-4 w-4 mr-2" />
                                    Save Changes
                                </>
                            )}
                        </button>
                    </div>
                </div>
            </form>
        </Card>
    )
}

function CheckCircleIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
            {...props}
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
        </svg>
    )
} 