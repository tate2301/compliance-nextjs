"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { useAuth } from "@/lib/auth/auth-context";
import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";

export default function OnboardingHeader() {
    const { user, logout, isAuthenticated } = useAuth();
    const router = useRouter();

    const handleLogout = () => {
        logout();
        router.push("/auth/signin");
    };

    if (!isAuthenticated || !user) return null;

    return (
        <header className="sticky top-0 z-50 p-2 w-full border-b border-slate-6/50 shadow-sm bg-slate-2 backdrop-blur supports-[backdrop-filter]:bg-card/75">
            <div className="max-w-7xl mx-auto flex justify-between w-full px-4 sm:px-6 lg:px-8">
                <div className="flex gap-4 items-center">
                    <p className='text-slate-12 text-base sm:text-lg font-medium'>Compliance Aide</p>
                    <span className="text-sm text-slate-9 hidden sm:inline">- Complete your onboarding</span>
                </div>

                <div className='flex gap-4 sm:gap-6 items-center'>
                    <DropdownMenu>
                        <DropdownMenuTrigger>
                            <Avatar className='size-8' >
                                <AvatarImage src={user.profile_image} />
                                <AvatarFallback>
                                    {user.first_name[0]}{user.last_name[0]}
                                </AvatarFallback>
                            </Avatar>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-72" align="end">
                            <DropdownMenuLabel className="text-sm">
                                {user.first_name} {user.last_name}
                            </DropdownMenuLabel>
                            <DropdownMenuLabel className="text-sm text-slate-9">
                                {user.email}
                            </DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={handleLogout}>
                                <LogOut className="mr-2 h-4 w-4" />
                                Sign out
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                    
                    <div className="hidden md:block">
                        <ThemeToggle />
                    </div>
                </div>
            </div>
        </header>
    );
} 