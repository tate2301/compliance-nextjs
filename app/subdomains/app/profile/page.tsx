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
} from "@/app/components/profile";
import {
  DocumentTextIcon,
  HomeIcon,
  IdentificationIcon,
  UserCircleIcon,
  UserIcon,
  UsersIcon,
} from "@heroicons/react/solid";
import { useUser } from "@/app/hooks/user";
import { toast } from "sonner";

export default function ProfilePage() {
  const { user } = useAuth();
  const { userData, isLoading, updateUser, isUpdating } = useUser();
  const [activeField, setActiveField] = useState<string | null>(null);
  const [editValues, setEditValues] = useState({
    first_name: user?.first_name,
    last_name: user?.last_name,
    email: user?.email,
    phone: user?.phone,
    date_of_birth: user?.date_of_birth,
    ni_number: user?.ni_number,
  });
  const [activeModal, setActiveModal] = useState<string | null>(null);

  const handleEdit = (field: string) => {
    setActiveField(field);
  };

  const handleSave = async (field: string, value: string) => {
    try {
      await updateUser({ [field]: value });
      setActiveField(null);
    } catch (error) {
      // Error is handled in the mutation
    }
  };

  const handleModalEdit = (field: string) => {
    setActiveModal(field);
  };

  const handleModalSave = async (field: string) => {
    try {
      if (field === "name") {
        await updateUser({
          first_name: editValues.first_name,
          last_name: editValues.last_name,
        });
      } else {
        await updateUser({ [field]: editValues[field] });
      }
      setActiveModal(null);
    } catch (error) {
      toast.error(`Failed to update ${field}`);
    }
  };

  const handleUploadDocument = (file: File) => {
    // Handle document upload logic here
    console.log("Uploading document:", file);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-6 rounded-lg max-w-6xl mx-auto w-full">
      <div className="mb-4">
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
                <Link href="#">
                  <UserCircleIcon className="size-4 inline-flex mr-1" />
                  Profile
                </Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      <div className="px-2 mb-4">
        <h3 className="text-lg leading-6 font-medium text-slate-12">Profile</h3>
        <p className="mt-1 max-w-2xl text-sm text-slate-11">
          Personal details and application.
        </p>
      </div>

      <div className="px-2 mt-5 border-t border-slate-6 flex gap-6">
        <div className="flex flex-col sticky top-0 w-64 py-4">
          <ul className="space-y-2">
            <li className="p-2 h-[40px] flex items-center border border-transparent text-slate-10 hover:border-secondary-6 hover:bg-secondary-4 hover:text-secondary-11">
              <Link className="w-full h-full" href={"/profile/info"}>
                <UserIcon className="size-4 inline-flex self-center mr-2" />
                Personal Information
              </Link>
            </li>
            <li className="p-2 h-[40px] flex items-center border border-transparent text-slate-10 hover:border-secondary-6 hover:bg-secondary-4 hover:text-secondary-11">
              <Link className="w-full h-full" href={"/profile/address"}>
                <HomeIcon className="size-4 inline-flex self-center mr-2" />
                Physical Address
              </Link>
            </li>
            <li className="p-2 h-[40px] flex items-center border border-transparent text-slate-10 hover:border-secondary-6 hover:bg-secondary-4 hover:text-secondary-11">
              <Link className="w-full h-full" href={"/profile/identification"}>
                <IdentificationIcon className="size-4 inline-flex self-center mr-2" />
                Identification
              </Link>
            </li>
            <li className="p-2 h-[40px] flex items-center border border-transparent text-slate-10 hover:border-secondary-6 hover:bg-secondary-4 hover:text-secondary-11">
              <Link className="w-full h-full" href={"/profile/dbs"}>
                <DocumentTextIcon className="size-4 inline-flex self-center mr-2" />
                DBS
              </Link>
            </li>
            <li className="p-2 h-[40px] flex items-center border border-transparent text-slate-10 hover:border-secondary-6 hover:bg-secondary-4 hover:text-secondary-11">
              <Link className="w-full h-full" href={"/profile/references"}>
                <UsersIcon className="size-4 inline-flex self-center mr-2" />
                References
              </Link>
            </li>
          </ul>
        </div>
        <dl className="divide-y divide-slate-6 w-full">
          <EditableField
            label="Full name"
            value={`${userData?.first_name || ""} ${userData?.last_name || ""}`}
            isEditing={activeField === "name"}
            onEdit={() => handleEdit("name")}
            onSave={(value) => handleSave("name", value)}
            onChange={() => {}}
            placeholder="Full name"
          />

          <EditableField
            label="Email address"
            value={userData?.email || ""}
            isEditing={activeField === "email"}
            onEdit={() => handleEdit("email")}
            onSave={(value) => handleSave("email", value)}
            onChange={() => {}}
            placeholder="Email address"
            renderValue={(value) => (
              <span className="inline-flex items-center gap-2">
                {value}
                {!!userData?.email_verified_at && (
                  <Verified className="size-4 text-secondary-11" />
                )}
              </span>
            )}
          />

          <EditableField
            label="Phone number"
            value={userData?.phone || ""}
            isEditing={activeField === "phone"}
            onEdit={() => handleEdit("phone")}
            onSave={(value) => handleSave("phone", value)}
            onChange={() => {}}
            placeholder="Phone number"
          />

          <EditableField
            label="NI Number"
            value={userData?.ni_number || ""}
            isEditing={activeField === "ni_number"}
            onEdit={() => handleEdit("ni_number")}
            onSave={(value) => handleSave("ni_number", value)}
            onChange={() => {}}
            placeholder="NI Number"
          />

          <EditableField
            label="Date of Birth"
            value={userData?.date_of_birth || ""}
            isEditing={activeField === "date_of_birth"}
            onEdit={() => handleEdit("date_of_birth")}
            onSave={(value) => handleSave("date_of_birth", value)}
            onChange={() => {}}
            type="date"
            renderValue={(value) =>
              value ? new Date(value).toLocaleDateString() : ""
            }
          />
        </dl>
      </div>

      {/* Edit Modals */}
      <EditModal
        isOpen={activeModal === "name"}
        onClose={() => setActiveModal(null)}
        onSave={() => handleModalSave("name")}
        title="Edit Full Name"
        description="Update your full name"
        isLoading={isUpdating}
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
        onSave={() => handleModalSave("email")}
        title="Edit Email Address"
        description="Update your email address. You'll need to verify the new email."
        isLoading={isUpdating}
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
        onSave={() => handleModalSave("phone")}
        title="Edit Phone Number"
        description="Update your phone number"
        isLoading={isUpdating}
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
        onSave={() => handleModalSave("ni_number")}
        title="Edit NI Number"
        description="Update your National Insurance number"
        isLoading={isUpdating}
      >
        <div className="space-y-2">
          <Label htmlFor="ni_number">NI Number</Label>
          <Input
            id="ni_number"
            value={editValues.ni_number}
            onChange={(e) =>
              setEditValues((prev) => ({ ...prev, ni_number: e.target.value }))
            }
          />
        </div>
      </EditModal>

      <EditModal
        isOpen={activeModal === "date_of_birth"}
        onClose={() => setActiveModal(null)}
        onSave={() => handleModalSave("date_of_birth")}
        title="Edit Date of Birth"
        description="Update your date of birth"
        isLoading={isUpdating}
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
    </div>
  );
}
