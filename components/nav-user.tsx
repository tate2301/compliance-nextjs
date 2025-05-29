import {
  BadgeCheck,
  Bell,
  ChevronDown,
  ChevronsUpDown,
  CreditCard,
  Loader2,
  LogOut,
  Sparkles,
} from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { Button, ButtonGroup } from "@/app/components/ui/button";
import {
  BellIcon,
  CreditCardIcon,
  DocumentDownloadIcon,
  LogoutIcon,
  UserCircleIcon,
} from "@heroicons/react/solid";
import { Modal } from "@/app/components/ui/modal";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import { useDisclosure } from "@/hooks/use-disclosure";
import { useExportProfile } from "@/app/app/hooks/exports";

export function NavUser({
  user,
}: {
  user: {
    name: string;
    email: string;
    profile_image: string;
  };
}) {
  const { isMobile } = useSidebar();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [hasStartedDownload, setHasStartedDownload] = useState(false);
  const { downloadCygnetProfile, downloadElysiumProfile, isDownloading } =
    useExportProfile();

  useEffect(() => {
    if (hasStartedDownload && !isDownloading) {
      setHasStartedDownload(false);
      toast("Profile downloaded successfully");
      onClose();
    }
  }, [hasStartedDownload, isDownloading]);

  console.log({avatar: user.profile_image})

  return (
    <SidebarMenu>
      <Modal
        isLoading={isDownloading}
        showCancel={false}
        hideConfirm
        onConfirm={onClose}
        isOpen={isOpen}
        onClose={onClose}
        title="Export profile"
        description="Download your professional profile in the format required by different healthcare providers"
      >
        {isDownloading && (
          <div className="flex items-center gap-4">
            <Loader2 className="size-5 mr-auto animate-spin" />
            <span className="w-full text-left">Downloading profile...</span>
          </div>
        )}
        {!isDownloading && (
          <div className="flex flex-col gap-2">
            <Button
              onClick={() => {
                setHasStartedDownload(true);
                downloadCygnetProfile();
              }}
              variant="outline"
              className="w-full"
            >
              <span className="w-full text-left">Cygnet Profile</span>
              <DocumentDownloadIcon className="size-5 mr-auto" />
            </Button>
            <Button
              onClick={() => {
                setHasStartedDownload(true);
                downloadElysiumProfile();
              }}
              variant="outline"
              className="w-full"
            >
              <span className="w-full text-left">Elysium Profile</span>
              <DocumentDownloadIcon className="size-5 mr-auto" />
            </Button>
          </div>
        )}
      </Modal>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              size="lg"
              variant="ghost"
              className="px-1 pr-2 py-0.5 flex gap-4 hover:bg-slate-6 data-[state=open]:bg-slate-6 data-[state=open]:text-sidebar-accent-foreground max-w-64 w-fit"
            >
              <Avatar className="h-6 w-7 rounded-md">
                <AvatarImage src={user.profile_image} alt={user.name} />
                <AvatarFallback className="rounded-lg">
                  {user.name.split(" ").map((name) => name[0]).join("")}
                </AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">{user.name}</span>
              </div>
              <ChevronDown className="ml-auto size-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
            side={isMobile ? "bottom" : "right"}
            align="start"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage src={user.profile_image} alt={user.name} />
                  <AvatarFallback className="rounded-lg">
                    {user.name.split(" ").map((name) => name[0]).join("")}
                  </AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">{user.name}</span>
                  <span className="truncate text-xs">{user.email}</span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <UserCircleIcon className="size-5" />
                Account
              </DropdownMenuItem>
              <DropdownMenuItem>
                <CreditCardIcon className="size-5" /> Billing
              </DropdownMenuItem>
              <DropdownMenuItem>
                <BellIcon className="size-5" /> Notifications
              </DropdownMenuItem>
            </DropdownMenuGroup>
           
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <LogoutIcon className="size-5" /> Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
