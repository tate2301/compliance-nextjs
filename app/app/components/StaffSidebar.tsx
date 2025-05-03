"use client";

import Link from "next/link";
import {
  DocumentIcon,
  AcademicCapIcon,
  OfficeBuildingIcon,
  UserIcon,
  UserCircleIcon,
  CogIcon,
  DownloadIcon,
  DocumentDownloadIcon,
} from "@heroicons/react/solid";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { useAuth } from "@/lib/auth/auth-context";
import StaffDropdownMenu from "./StaffDropdownMenu";
import { Calendars } from "@/components/calendars";
import { DatePicker } from "@/components/date-picker";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  SidebarSeparator,
} from "@/components/ui/sidebar";
import { Loader2, Plus, CheckCircle, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useDisclosure } from "@/hooks/use-disclosure";
import { Modal } from "@/app/components/ui/modal";
import { useExportProfile } from "../hooks/exports";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useUser } from "@/app/hooks/user";
import { Badge } from "@/components/ui/badge";

interface NavLinkProps {
  href: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}

function NavLink({ href, icon, children }: NavLinkProps) {
  return (
    <Link
      className="w-full font-medium text-sm inline-flex gap-2 items-center hover:bg-slate-4 text-slate-11 hover:text-slate-12 py-2 px-4 active:text-secondary-11 active:font-medium"
      href={href}
    >
      {icon}
      <span>{children}</span>
    </Link>
  );
}

function ComplianceStatus({ isCompliant }) {
  if (!isCompliant) return null;

  const { isCompliant: compliant, percentage, missing } = isCompliant;

  return (
    <div className="p-4 border rounded-md bg-slate-2 mb-4">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-medium">Compliance Status</h3>
        {compliant ? (
          <CheckCircle className="h-5 w-5 text-green-500" />
        ) : (
          <AlertCircle className="h-5 w-5 text-amber-500" />
        )}
      </div>

      <div className="w-full bg-slate-3 rounded-full h-2.5 mb-2">
        <div
          className={`h-2.5 rounded-full ${
            compliant ? "bg-green-500" : "bg-amber-500"
          }`}
          style={{ width: `${percentage}%` }}
        ></div>
      </div>

      <div className="text-xs text-slate-11 flex justify-between">
        <span>{percentage}% Complete</span>
        {missing && missing.length > 0 && (
          <span>
            {missing.length} item{missing.length !== 1 ? "s" : ""} missing
          </span>
        )}
      </div>

      {missing && missing.length > 0 && (
        <div className="mt-2">
          <Link
            href="/documents"
            className="text-xs text-primary-9 hover:text-primary-10 font-medium"
          >
            Resolve issues
          </Link>
        </div>
      )}
    </div>
  );
}

export function StaffSidebar() {
  const { user, isAuthenticated } = useAuth();
  const { userData: userWithCompliance } = useUser();

  if (!user) {
    return null;
  }

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="h-16 border-b">
        <NavUser
          user={{
            avatar: user.profile_image,
            email: user.email,
            name: `${user.first_name} ${user.last_name}`,
          }}
        />
      </SidebarHeader>
      <SidebarContent>
        <DatePicker />
        <SidebarSeparator className="mx-0" />
        <Calendars calendars={[]} />

        {/* Add Compliance Status Component */}
        <ComplianceStatus isCompliant={userWithCompliance?.isCompliant} />

        <div className="flex flex-col gap-2 w-full">
          <NavLink
            href="/app/profile"
            icon={<UserCircleIcon className="size-5" />}
          >
            Profile
          </NavLink>
          <NavLink
            href="/app/shifts"
            icon={<OfficeBuildingIcon className="size-5" />}
          >
            Shifts
          </NavLink>
          <NavLink
            href="/app/documents"
            icon={<DocumentIcon className="size-5" />}
          >
            <span className="flex-1 mr-4">Compliance documents</span>
            {!userWithCompliance?.isCompliant.isCompliant && (
              <Badge variant="destructive" className="ml-auto">
                {userWithCompliance?.isCompliant.missing.length}
              </Badge>
            )}
          </NavLink>
          <NavLink
            href="/app/trainings"
            icon={<AcademicCapIcon className="size-5" />}
          >
            Trainings
          </NavLink>
          <NavLink href="/app/settings" icon={<CogIcon className="size-5" />}>
            Settings
          </NavLink>
        </div>
      </SidebarContent>
      <SidebarFooter>
        <div className="mt-auto space-y-4 bg-slate-4 p-2 px-2">
          <ThemeToggle />
        </div>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
