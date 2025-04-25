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
import { documentsService } from "@/lib/documents";
import { StaffDocument } from "@/lib/types";
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

function StaffDocumentsList() {
  const { data: documentsData } = useQuery({
    queryKey: ["documents"],
    queryFn: () => documentsService.getDocuments(),
  });

  const { user } = useAuth();

  return (
    <div className="">
      {user && documentsData && (
        <MissingStaffDocumentsAlert
          userFullname={`${user.first_name} ${user.last_name}`}
          missingDocuments={documentsData?.slice(0, 4)}
        />
      )}
      <div className="mb-12">
        <div className="flex justify-between items-center mb-4 border-b pb-4">
          <h1 className="text-lg font-semibold px-2 ">
            My compliance documents
          </h1>
          <div>
            <FilterBar />
          </div>
        </div>
        <div className="divide-y divide-slate-6">
          {documentsData?.map((document) => (
            <StaffDocumentListItem key={document.id} {...document} />
          ))}
        </div>
      </div>
    </div>
  );
}

export const StaffDocumentListSkeleton = () => {
  return <div></div>;
};

export const StaffDocumentListItem = (props: StaffDocument) => {
  return (
    <Link
      href={`/documents/${props.id}`}
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

export default StaffDocumentsList;
