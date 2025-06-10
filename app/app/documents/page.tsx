import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Link from "next/link";
import { DocumentIcon } from "@heroicons/react/solid";
import { HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { documentsService } from "@/lib/documents";
import StaffDocumentsList from "../components/StaffDocumentsList";
import { GlobalComplianceAlert } from "../components/GlobalComplianceAlert";
import FilterBar from "@/components/FilterBar";

export default async function ProfilePage({ dehydratedState }: any) {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["documents"],
    queryFn: () => documentsService.getDocuments(),
  });

  return (
    <HydrationBoundary state={dehydratedState}>
      <div className="p-6 max-w-6xl mx-auto w-full">
        <div className="mb-4 flex justify-between items-center">
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
                    <DocumentIcon className="size-4 inline-flex mr-1" />
                    Documents
                  </Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          <div>
            <FilterBar />
          </div>
        </div>
        <GlobalComplianceAlert />

        <StaffDocumentsList />
      </div>
    </HydrationBoundary>
  );
}
