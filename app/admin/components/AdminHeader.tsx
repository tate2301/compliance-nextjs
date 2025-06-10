"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { useAuth } from "@/lib/auth/auth-context";
import { Bell, Search, LogOut, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Link from "next/link";

function getBreadcrumbs(pathname: string) {
  const segments = pathname.split('/').filter(Boolean);
  const breadcrumbs = [];
  
  for (let i = 0; i < segments.length; i++) {
    const segment = segments[i];
    const url = '/' + segments.slice(0, i + 1).join('/');
    
    // Convert segment to readable title
    let title = segment.charAt(0).toUpperCase() + segment.slice(1);
    if (title === 'Admin') title = 'Dashboard';
    
    breadcrumbs.push({
      title,
      url,
      isLast: i === segments.length - 1
    });
  }
  
  return breadcrumbs;
}

export default function AdminHeader() {
  const pathname = usePathname();
  const { user, logout } = useAuth();
  const breadcrumbs = getBreadcrumbs(pathname);

  const handleLogout = () => {
    logout();
    window.location.href = '/auth/login';
  };

  return (
    <header className="border-b border-sand-6 bg-white/80 backdrop-blur-sm">
      <div className="flex h-16 items-center justify-between px-6">
        {/* Breadcrumbs */}
        <div className="flex items-center space-x-4">
          <Breadcrumb>
            <BreadcrumbList>
              {breadcrumbs.map((crumb, index) => (
                <React.Fragment key={crumb.url}>
                  <BreadcrumbItem>
                    {crumb.isLast ? (
                      <BreadcrumbPage className="text-sand-12 font-medium">
                        {crumb.title}
                      </BreadcrumbPage>
                    ) : (
                      <Link 
                        href={crumb.url} 
                        className="text-sand-11 hover:text-sand-12 transition-colors"
                      >
                        {crumb.title}
                      </Link>
                    )}
                  </BreadcrumbItem>
                  {!crumb.isLast && <BreadcrumbSeparator />}
                </React.Fragment>
              ))}
            </BreadcrumbList>
          </Breadcrumb>
        </div>

        {/* Actions */}
        <div className="flex items-center space-x-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -transand-y-1/2 text-sand-11 w-4 h-4" />
            <Input
              placeholder="Search staff, documents..."
              className="pl-10 w-64 bg-sand-3 border-sand-6"
            />
          </div>

          {/* Notifications */}
          <Button variant="ghost" size="sm" className="relative">
            <Bell className="w-5 h-5 text-sand-11" />
            <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
              3
            </span>
          </Button>

          {/* User Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center gap-2 h-auto p-2">
                <div className="w-8 h-8 rounded-full bg-sand-6 flex items-center justify-center">
                  {user?.profile_image ? (
                    <img 
                      src={user.profile_image} 
                      alt={`${user.first_name} ${user.last_name}`}
                      className="w-8 h-8 rounded-full object-cover"
                    />
                  ) : (
                    <User className="w-4 h-4 text-sand-11" />
                  )}
                </div>
                <div className="text-left">
                  <div className="text-sm font-medium text-sand-12">
                    {user?.first_name} {user?.last_name}
                  </div>
                  <div className="text-xs text-sand-11">Administrator</div>
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuItem asChild>
                <Link href="/admin/profile" className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  Profile Settings
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout} className="text-red-600">
                <LogOut className="w-4 h-4 mr-2" />
                Sign Out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
} 