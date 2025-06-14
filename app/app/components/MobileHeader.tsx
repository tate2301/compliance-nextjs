"use client";

import { SidebarTrigger, useSidebar } from "@/components/ui/sidebar";
import StaffDropdownMenu from "./StaffDropdownMenu";
import { useAuth } from "@/lib/auth/auth-context";
import { cn } from "@/lib/utils";
import { NavUser } from "@/components/nav-user";

export default function MobileHeader() {
  const { user, isAuthenticated } = useAuth();
  const { isMobile } = useSidebar();

  // Render nothing if not authenticated or not on mobile
  if (!isAuthenticated || !isMobile || !user) return null;

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full border-b border-sand-6 bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/95 md:hidden"
      )}
    >
      <div className="flex h-14 items-center justify-between px-4">
        {/* Menu button */}
        <SidebarTrigger className="size-10 p-0" />

        {/* User avatar dropdown */}
        <div className="w-fit flex justify-end">
          <NavUser user={{
            name: `${user.first_name} ${user.last_name}`,
            email: user.email,
            avatar: user.profile_image,
          }} />
        </div>
      </div>
    </header>
  );
} 