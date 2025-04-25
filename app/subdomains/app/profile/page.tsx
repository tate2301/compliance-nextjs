"use client";

import { Button } from '@/components/ui/button'
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from '@/components/ui/breadcrumb'
import Link from 'next/link'
import { useAuth } from '@/lib/auth/auth-context';
import { Verified, Upload } from 'lucide-react';
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label'
import { DocumentItem, EditableField, EditModal, FileUploadModal } from '@/app/components/profile';
import { UserCircleIcon, UsersIcon } from '@heroicons/react/solid';


export default function ProfilePage() {
    const { user } = useAuth();
    const [editValues, setEditValues] = useState({
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        phone: user.phone,
        date_of_birth: user.date_of_birth,
        ni_number: user.ni_number
    });
    const [activeModal, setActiveModal] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleEdit = (field: string) => {
        setActiveModal(field);
    };

    const handleSave = async (field: string) => {
        setIsLoading(true);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        setIsLoading(false);
        setActiveModal(null);
    };

    const handleUploadDocument = (file: File) => {
        // Handle document upload logic here
        console.log('Uploading document:', file);
    };

    return (
        <div className="p-6 rounded-lg max-w-6xl mx-auto w-full">
            <div className='mb-4'>
                <Breadcrumb>
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <BreadcrumbLink asChild>
                                <Link href="/home">Home</Link>
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbLink asChild>
                                <Link href="#"><UserCircleIcon className='size-4 inline-flex mr-1' />Profile</Link>
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
            </div>

            <div className='px-2 mb-4'>
                <h3 className="text-lg leading-6 font-medium text-slate-12">Profile</h3>
                <p className="mt-1 max-w-2xl text-sm text-slate-11">Personal details and application.</p>
            </div>

            <div className="px-2 mt-5 border-t border-slate-6">
                <dl className="divide-y divide-slate-6">
                    <EditableField
                        label="Full name"
                        value={`${editValues.first_name} ${editValues.last_name}`}
                        isEditing={false}
                        onEdit={() => handleEdit('name')}
                        onSave={() => { }}
                        onChange={() => { }}
                        placeholder="Full name"
                    />

                    <EditableField
                        label="Email address"
                        value={editValues.email}
                        isEditing={false}
                        onEdit={() => handleEdit('email')}
                        onSave={() => { }}
                        onChange={() => { }}
                        placeholder="Email address"
                        renderValue={(value) => (
                            <span className="inline-flex items-center gap-2">
                                {value}
                                {!!user.email_verified_at && <Verified className='size-4 text-secondary-11' />}
                            </span>
                        )}
                    />

                    <EditableField
                        label="Phone number"
                        value={editValues.phone}
                        isEditing={false}
                        onEdit={() => handleEdit('phone')}
                        onSave={() => { }}
                        onChange={() => { }}
                        placeholder="Phone number"
                    />

                    <EditableField
                        label="NI Number"
                        value={editValues.ni_number}
                        isEditing={false}
                        onEdit={() => handleEdit('ni_number')}
                        onSave={() => { }}
                        onChange={() => { }}
                        placeholder="NI Number"
                    />

                    <EditableField
                        label="Date of Birth"
                        value={editValues.date_of_birth}
                        isEditing={false}
                        onEdit={() => handleEdit('date_of_birth')}
                        onSave={() => { }}
                        onChange={() => { }}
                        type="date"
                        renderValue={(value) => new Date(value).toLocaleDateString()}
                    />

                    <div className="py-4 sm:grid sm:py-5 sm:grid-cols-3 sm:gap-4">
                        <dt className="text-sm font-medium text-slate-11">References</dt>
                        <dd className="mt-1 text-sm text-slate-12 sm:mt-0 sm:col-span-2">
                            <ul role="list" className="border border-slate-6 rounded-md divide-y divide-slate-6">
                                <DocumentItem
                                    fullname="Tatenda Chinyamakobvu"
                                    email_address='tatendachris@gmail.com'
                                    onUpdate={() => setActiveModal('document_upload')}
                                    onRemove={() => { }}
                                />
                                <DocumentItem
                                    fullname="Sean Muchenje"
                                    email_address='seanmuchie@gmail.com'
                                    updatedDate="22 Mar, 2025"
                                    onUpdate={() => setActiveModal('document_upload')}
                                    onRemove={() => { }}
                                />
                            </ul>
                            <div className="mt-4">
                                <Button
                                    variant="outline"
                                    onClick={() => setActiveModal('document_upload')}
                                    className="w-full justify-center"
                                >
                                    <UsersIcon className="mr-2 h-4 w-4" />
                                    Add new reference
                                </Button>
                            </div>
                        </dd>
                    </div>
                </dl>
            </div>

            {/* Edit Modals */}
            <EditModal
                isOpen={activeModal === 'name'}
                onClose={() => setActiveModal(null)}
                onSave={() => handleSave('name')}
                title="Edit Full Name"
                description="Update your full name"
                isLoading={isLoading}
            >
                <div className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="first_name">First Name</Label>
                        <Input
                            id="first_name"
                            value={editValues.first_name}
                            onChange={(e) => setEditValues(prev => ({ ...prev, first_name: e.target.value }))}
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="last_name">Last Name</Label>
                        <Input
                            id="last_name"
                            value={editValues.last_name}
                            onChange={(e) => setEditValues(prev => ({ ...prev, last_name: e.target.value }))}
                        />
                    </div>
                </div>
            </EditModal>

            <EditModal
                isOpen={activeModal === 'email'}
                onClose={() => setActiveModal(null)}
                onSave={() => handleSave('email')}
                title="Edit Email Address"
                description="Update your email address. You'll need to verify the new email."
                isLoading={isLoading}
            >
                <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                        id="email"
                        type="email"
                        value={editValues.email}
                        onChange={(e) => setEditValues(prev => ({ ...prev, email: e.target.value }))}
                    />
                </div>
            </EditModal>

            <EditModal
                isOpen={activeModal === 'phone'}
                onClose={() => setActiveModal(null)}
                onSave={() => handleSave('phone')}
                title="Edit Phone Number"
                description="Update your phone number"
                isLoading={isLoading}
            >
                <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                        id="phone"
                        type="tel"
                        value={editValues.phone}
                        onChange={(e) => setEditValues(prev => ({ ...prev, phone: e.target.value }))}
                    />
                </div>
            </EditModal>

            <EditModal
                isOpen={activeModal === 'ni_number'}
                onClose={() => setActiveModal(null)}
                onSave={() => handleSave('ni_number')}
                title="Edit NI Number"
                description="Update your National Insurance number"
                isLoading={isLoading}
            >
                <div className="space-y-2">
                    <Label htmlFor="ni_number">NI Number</Label>
                    <Input
                        id="ni_number"
                        value={editValues.ni_number}
                        onChange={(e) => setEditValues(prev => ({ ...prev, ni_number: e.target.value }))}
                    />
                </div>
            </EditModal>

            <EditModal
                isOpen={activeModal === 'date_of_birth'}
                onClose={() => setActiveModal(null)}
                onSave={() => handleSave('date_of_birth')}
                title="Edit Date of Birth"
                description="Update your date of birth"
                isLoading={isLoading}
            >
                <div className="space-y-2">
                    <Label htmlFor="date_of_birth">Date of Birth</Label>
                    <Input
                        id="date_of_birth"
                        type="date"
                        value={editValues.date_of_birth}
                        onChange={(e) => setEditValues(prev => ({ ...prev, date_of_birth: e.target.value }))}
                    />
                </div>
            </EditModal>

            <FileUploadModal
                isOpen={activeModal === 'document_upload'}
                onClose={() => setActiveModal(null)}
                onUpload={handleUploadDocument}
            />
        </div>
    );
}
