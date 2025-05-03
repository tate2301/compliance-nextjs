"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { useAuth } from "@/lib/auth/auth-context";
import Link from "next/link";
import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import StaffDropdownMenu from "./StaffDropdownMenu";
import { StaffSidebar } from "./StaffSidebar";

export default function StaffHeader() {
    const { user, isAuthenticated } = useAuth()

    if (!isAuthenticated) return null

    return (
        <header className="sticky top-0 z-50 p-4 w-full border-b border-slate-6 bg-card/75 backdrop-blur supports-[backdrop-filter]:bg-card/75">
            <div className="max-w-7xl mx-auto flex justify-between w-full px-4 sm:px-6 lg:px-8">
                <div className="flex gap-4 items-center">
                    <Sheet>
                        <SheetTrigger className="md:hidden">
                            <Menu className="size-5" />
                        </SheetTrigger>
                        <SheetContent side="left" className="w-screen h-screen">
                            <StaffSidebar />
                        </SheetContent>
                    </Sheet>

                    <p className='text-slate-12 text-base sm:text-lg font-medium'>Compliance Aide</p>
                </div>

                <div className='flex gap-4 sm:gap-6 items-center'>
                    {/* Mobile Navigation */}

                    <StaffDropdownMenu user={user} />
                    <div className="hidden md:block">
                        <ThemeToggle />
                    </div>
                </div>
            </div>
        </header>
    )
}