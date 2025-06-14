"use client";

import { Button } from "@/components/ui/button";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Link from "next/link";
import { useAuth } from "@/lib/auth/auth-context";
import { Verified, Upload } from "lucide-react";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  DocumentItem,
  EditableField,
  EditModal,
  FileUploadModal,
} from "components/profile";
import {
  DocumentTextIcon,
  HomeIcon,
  IdentificationIcon,
  UserCircleIcon,
  UserIcon,
  UsersIcon,
} from "@heroicons/react/solid";
import { DashboardProfileLayout } from "@/components/Wrappers/dashboard-profile-layout";
import LoadingPlaceholder from "@/components/LoadingPlaceholder";

export default function ProfilePage() {
  const { user } = useAuth();
  const [editValues, setEditValues] = useState({
    first_name: user?.first_name,
    last_name: user?.last_name,
    email: user?.email,
    phone: user?.phone,
    date_of_birth: user?.date_of_birth,
    ni_number: user?.ni_number,
  });
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleEdit = (field: string) => {
    setActiveModal(field);
  };

  const handleSave = async (field: string) => {
    setIsLoading(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsLoading(false);
    setActiveModal(null);
  };

  const handleUploadDocument = (file: File) => {
    // Handle document upload logic here
    console.log("Uploading document:", file);
  };

  if (isLoading) {
    return <LoadingPlaceholder />
  }

  return (
    <DashboardProfileLayout
      title="Personal information"
      subtitle="Information must match your legal documents"
    >
      <dl className="divide-y divide-sand-6">
        <EditableField
          label="Full name"
          value={`${editValues.first_name} ${editValues.last_name}`}
          isEditing={false}
          onEdit={() => handleEdit("name")}
          onSave={() => {}}
          onChange={() => {}}
          placeholder="Full name"
        />

        <EditableField
          label="Email address"
          value={editValues.email}
          isEditing={false}
          onEdit={() => handleEdit("email")}
          onSave={() => {}}
          onChange={() => {}}
          placeholder="Email address"
          renderValue={(value) => (
            <span className="inline-flex items-center gap-2">
              {value}
              {!!user?.email_verified_at && (
                <Verified className="size-4 text-secondary-11" />
              )}
            </span>
          )}
        />

        <EditableField
          label="Phone number"
          value={editValues.phone}
          isEditing={false}
          onEdit={() => handleEdit("phone")}
          onSave={() => {}}
          onChange={() => {}}
          placeholder="Phone number"
        />

        <EditableField
          label="NI Number"
          value={editValues.ni_number}
          isEditing={false}
          onEdit={() => handleEdit("ni_number")}
          onSave={() => {}}
          onChange={() => {}}
          placeholder="NI Number"
        />

        <EditableField
          label="Date of Birth"
          value={editValues.date_of_birth}
          isEditing={false}
          onEdit={() => handleEdit("date_of_birth")}
          onSave={() => {}}
          onChange={() => {}}
          type="date"
          renderValue={(value) => new Date(value).toLocaleDateString()}
        />
      </dl>

      {/* Edit Modals */}
      <EditModal
        isOpen={activeModal === "name"}
        onClose={() => setActiveModal(null)}
        onSave={() => handleSave("name")}
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
              onChange={(e) =>
                setEditValues((prev) => ({
                  ...prev,
                  first_name: e.target.value,
                }))
              }
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="last_name">Last Name</Label>
            <Input
              id="last_name"
              value={editValues.last_name}
              onChange={(e) =>
                setEditValues((prev) => ({
                  ...prev,
                  last_name: e.target.value,
                }))
              }
            />
          </div>
        </div>
      </EditModal>

      <EditModal
        isOpen={activeModal === "email"}
        onClose={() => setActiveModal(null)}
        onSave={() => handleSave("email")}
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
            onChange={(e) =>
              setEditValues((prev) => ({ ...prev, email: e.target.value }))
            }
          />
        </div>
      </EditModal>

      <EditModal
        isOpen={activeModal === "phone"}
        onClose={() => setActiveModal(null)}
        onSave={() => handleSave("phone")}
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
            onChange={(e) =>
              setEditValues((prev) => ({ ...prev, phone: e.target.value }))
            }
          />
        </div>
      </EditModal>

      <EditModal
        isOpen={activeModal === "ni_number"}
        onClose={() => setActiveModal(null)}
        onSave={() => handleSave("ni_number")}
        title="Edit NI Number"
        description="Update your National Insurance number"
        isLoading={isLoading}
      >
        <div className="space-y-2">
          <Label htmlFor="ni_number">NI Number</Label>
          <Input
            id="ni_number"
            value={editValues.ni_number}
            onChange={(e) =>
              setEditValues((prev) => ({
                ...prev,
                ni_number: e.target.value,
              }))
            }
          />
        </div>
      </EditModal>

      <EditModal
        isOpen={activeModal === "date_of_birth"}
        onClose={() => setActiveModal(null)}
        onSave={() => handleSave("date_of_birth")}
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
            onChange={(e) =>
              setEditValues((prev) => ({
                ...prev,
                date_of_birth: e.target.value,
              }))
            }
          />
        </div>
      </EditModal>

      <FileUploadModal
        isOpen={activeModal === "document_upload"}
        onClose={() => setActiveModal(null)}
        onUpload={handleUploadDocument}
      />
    </DashboardProfileLayout>
  );
}
