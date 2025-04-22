'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import CaregiverDashboard from './dashboard-view'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import ProfileForm from './profile-form'

export default function CaregiverDashboardPage() {
    const [view, setView] = useState('dashboard')
    const router = useRouter()

    const handleViewChange = (value: string) => {
        setView(value)
        if (value === 'profile') {
            router.push('/caregiver-dashboard/profile')
        } else if (value === 'dashboard') {
            router.push('/caregiver-dashboard')
        } else if (value === 'documents' || value === 'shifts') {
            // Just placeholders for now, but redirect to dashboard
            router.push('/caregiver-dashboard')
        }
    }

    return (
        <div className="min-h-screen bg-slate-1">
            <div className="bg-slate-1 border-b border-slate-6 py-4 px-6 mb-6">
                <div className="max-w-7xl mx-auto flex items-center justify-between">
                    <h1 className="text-2xl font-bold text-slate-12">CareConnect Platform</h1>

                    <div className="flex space-x-6">
                        <Tabs defaultValue="dashboard" value={view} onValueChange={handleViewChange} className="w-full">
                            <TabsList>
                                <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
                                <TabsTrigger value="profile">Profile</TabsTrigger>
                                <TabsTrigger value="documents">Documents</TabsTrigger>
                                <TabsTrigger value="shifts">Shifts</TabsTrigger>
                            </TabsList>
                        </Tabs>
                    </div>

                    <Link href="/design-system" className="text-sm text-primary-9 hover:underline">
                        Back to Design System
                    </Link>
                </div>
            </div>

            <div className="px-4">
                <CaregiverDashboard />
            </div>
        </div>
    )
}