"use client";

import Link from "next/link";
import {
  UserIcon,
  UserCircleIcon,
  CogIcon,
  DownloadIcon,
  DocumentDownloadIcon,
} from "@heroicons/react/solid";
import { useAuth } from "@/lib/auth/auth-context";
import StaffDropdownMenu from "./StaffDropdownMenu";
import { Calendars } from "@/components/calendars";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import {
  Loader2,
  Plus,
  CheckCircle,
  AlertCircle,
  PanelLeft,
  ChevronRight,
  Home,
  FileText,
  GraduationCap,
  Building,
  User,
  Settings,
  Calendar,
  SidebarOpenIcon,
  Menu
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useDisclosure } from "@/hooks/use-disclosure";
import { Modal } from "@/app/components/ui/modal";
import { useExportProfile } from "../hooks/exports";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useUser } from "@/app/hooks/user";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

interface NavLinkProps {
  href: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  badge?: number;
  isActive?: boolean;
}

function NavLink({ href, icon, children, badge, isActive }: NavLinkProps) {
  const { state, isMobile, setOpenMobile } = useSidebar();
  const isCollapsed = !isMobile && state === "collapsed";

  const handleClick = () => {
    // Close mobile sidebar when navigation item is clicked
    if (isMobile) {
      setOpenMobile?.(false);
    }
  };

  return (
    <SidebarMenuItem>
      <SidebarMenuButton
        asChild
        isActive={isActive}
        tooltip={isCollapsed ? String(children) : undefined}
        className={cn(
          "relative w-full justify-start transition-all duration-200 ease-out",
          "hover:bg-sand-4 hover:text-sand-12",
          "data-[active=true]:text-primary-12 data-[active=true]:bg-sand-6 data-[active=true]:font-semibold",
          "focus-visible:ring-1 focus-visible:ring-primary-7",
          "rounded-md",
          isCollapsed ? "justify-center" : "justify-start"
        )}
      >
        <Link 
          href={href} 
          className={cn("flex items-center gap-3 w-full group", isCollapsed && "justify-center !size-10")}
          onClick={handleClick}
        >
          <div className="flex-shrink-0 transition-transform duration-200 group-hover:scale-110">
            {icon}
          </div>
          {!isCollapsed && (
            <span className="flex-1 truncate text-sm font-medium">
              {children}
            </span>
          )}
          {!isCollapsed && badge && badge > 0 && (
            <Badge
              variant="destructive"
              className="notification-badge ml-auto text-xs h-5 min-w-5 flex items-center justify-center"
            >
              {badge}
            </Badge>
          )}
        </Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
}

function ComplianceStatus({ isCompliant }) {
  const { state, isMobile } = useSidebar();
  const isCollapsed = !isMobile && state === "collapsed";

  if (!isCompliant || isCollapsed) return null;

  const { isCompliant: compliant, percentage, missing } = isCompliant;

  return (
    <div className="mx-2 p-3 border rounded-lg bg-gradient-to-br from-sand-1 to-sand-2 border-sand-6 shadow-sm">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-xs font-semibold text-sand-11">Compliance Status</h3>
        {compliant ? (
          <CheckCircle className="h-4 w-4 text-green-600" />
        ) : (
          <AlertCircle className="h-4 w-4 text-amber-600" />
        )}
      </div>

      <div className="w-full bg-sand-4 rounded-full h-2 mb-2 overflow-hidden">
        <div
          className={cn(
            "progress-bar h-2 rounded-full transition-all duration-500 ease-out",
            compliant
              ? "bg-gradient-to-r from-green-500 to-green-600"
              : "bg-gradient-to-r from-amber-500 to-amber-600"
          )}
          style={{
            width: `${percentage}%`,
            '--progress-width': `${percentage}%`
          } as React.CSSProperties}
        />
      </div>

      <div className="text-xs text-sand-10 flex justify-between items-center">
        <span className="font-medium">{percentage}% Complete</span>
        {missing && missing.length > 0 && (
          <span className="text-amber-600">
            {missing.length} missing
          </span>
        )}
      </div>

      {missing && missing.length > 0 && (
        <div className="mt-2">
          <Link
            href="/app/documents"
            className="text-xs text-primary-9 hover:text-primary-10 font-medium transition-colors"
          >
            Resolve issues →
          </Link>
        </div>
      )}
    </div>
  );
}

function SidebarToggle() {
  const { toggleSidebar, state, isMobile } = useSidebar();
  const isCollapsed = !isMobile && state === "collapsed";

  // On mobile, use the SidebarTrigger for better UX
  if (isMobile) {
    return (
      <SidebarTrigger className={cn(
        "size-10 py-0 px-0 flex justify-center items-center transition-all duration-300 ease-out",
        "hover:bg-sand-6 hover:text-sand-12",
      )}>
        <Menu className="size-5" />
        <span className="sr-only">Toggle Sidebar</span>
      </SidebarTrigger>
    );
  }

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={toggleSidebar}
      className={cn(
        "size-10 py-0 px-0 flex justify-center items-center transition-all duration-300 ease-out",
        "hover:bg-sand-6 hover:text-sand-12",
        isCollapsed ? "rotate-0" : "rotate-180"
      )}
      aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
    >
      <SidebarOpenIcon className={cn(
        "size-5 transition-transform duration-300",
      )} />
      <span className="sr-only">Toggle Sidebar</span>
    </Button>
  );
}

// Mobile Menu Button - separate component for the main app
export function MobileMenuButton() {
  const { isMobile } = useSidebar();
  
  if (!isMobile) return null;
  
  return (
    <div className="lg:hidden fixed top-4 left-4 z-50">
      <SidebarTrigger className={cn(
        "size-10 py-0 px-0 flex justify-center items-center transition-all duration-300 ease-out",
        "hover:bg-sand-6 hover:text-sand-12 bg-white shadow-md border border-sand-6 rounded-md",
      )}>
        <Menu className="size-5" />
        <span className="sr-only">Open Menu</span>
      </SidebarTrigger>
    </div>
  );
}

export function StaffSidebar() {
  const { user, isAuthenticated } = useAuth();
  const { userData: userWithCompliance } = useUser();
  const { state, isMobile } = useSidebar();
  const pathname = usePathname();
  // Collapsed state should only matter on desktop (non-mobile)
  const isCollapsed = !isMobile && state === "collapsed";

  if (!user) {
    return null;
  }

  const navigationItems = [
    {
      href: "/app/shifts",
      icon: <Building className="h-4 w-4" />,
      label: "Shifts",
      isActive: pathname === "/app/shifts"
    },
    {
      href: "/app/documents",
      icon: <FileText className="h-4 w-4" />,
      label: "Compliance documents",
      badge: !userWithCompliance?.isCompliant?.isCompliant
        ? userWithCompliance?.isCompliant?.missing?.length
        : undefined,
      isActive: pathname === "/app/documents"
    },
    {
      href: "/app/profile",
      icon: <User className="h-4 w-4" />,
      label: "Profile",
      isActive: pathname === "/app/profile"
    },
    {
      href: "/app/trainings",
      icon: <GraduationCap className="h-4 w-4" />,
      label: "Trainings",
      isActive: pathname === "/app/trainings"
    },
    {
      href: "/app/settings",
      icon: <Settings className="h-4 w-4" />,
      label: "Settings",
      isActive: pathname === "/app/settings"
    }
  ];

  return (
    <>
      <Sidebar
        collapsible="icon"
        className={cn(
          "border-r border-sand-6 bg-gradient-to-b from-sand-1 to-sand-2 transition-all duration-300",
          isCollapsed ? "w-16" : "w-fit"
        )}
        style={isCollapsed ? { 
          '--sidebar-width': '4rem',
          '--sidebar-width-icon': '4rem'
        } as React.CSSProperties : undefined}
      >

        <SidebarHeader className={cn(
          "border-b border-sand-6 transition-all duration-200",
        )}>
          {!isCollapsed || isMobile ? (
            <div className="flex gap-4 items-center">
              <NavUser
                user={{
                  avatar: user.profile_image,
                  email: user.email,
                  name: `${user.first_name} ${user.last_name}`,
                }}
              />
              <SidebarToggle />
            </div>
          ) : (
            <div className="space-y-2 flex flex-col items-center">
              <SidebarToggle />

              <div className="flex justify-center">
              <NavUser
                user={{
                  avatar: user.profile_image,
                  email: user.email,
                  name: `${user.first_name} ${user.last_name}`,
                }}
                collapsed
              />
              </div>
            </div>
          )}
        </SidebarHeader>

        <SidebarContent className={cn(
          "p-2 w-full",
        )}>
          

          {/* Calendars */}
          {(!isCollapsed || isMobile) && (
              <Calendars calendars={[]} />
          )}


          {/* Navigation */}
          <div className="space-y-1">
            <SidebarMenu>
              {navigationItems.map((item) => (
                <NavLink
                  key={item.href}
                  href={item.href}
                  icon={item.icon}
                  badge={item.badge}
                  isActive={item.isActive}
                >
                  {item.label}
                </NavLink>
              ))}
            </SidebarMenu>
          </div>
        </SidebarContent>

        <SidebarFooter>
          {/* Compliance Status */}
          <ComplianceStatus isCompliant={userWithCompliance?.isCompliant} />

        </SidebarFooter>
      </Sidebar>
    </>
  );
}
