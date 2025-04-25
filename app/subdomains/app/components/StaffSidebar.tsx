"use client"

import Link from 'next/link'
import { DocumentIcon, AcademicCapIcon, OfficeBuildingIcon, UserIcon, UserCircleIcon, CogIcon } from '@heroicons/react/solid'
import { ThemeToggle } from '@/components/ui/theme-toggle'
import { useAuth } from '@/lib/auth/auth-context'
import StaffDropdownMenu from './StaffDropdownMenu'
import { Calendars } from "@/components/calendars"
import { DatePicker } from "@/components/date-picker"
import { NavUser } from "@/components/nav-user"
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
} from "@/components/ui/sidebar"
import { Plus } from 'lucide-react'

interface NavLinkProps {
    href: string
    icon: React.ReactNode
    children: React.ReactNode
}

function NavLink({ href, icon, children }: NavLinkProps) {
    return (
        <Link
            className="w-full font-semibold text-sm inline-flex gap-2 items-center hover:bg-slate-4 text-slate-11 hover:text-slate-12 py-2 px-4 active:text-secondary-11 active:font-medium"
            href={href}
        >
            {icon}
            <span>{children}</span>
        </Link>
    )
}

export function StaffSidebar() {
    const { user, isAuthenticated } = useAuth()

    return (
        <Sidebar>
            <SidebarHeader className="h-16 border-b">
                <NavUser user={{
                    avatar: user.profile_image,
                    email: user.email,
                    name: `${user.first_name} ${user.last_name}`
                }} />
            </SidebarHeader>
            <SidebarContent>
                <DatePicker />
                <SidebarSeparator className="mx-0" />
                <Calendars calendars={[]} />
                <div className="flex flex-col gap-2 w-full">
                    <NavLink href="/profile" icon={<UserCircleIcon className='size-5' />}>
                        Profile
                    </NavLink>
                    <NavLink href="/shifts" icon={<OfficeBuildingIcon className='size-5' />}>
                        Shifts
                    </NavLink>
                    <NavLink href="/documents" icon={<DocumentIcon className='size-5' />}>
                        Compliance documents
                    </NavLink>
                    <NavLink href="/trainings" icon={<AcademicCapIcon className='size-5' />}>
                        Trainings
                    </NavLink>
                    <NavLink href="/settings" icon={<CogIcon className='size-5' />}>
                        Settings
                    </NavLink>
                </div>

            </SidebarContent>
            <SidebarFooter>
                <div className='mt-auto flex justify-between items-center bg-slate-4 p-2 px-2'>
                    <ThemeToggle />
                </div>
            </SidebarFooter>
            <SidebarRail />
        </Sidebar>
    )
} 