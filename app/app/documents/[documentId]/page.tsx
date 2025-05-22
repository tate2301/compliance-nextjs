import { documentsService } from "@/lib/documents";
import { QueryClient } from "@tanstack/react-query";
import { notFound } from "next/navigation";
import StaffDocumentPreview from "../../components/StaffDocumentPreview";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Link from "next/link";
import { DocumentIcon, HomeIcon } from "@heroicons/react/solid";
import PageBreadcrumbs from "../../components/PageBreadcrumbs";

export default async function StaffDocument({
  params,
}: {
  params: Promise<{ documentId: string }>;
}) {
  const queryClient = new QueryClient();
  const { documentId } = await params;

  if (!documentId) {
    // throw a 404
    throw notFound();
  }

  await queryClient.prefetchQuery({
    queryKey: ["document", documentId],
    queryFn: () => documentsService.getDocumentById({ id: documentId }),
  });

  return (
    <div className="max-w-4xl w-full mx-auto py-8">
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
              label: "View document",
              href: "#",
            },
          ]}
        />
      </div>
      <StaffDocumentPreview documentId={documentId} />
    </div>
  );
}
