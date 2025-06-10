import { Breadcrumb } from "@/components/ui/breadcrumb";
import PageBreadcrumbs from "../../components/PageBreadcrumbs";
import {
  CloudUploadIcon,
  DocumentIcon,
  HomeIcon,
  UploadIcon,
} from "@heroicons/react/solid";
import Module from "@/components/Module/Module";
import {
  MissingComplianceItem,
  MissingComplianceItemsList,
} from "./components/MissingComplianceItemsList";
import Flow from "@/components/Flow/Flow";
import { HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { documentsService } from "@/lib/documents";
import { cookies } from "next/headers";
import StaffIssueResolutionPage from "./components/IssueResolutionPage";
import { VerifiedIcon } from "lucide-react";

export default async function UpdateDocuments() {
  const cookieStore = await cookies();
  const queryClient = new QueryClient();

  const user = cookieStore.get("user")?.value;
  if (!user) {
    // throw a 404
    throw new Error("User not found");
  }

  await queryClient.prefetchQuery({
    queryKey: ["pending-documents"],
    queryFn: () => documentsService.getDocuments(JSON.parse(user).id),
  });

  return (
    <HydrationBoundary state={queryClient.getQueryData(["pending-documents"])}>
      <div className="max-w-4xl w-full mx-auto py-8 space-y-12">
        <div className="mb-4">
          <PageBreadcrumbs
            links={[
              {
                label: "Home",
                href: "/app/home",
                icon: <HomeIcon className="size-4 inline-flex mr-1" />,
              },
              {
                label: "Compliance documents",
                href: "/app/documents",
                icon: <DocumentIcon className="size-4 inline-flex mr-1" />,
              },
              {
                label: "Verification Centre",
                href: "#",
                icon: <VerifiedIcon className="size-4 inline-flex mr-1" />,
              },
            ]}
          />
        </div>

        <div className="mb-8">
          <h1 className="text-2xl font-bold text-sand-12 mb-2">
            Verification Centre
          </h1>
          <p className="text-sand-11 text-balance ">
            Stay compliant by keeping your requirements up to date.
          </p>
        </div>
        <StaffIssueResolutionPage />
      </div>
    </HydrationBoundary>
  );
}
