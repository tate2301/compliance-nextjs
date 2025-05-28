"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { useAuth } from "@/lib/auth/auth-context";
import Link from "next/link";
import { Menu, PanelLeft } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import StaffDropdownMenu from "./StaffDropdownMenu";
import { SidebarTrigger, useSidebar } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function StaffHeader() {
    const { user, isAuthenticated } = useAuth();
    const { toggleSidebar, isMobile } = useSidebar();

    if (!isAuthenticated) return null;

    return (
        <header className="sticky top-0 z-50 w-full border-b border-slate-6 bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/95">
            <div className="flex h-16 items-center px-4 lg:px-6">
                <div className="flex items-center gap-4">
                    {/* Mobile sidebar trigger */}
                    {isMobile && (
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={toggleSidebar}
                            className="md:hidden h-8 w-8 p-0"
                        >
                            <PanelLeft className="h-4 w-4" />
                            <span className="sr-only">Toggle Sidebar</span>
                        </Button>
                    )}

                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-primary-9 flex items-center justify-center">
                            <span className="text-white text-sm font-bold">C</span>
                        </div>
                        <h1 className='text-slate-12 text-base lg:text-lg font-semibold'>
                            Compliance Aide
                        </h1>
                    </div>
                </div>

                <div className='ml-auto flex items-center gap-4'>
                    <StaffDropdownMenu user={user} />
                    <div className="hidden lg:block">
                        <ThemeToggle />
                    </div>
                </div>
            </div>
        </header>
    );
}