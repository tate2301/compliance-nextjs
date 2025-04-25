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
import { DocumentIcon } from "@heroicons/react/solid";

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
    <div className="max-w-7xl w-full mx-auto py-8">
      <div className="mb-4">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/home">Home</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="#">
                  <DocumentIcon className="size-4 inline-flex mr-1" />
                  Compliance documents
                </Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="#">Document</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <StaffDocumentPreview documentId={documentId} />
    </div>
  );
}
