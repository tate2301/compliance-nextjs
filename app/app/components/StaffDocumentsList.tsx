"use client";
import FilterBar from "@/components/FilterBar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useAuth } from "@/lib/auth/auth-context";
import { useUser } from "@/app/hooks/user";
import { documentsService } from "@/lib/documents";
import { useDocuments } from "@/app/hooks/documents";
import { StaffDocument, DocumentReference, Document } from "@/lib/types";
import {
  CheckCircleIcon,
  ChevronRightIcon,
  DocumentIcon,
  XCircleIcon,
} from "@heroicons/react/solid";
import { useQuery } from "@tanstack/react-query";
import { HourglassIcon } from "lucide-react";
import Link from "next/link";
import { MissingStaffDocumentsAlert } from "./MissingStaffDocumentsAlert";
import { Skeleton } from "@/components/ui/skeleton";

function StaffDocumentsList() {
  const {
    data: systemDocuments,
    isLoading: isLoadingSystemDocuments,
  } = useQuery({
    queryKey: ["systemDocuments"],
    queryFn: () => documentsService.getDocuments(),
  });

  const {
    documents: userDocuments,
    documentReferences,
    isLoading: isLoadingUserDocuments,
    getMissingDocuments,
  } = useDocuments();

  // Get missing documents
  const missingDocuments = getMissingDocuments();

  const isLoading = isLoadingSystemDocuments || isLoadingUserDocuments;

  if (isLoading) {
    return <StaffDocumentListSkeleton />;
  }

  return (
    <div className="">
      <div className="mb-12">
        <div className="flex justify-between items-center mb-4 border-b pb-4">
          <h1 className="text-lg font-semibold px-2 ">
            My compliance documents
          </h1>
          <div>
            <FilterBar />
          </div>
        </div>

        {/* System Forms/Documents */}
        <h2 className="text-md font-semibold px-2 mb-4">Forms</h2>
        <div className="divide-y divide-slate-6 mb-8">
          {systemDocuments?.map((document) => (
            <StaffDocumentListItem key={document.id} {...document} />
          ))}
        </div>

        {/* User Documents */}
        <h2 className="text-md font-semibold px-2 mb-4">Documents</h2>
        <div className="divide-y divide-slate-6">
          {userDocuments?.map((document) => (
            <UserDocumentListItem key={document.id} document={document} />
          ))}
          {(!userDocuments || userDocuments.length === 0) && (
            <div className="py-4 text-center text-slate-10">
              No documents uploaded yet
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export const StaffDocumentListSkeleton = () => {
  const SkeletonListItem = () => (
    <div className="flex gap-8 items-center px-2 py-4 w-full">
      <Skeleton className="h-6 w-6 rounded" />
      <div className="flex-1 space-y-2">
        <Skeleton className="h-4 w-1/3" />
        <Skeleton className="h-3 w-1/4" />
      </div>
      <Skeleton className="h-6 w-20" />
      <Skeleton className="h-4 w-32" />
      <Skeleton className="h-8 w-16" />
    </div>
  );

  return (
    <div className="mb-12 animate-pulse">
      <div className="flex justify-between items-center mb-4 border-b pb-4">
        <Skeleton className="h-6 w-48" />
        <Skeleton className="h-5 w-24" />
      </div>

      {/* System Forms/Documents */}
      <Skeleton className="h-5 w-32 mb-4" />
      <div className="divide-y divide-slate-6 mb-8">
        {Array.from({ length: 3 }).map((_, idx) => (
          <SkeletonListItem key={idx} />
        ))}
      </div>

      {/* User Documents */}
      <Skeleton className="h-5 w-32 mb-4" />
      <div className="divide-y divide-slate-6">
        {Array.from({ length: 3 }).map((_, idx) => (
          <SkeletonListItem key={idx} />
        ))}
      </div>
    </div>
  );
};

export const StaffDocumentListItem = (props: StaffDocument) => {
  return (
    <Link
      href={`/app/documents/${props.id}`}
      className="flex gap-8 items-center px-2 py-4"
    >
      <div>
        <DocumentIcon className="size-6 text-slate-11" />
      </div>
      <div className="flex-1">
        <p className="text-slate-11 font-semibold">{props.title}</p>
        <p className="text-slate-10 text-sm">{props.description}</p>
      </div>
      <div className="flex gap-4 items-center">
        <Badge
          className="inline-flex items-center w-fit flex-nowrap"
          variant={
            props.status.name === "PENDING"
              ? "outline"
              : props.status.name === "ACTIVE"
              ? "success"
              : "destructive"
          }
        >
          {props.status.name === "ACTIVE" && (
            <CheckCircleIcon className="size-5" />
          )}
          {props.status.name === "PENDING" && (
            <HourglassIcon className="size-5" />
          )}
          {props.status.name === "ARCHIVED" && (
            <XCircleIcon className="size-5" />
          )}
          {props.status.name}
        </Badge>
      </div>
      <div>
        <p className="text-slate-10 text-sm">
          Last updated {new Date(props.updated_at).toDateString()}
        </p>
      </div>
      <div className="flex justify-end">
        <Tooltip>
          <TooltipTrigger>
            <Button
              disabled={props.status.name === "PENDING"}
              variant="outline"
            >
              Update
            </Button>
          </TooltipTrigger>
          {(props.status.name === "PENDING" ||
            props.status.name === "ACTIVE") && (
            <TooltipContent className="text-slate-11 shadow-sm">
              {props.status.name === "PENDING" &&
                "You cannot update your reponses until we have verified your responses."}
              {props.status.name === "ACTIVE" &&
                "You cannot change verified responses to a form."}
            </TooltipContent>
          )}
        </Tooltip>

        <Button variant="ghost">
          <ChevronRightIcon className="size-5" />
        </Button>
      </div>
    </Link>
  );
};

export const UserDocumentListItem = ({ document }: { document: Document }) => {
  return (
    <div className="flex gap-8 items-center px-2 py-4">
      <div>
        <DocumentIcon className="size-6 text-slate-11" />
      </div>
      <div className="flex-1">
        <p className="text-slate-11 font-semibold">
          {document.name || "Document"}
        </p>
        <p className="text-slate-10 text-sm">
          Uploaded on {new Date(document.uploaded_at).toDateString()}
        </p>
      </div>
      <div className="flex gap-4 items-center">
        <Badge
          className="inline-flex items-center w-fit flex-nowrap"
          variant={!!document.verified_by ? "success" : "outline"}
        >
          {!!document.verified_by && <CheckCircleIcon className="size-5" />}
          {!!document.verified_by ? "Verified" : "Pending"}
        </Badge>
      </div>

      <div className="flex justify-end gap-2">
        <Button variant="outline">View</Button>
        <Button variant="destructive" size="icon">
          <XCircleIcon className="size-5" />
        </Button>
      </div>
    </div>
  );
};

export default StaffDocumentsList;
