import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { User } from "@/lib/types";
import Link from "next/link";

export default function StaffDropdownMenu({ user }: {
    user: User
}) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                <Avatar className='size-8' >
                    <AvatarImage src={user.profile_image} />
                    <AvatarFallback>
                        {user.first_name[0]} {user.last_name[0]}
                    </AvatarFallback>
                </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-72">
                <DropdownMenuLabel className="text-sm">
                    {user.first_name} {user.last_name}
                </DropdownMenuLabel>
                <DropdownMenuLabel className="text-sm">
                    NI Number: {user.ni_number}
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                    <Link href={"/profile"}>
                        Profile
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                    Settings
                </DropdownMenuItem>
                <DropdownMenuItem>
                    Sign out
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}