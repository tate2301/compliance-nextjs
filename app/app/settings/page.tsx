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
import { CogIcon } from "@heroicons/react/solid";

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

  return (
    <div className="p-6 rounded-lg max-w-6xl mx-auto w-full">
      <div className="mb-4">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/app/home">Home</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="#">
                  {" "}
                  <CogIcon className="size-4 inline-flex mr-1" /> Settings
                </Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
    </div>
  );
}
