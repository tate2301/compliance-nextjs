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
  ChevronDownIcon,
  OfficeBuildingIcon,
  QuestionMarkCircleIcon,
} from "@heroicons/react/solid";
import { Calendar } from "@/components/ui/calendar";
import { Badge } from "@/components/ui/badge";
import { GlobalComplianceAlert } from "../components/GlobalComplianceAlert";

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
                  <OfficeBuildingIcon className="size-4 inline-flex mr-1" />
                  Shifts
                </Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      <GlobalComplianceAlert />

      <div className="mb-8">
        <h1 className="text-xl font-medium text-slate-12 mb-4">
          Upcoming shifts
        </h1>
        <div className="flex justify-between items-center">
          <div className="flex gap-4">
            <Button variant="outline">
              Agency
              <ChevronDownIcon className="size-4 ml-2" />
            </Button>
            <Button variant="outline">
              Location
              <ChevronDownIcon className="size-4 ml-2" />
            </Button>
          </div>
          <div className="flex gap-2">
            <Input placeholder="Search" />
            <Button>Search</Button>
          </div>
        </div>
      </div>
      <div className="flex gap-8 items-start mb-4">
        <div className="flex-1">
          <p className="">Claybank</p>
          <p className="text-sm text-slate-11">
            RMN required{" "}
            <QuestionMarkCircleIcon className="size-4 ml-1 inline-flex self-center" />
          </p>
        </div>
        <div>
          <p className="mb-1">
            <span className="text-slate-11">Elysium</span>
            <Badge variant="destructive" className="ml-2">
              Not Eligible
            </Badge>
          </p>
          <p className="text-slate-11 text-sm">Required CS: 95%</p>
        </div>
        <p className="font-bold">12:00 - 15:00</p>
        <Button variant="outline">Book shift</Button>
      </div>
      <p className="text-slate-11 text-center pt-4 border-t">
        There are 12 shifts available to fill today.
      </p>
    </div>
  );
}
