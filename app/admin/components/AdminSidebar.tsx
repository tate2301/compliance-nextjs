"use client";

import React from "react";
import { usePathname } from "next/navigation";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { useAuth } from "@/lib/auth/auth-context";
import {
  BarChart3,
  Users,
  FileText,
  Settings,
  Shield,
  AlertTriangle,
  Calendar,
  Bell,
  Database,
  Activity,
} from "lucide-react";

const adminNavItems = [
  {
    title: "Overview",
    url: "/admin",
    icon: BarChart3,
    description: "Dashboard overview and key metrics",
  },
  {
    title: "Staff Management",
    url: "/admin/staff",
    icon: Users,
    description: "Manage staff members and their compliance",
  },
  {
    title: "Compliance Monitor",
    url: "/admin/compliance",
    icon: Shield,
    description: "Monitor compliance status across organization",
  },
  {
    title: "Documents",
    url: "/admin/documents",
    icon: FileText,
    description: "Document management and templates",
  },
  {
    title: "Training Programs",
    url: "/admin/training",
    icon: Calendar,
    description: "Manage training programs and schedules",
  },
  {
    title: "Alerts & Issues",
    url: "/admin/alerts",
    icon: AlertTriangle,
    description: "View and manage compliance alerts",
  },
  {
    title: "Reports",
    url: "/admin/reports",
    icon: Activity,
    description: "Generate compliance and performance reports",
  },
  {
    title: "System Settings",
    url: "/admin/settings",
    icon: Settings,
    description: "Configure system settings and preferences",
  },
];

export function AdminSidebar() {
  const pathname = usePathname();
  const { user } = useAuth();

  return (
    <Sidebar className="border-r border-sand-6">
      <SidebarHeader className="p-6">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center">
            <Shield className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-sand-12">Admin Panel</h2>
            <p className="text-sm text-sand-11">Compliance Management</p>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-sand-11 text-sm font-medium px-3 pb-2">
            Administration
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {adminNavItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton 
                    asChild 
                    isActive={pathname === item.url}
                    className="group"
                  >
                    <Link href={item.url} className="flex items-center gap-3 p-3 rounded-lg transition-colors">
                      <item.icon className="w-5 h-5 text-sand-11 group-hover:text-sand-12" />
                      <div className="flex-1">
                        <div className="text-sm font-medium text-sand-12">{item.title}</div>
                        <div className="text-xs text-sand-11">{item.description}</div>
                      </div>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-6 border-t border-sand-6">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-sand-6 flex items-center justify-center">
            {user?.profile_image ? (
              <img 
                src={user.profile_image} 
                alt={`${user.first_name} ${user.last_name}`}
                className="w-8 h-8 rounded-full object-cover"
              />
            ) : (
              <span className="text-sm font-medium text-sand-11">
                {user?.first_name?.[0]}{user?.last_name?.[0]}
              </span>
            )}
          </div>
          <div className="flex-1">
            <div className="text-sm font-medium text-sand-12">
              {user?.first_name} {user?.last_name}
            </div>
            <div className="text-xs text-sand-11">Administrator</div>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
} 