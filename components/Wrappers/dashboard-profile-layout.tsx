"use client";

import { ReactNode } from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  DocumentTextIcon,
  HomeIcon,
  IdentificationIcon,
  UserCircleIcon,
  UserIcon,
  UsersIcon,
} from "@heroicons/react/solid";

interface Props {
  children: ReactNode;
  title: string;
  subtitle: string;
  actions?: ReactNode;
}

export const DashboardProfileLayout = ({
  children,
  title,
  subtitle: susbtitle,
  actions,
}: Props) => {
  const pathname = usePathname();

  return (
    <div className="p-6 rounded-lg max-w-6xl mx-auto w-full">
      <div className="mb-4">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/app/home">Home</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="#">
                  <UserCircleIcon className="size-4 inline-flex mr-1" />
                  {title}
                </Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      <div className="px-2 mt-5 border-t border-slate-6 flex gap-6">
        <div className="flex flex-col sticky top-0 w-64 py-4">
          <ul className="space-y-2 w-64">
            <li
              className={`p-2 h-[40px] flex items-center border ${
                pathname === "/app/profile"
                  ? "border-secondary-6 bg-secondary-4 text-secondary-11"
                  : "border-transparent text-slate-10 hover:border-secondary-6 hover:bg-secondary-4 hover:text-secondary-11"
              }`}
            >
              <Link className="w-full h-full" href={"/app/profile"}>
                <UserIcon className="size-4 inline-flex self-center mr-2" />
                Personal Information
              </Link>
            </li>
            <li
              className={`p-2 h-[40px] flex items-center border ${
                pathname === "/app/profile/address"
                  ? "border-secondary-6 bg-secondary-4 text-secondary-11"
                  : "border-transparent text-slate-10 hover:border-secondary-6 hover:bg-secondary-4 hover:text-secondary-11"
              }`}
            >
              <Link className="w-full h-full" href={"/app/profile/address"}>
                <HomeIcon className="size-4 inline-flex self-center mr-2" />
                Physical Address
              </Link>
            </li>
            <li
              className={`p-2 h-[40px] flex items-center border ${
                pathname === "/app/profile/identification"
                  ? "border-secondary-6 bg-secondary-4 text-secondary-11"
                  : "border-transparent text-slate-10 hover:border-secondary-6 hover:bg-secondary-4 hover:text-secondary-11"
              }`}
            >
              <Link
                className="w-full h-full"
                href={"/app/profile/identification"}
              >
                <IdentificationIcon className="size-4 inline-flex self-center mr-2" />
                Identification
              </Link>
            </li>
            <li
              className={`p-2 h-[40px] flex items-center border ${
                pathname === "/app/profile/dbs"
                  ? "border-secondary-6 bg-secondary-4 text-secondary-11"
                  : "border-transparent text-slate-10 hover:border-secondary-6 hover:bg-secondary-4 hover:text-secondary-11"
              }`}
            >
              <Link className="w-full h-full" href={"/app/profile/dbs"}>
                <DocumentTextIcon className="size-4 inline-flex self-center mr-2" />
                DBS
              </Link>
            </li>
            <li
              className={`p-2 h-[40px] flex items-center border ${
                pathname === "/app/profile/references"
                  ? "border-secondary-6 bg-secondary-4 text-secondary-11"
                  : "border-transparent text-slate-10 hover:border-secondary-6 hover:bg-secondary-4 hover:text-secondary-11"
              }`}
            >
              <Link className="w-full h-full" href={"/app/profile/references"}>
                <UsersIcon className="size-4 inline-flex self-center mr-2" />
                References
              </Link>
            </li>
          </ul>
        </div>
        <div className="p-4 w-full">
          <div className="px-2 mb-4 flex justify-between items-center">
            <div>
              <h3 className="text-lg leading-6 font-medium text-slate-12">
                {title}
              </h3>
              <p className="mt-1 max-w-2xl text-sm text-slate-11">
                {susbtitle}
              </p>
            </div>
            <div className="flex gap-4 items-center">{actions}</div>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
};
