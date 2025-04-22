'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
    Calendar,
    FileText,
    Clock,
    AlertCircle,
    CheckCircle,
    Award,
    User,
    ChevronRight,
    MessageSquare,
    PlusCircle,
    Upload
} from 'lucide-react'
import { Alert } from '@/app/components/ui/alert'
import { Badge } from '@/app/components/ui/badge'
import { EmptyState } from '@/app/components/ui/empty-state'

export default function CaregiverDashboard() {
    const [showWelcomeAlert, setShowWelcomeAlert] = useState(true)

    // Sample data
    const upcomingShifts = [
        {
            id: 1,
            facility: 'Golden Meadows Nursing Home',
            role: 'Registered Nurse',
            date: 'Monday, July 3, 2023',
            time: '7:00 AM - 3:30 PM',
            status: 'confirmed',
        },
        {
            id: 2,
            facility: 'Sunshine Senior Living',
            role: 'Registered Nurse',
            date: 'Wednesday, July 5, 2023',
            time: '3:00 PM - 11:30 PM',
            status: 'confirmed',
        }
    ]

    const documents = [
        {
            id: 1,
            name: 'Nursing License',
            type: 'Professional License',
            expiryDate: 'May 15, 2024',
            status: 'valid'
        },
        {
            id: 2,
            name: 'CPR Certification',
            type: 'Certification',
            expiryDate: 'August 30, 2023',
            status: 'expiring-soon'
        },
        {
            id: 3,
            name: 'TB Test Results',
            type: 'Medical Record',
            expiryDate: 'December 15, 2023',
            status: 'valid'
        },
        {
            id: 4,
            name: 'COVID-19 Vaccination',
            type: 'Immunization Record',
            status: 'missing'
        }
    ]

    return (
        <div className="max-w-7xl mx-auto pt-4 pb-12">
            {showWelcomeAlert && (
                <Alert
                    variant="info"
                    title="Welcome back, Sarah!"
                    dismissible
                    onDismiss={() => setShowWelcomeAlert(false)}
                >
                    Your profile is 85% complete. Finish setting up your profile to increase your chances of getting shifts.
                </Alert>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
                {/* Left column */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Upcoming shifts */}
                    <div className="bg-slate-1 rounded-lg shadow-2 p-6">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-lg font-semibold text-slate-12 flex items-center">
                                <Calendar className="h-5 w-5 mr-2 text-primary-9" />
                                Upcoming Shifts
                            </h2>
                            <Link href="/caregiver-dashboard/shifts" className="text-sm text-primary-9 hover:text-primary-10 flex items-center">
                                View All <ChevronRight className="h-4 w-4 ml-1" />
                            </Link>
                        </div>

                        {upcomingShifts.length > 0 ? (
                            <div className="space-y-4">
                                {upcomingShifts.map(shift => (
                                    <div key={shift.id} className="border border-slate-5 rounded-md p-4 hover:border-slate-6 transition-colors">
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <h3 className="font-medium text-slate-12">{shift.facility}</h3>
                                                <p className="text-sm text-slate-11">{shift.role}</p>
                                                <div className="mt-2 flex items-center text-sm text-slate-11">
                                                    <Calendar className="h-4 w-4 mr-1" />
                                                    {shift.date}
                                                </div>
                                                <div className="mt-1 flex items-center text-sm text-slate-11">
                                                    <Clock className="h-4 w-4 mr-1" />
                                                    {shift.time}
                                                </div>
                                            </div>
                                            <Badge variant="success" className="mt-1">Confirmed</Badge>
                                        </div>
                                    </div>
                                ))}

                                <div className="mt-4">
                                    <button className="w-full border border-dashed border-slate-6 rounded-md p-3 text-sm text-slate-11 hover:border-slate-8 hover:text-slate-12 transition-colors flex items-center justify-center">
                                        <PlusCircle className="h-4 w-4 mr-2" />
                                        Find More Shifts
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <EmptyState
                                title="No upcoming shifts"
                                description="You don't have any upcoming shifts. Browse available shifts to start booking."
                                icon={<Calendar className="h-8 w-8 text-slate-9" />}
                                primaryAction={
                                    <button className="px-4 py-2 bg-primary-9 text-slate-1 rounded-md inline-flex items-center shadow-1 hover:bg-primary-10 transition-colors">
                                        <PlusCircle className="mr-2 h-4 w-4" />
                                        Find Shifts
                                    </button>
                                }
                            />
                        )}
                    </div>

                    {/* Documents */}
                    <div className="bg-slate-1 rounded-lg shadow-2 p-6">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-lg font-semibold text-slate-12 flex items-center">
                                <FileText className="h-5 w-5 mr-2 text-primary-9" />
                                Documents
                            </h2>
                            <Link href="/caregiver-dashboard/documents" className="text-sm text-primary-9 hover:text-primary-10 flex items-center">
                                View All <ChevronRight className="h-4 w-4 ml-1" />
                            </Link>
                        </div>

                        <div className="space-y-4">
                            {documents.map(doc => (
                                <div key={doc.id} className="border border-slate-5 rounded-md p-4 hover:border-slate-6 transition-colors">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <h3 className="font-medium text-slate-12">{doc.name}</h3>
                                            <p className="text-sm text-slate-11">{doc.type}</p>
                                            {doc.expiryDate && (
                                                <p className="text-sm text-slate-11 mt-1">
                                                    Expires: {doc.expiryDate}
                                                </p>
                                            )}
                                        </div>
                                        {doc.status === 'valid' && (
                                            <Badge variant="success" className="flex items-center">
                                                <CheckCircle className="h-3 w-3 mr-1" /> Valid
                                            </Badge>
                                        )}
                                        {doc.status === 'expiring-soon' && (
                                            <Badge variant="warning" className="flex items-center">
                                                <AlertCircle className="h-3 w-3 mr-1" /> Expiring Soon
                                            </Badge>
                                        )}
                                        {doc.status === 'missing' && (
                                            <Badge variant="destructive" className="flex items-center">
                                                Required
                                            </Badge>
                                        )}
                                    </div>
                                </div>
                            ))}

                            <div className="mt-4">
                                <button className="w-full border border-dashed border-slate-6 rounded-md p-3 text-sm text-slate-11 hover:border-slate-8 hover:text-slate-12 transition-colors flex items-center justify-center">
                                    <Upload className="h-4 w-4 mr-2" />
                                    Upload New Document
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right column */}
                <div className="space-y-6">
                    {/* Profile completion card */}
                    <div className="bg-slate-1 rounded-lg shadow-2 p-6">
                        <div className="flex items-center mb-4">
                            <User className="h-5 w-5 mr-2 text-primary-9" />
                            <h2 className="text-lg font-semibold text-slate-12">Profile Completion</h2>
                        </div>

                        <div className="mb-4">
                            <div className="flex justify-between text-sm mb-1">
                                <span className="text-slate-11">85% complete</span>
                                <span className="text-primary-9 font-medium">17/20</span>
                            </div>
                            <div className="w-full bg-slate-3 rounded-full h-2.5">
                                <div className="bg-primary-9 h-2.5 rounded-full" style={{ width: '85%' }}></div>
                            </div>
                        </div>

                        <div className="space-y-2 mb-4">
                            <div className="flex justify-between items-center p-2 bg-slate-2 rounded-md">
                                <span className="text-sm text-slate-11">COVID-19 Vaccination</span>
                                <Badge variant="destructive" size="sm">Missing</Badge>
                            </div>
                            <div className="flex justify-between items-center p-2 bg-slate-2 rounded-md">
                                <span className="text-sm text-slate-11">Skills Assessment</span>
                                <Badge variant="destructive" size="sm">Missing</Badge>
                            </div>
                            <div className="flex justify-between items-center p-2 bg-slate-2 rounded-md">
                                <span className="text-sm text-slate-11">References</span>
                                <Badge variant="outline" size="sm">1/3</Badge>
                            </div>
                        </div>

                        <Link href="/caregiver-dashboard/profile" className="block w-full text-center px-4 py-2 bg-primary-9 text-slate-1 rounded-md text-sm font-medium hover:bg-primary-10 transition-colors">
                            Complete Your Profile
                        </Link>
                    </div>

                    {/* Certifications */}
                    <div className="bg-slate-1 rounded-lg shadow-2 p-6">
                        <div className="flex items-center mb-4">
                            <Award className="h-5 w-5 mr-2 text-primary-9" />
                            <h2 className="text-lg font-semibold text-slate-12">Certifications</h2>
                        </div>

                        <div className="space-y-3">
                            <div className="flex justify-between items-center">
                                <span className="text-sm text-slate-12">Registered Nurse (RN)</span>
                                <Badge variant="success" size="sm">Active</Badge>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-sm text-slate-12">Basic Life Support (BLS)</span>
                                <Badge variant="success" size="sm">Active</Badge>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-sm text-slate-12">Advanced Cardiac Life Support</span>
                                <Badge variant="warning" size="sm">Expiring Soon</Badge>
                            </div>
                        </div>

                        <div className="mt-4 border-t border-slate-5 pt-4">
                            <button className="w-full text-primary-9 text-sm font-medium flex items-center justify-center">
                                <PlusCircle className="h-4 w-4 mr-2" />
                                Add Certification
                            </button>
                        </div>
                    </div>

                    {/* Support */}
                    <div className="bg-slate-1 rounded-lg shadow-2 p-6">
                        <div className="flex items-center mb-4">
                            <MessageSquare className="h-5 w-5 mr-2 text-primary-9" />
                            <h2 className="text-lg font-semibold text-slate-12">Support</h2>
                        </div>

                        <p className="text-sm text-slate-11 mb-4">
                            Need help with your account or have questions about shifts?
                        </p>

                        <button className="w-full px-4 py-2 border border-slate-6 text-slate-11 rounded-md text-sm hover:bg-slate-2 transition-colors flex items-center justify-center">
                            <MessageSquare className="h-4 w-4 mr-2" />
                            Contact Support
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
} 