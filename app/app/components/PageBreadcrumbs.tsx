import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Link from "next/link";
import { ReactNode } from "react";

export default function PageBreadcrumbs({
  links,
}: {
  links: {
    label: string;
    href: string;
    icon?: ReactNode;
  }[];
}) {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        {links.map((item, index) => (
          <>
            {index > 0 && <BreadcrumbSeparator key={item.href + "separator"} />}
            <BreadcrumbItem key={item.href + "-breadcrumb"}>
              <BreadcrumbLink asChild>
                <Link href={item.href}>
                  {item.icon && <span className="mr-2">{item.icon}</span>}
                  {item.label}
                </Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
          </>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
