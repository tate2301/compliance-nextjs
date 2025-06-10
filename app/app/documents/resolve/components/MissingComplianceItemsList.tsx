"use client";

import { EmptyState } from "@/app/components/ui/empty-state";
import Module from "@/components/Module/Module";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Document, StaffDocument } from "@/lib/types";
import {
  AcademicCapIcon,
  ArrowRightIcon,
  CheckCircleIcon,
  CloudUploadIcon,
  DocumentIcon,
  TrashIcon,
  UserIcon,
  UsersIcon,
  XCircleIcon,
} from "@heroicons/react/solid";
import Link from "next/link";
import ComplianceItemModal from "./ComplianceItemModal";
import { useDisclosure } from "@/hooks/use-disclosure";
import { FormPreview } from "@/forms_builder/components/FormPreview";
import { documentsService } from "@/lib/documents";
import { useQuery } from "@tanstack/react-query";
import { ButtonGroup } from "@/app/components/ui/button";
import { VerifiedIcon } from "lucide-react";
import { Separator } from "@/components/ui/separator";

export enum ComplianceItemType {
  DOCUMENTS = "documents",
  TRAININGS = "trainings",
  REFERENCES = "references",
  SYSTEM = "system-documents",
}

const MissingComplianceItemsList = ({
  title,
  items,
  itemType = ComplianceItemType.DOCUMENTS,
}: {
  title: string;
  items?: Array<any>;
  itemType: ComplianceItemType;
}) => {
  return (
    <Module
      title={title}
      actions={
        <div className="flex items-center gap-4">
          {!items || items?.length === 0 ? (
            <p className="text-success-11 text-sm font-medium">
              All <span className="lowercase">{title}</span> are up to date
              <CheckCircleIcon className="h-4 w-4 text-success-11 inline-flex ml-1" />
            </p>
          ) : (
            <p className="text-error-11 text-sm font-medium">
              {items?.length ?? 0} <span className="lowercase">{title}</span>{" "}
              have issues
              <XCircleIcon className="h-4 w-4 text-error-11 inline-flex ml-1" />
            </p>
          )}
          {itemType === ComplianceItemType.REFERENCES && (
            <Button variant="outline" className="text-sm">
              <UsersIcon className="h-4 w-4 mr-2" />
              Add reference
            </Button>
          )}
        </div>
      }
      className="flex flex-col p-0"
    >
      {itemType === ComplianceItemType.SYSTEM && items?.length > 0 && (
        <div className="divide-y">
          {items &&
            items.map((item) => (
              <MissingSystemComplianceDocument itemType={itemType} {...item} />
            ))}
        </div>
      )}

      {itemType === ComplianceItemType.DOCUMENTS && items?.length > 0 && (
        <div className="divide-y">
          {items &&
            items.map((item) => (
              <MissingComplianceDocument itemType={itemType} {...item} />
            ))}
        </div>
      )}
      {itemType === ComplianceItemType.TRAININGS && items?.length > 0 && (
        <div className="space-y-4">
          {items &&
            items.map((item) => (
              <MissingComplianceDocument itemType={itemType} {...item} />
            ))}
        </div>
      )}
      {itemType === ComplianceItemType.REFERENCES && items?.length > 0 && (
        <div>
          {items &&
            items.map((item) => (
              <ReferencePersonItem
                firstName={"Tatenda"}
                lastName={"Chinyamakobvu"}
                updatedAt={new Date()}
                id={"My Id"}
                email={"tatendachris@gmail.com"}
              />
            ))}
        </div>
      )}
    </Module>
  );
};

const MissingComplianceDocument = ({
  title,
  description,
  _id: id,
  itemType,
  isExpired,
  expiryDate,
  name,
  ...rest
}: StaffDocument & {
  itemType: ComplianceItemType;
  isExpired?: boolean;
  expiryDate?: string;
  name?: string;
}) => {
  const { onOpen, onClose, isOpen } = useDisclosure();
  const { data: documentData } = useQuery({
    queryKey: ["documents", id],
    queryFn: () => documentsService.getDocumentById({ id: id.toString() }),
  });

  return (
    <div className="max-w-4xl rounded-none p-4">
      <div className="flex justify-between items-start ">
        <div>
          <p className="font-semibold text-sand-12 mb-1 text-sm">
            {itemType === ComplianceItemType.TRAININGS ? (
              <AcademicCapIcon className="size-5 text-sand-8 inline-flex mr-2" />
            ) : (
              <DocumentIcon className="size-5 text-sand-8 inline-flex mr-2" />
            )}
            {title || name}
            {isExpired && (
              <span className="ml-2 text-error-11 text-xs">
                (Expired: {new Date(expiryDate).toLocaleDateString()})
              </span>
            )}
          </p>
          {description && (
            <p className="text-sm text-sand-10 ml-7">{description}</p>
          )}
          {isExpired && (
            <p className="text-sm text-error-10 ml-7">
              This training has expired and needs to be renewed.
            </p>
          )}
        </div>
        <Button asChild variant="ghost" className="ml-4">
          <Link
            href={
              itemType === ComplianceItemType.TRAININGS
                ? "/trainings"
                : `/documents/${id}`
            }
            className="flex items-center gap-2"
          >
            <span className="text-sm text-primary-11">
              {isExpired ? "Renew" : "Update"}
            </span>
          </Link>
        </Button>
      </div>
    </div>
  );
};

const MissingSystemComplianceDocument = ({
  name,
  id,
  itemType,
  ...rest
}: Document & { itemType: ComplianceItemType }) => {
  const { onOpen, onClose, isOpen } = useDisclosure();
  const { data: documentData } = useQuery({
    queryKey: ["documents", id],
    queryFn: () => documentsService.getDocumentById({ id: id.toString() }),
  });

  return (
    <div className="max-w-4xl rounded-none p-4">
      <div className="flex justify-between items-start ">
        <div>
          <p className="font-semibold text-sand-12 mb-1 text-sm">
            <DocumentIcon className="size-5 text-sand-8 inline-flex mr-2" />
            {name}
          </p>
        </div>
        <Button asChild variant="ghost" className="ml-4">
          <Link href={`/documents/${id}`} className="flex items-center gap-2">
            <CloudUploadIcon className="size-5 text-primary-11 mr-2" />
            <span className="text-sm text-primary-11">Upload</span>
          </Link>
        </Button>
      </div>
    </div>
  );
};

const ReferencePersonItem = ({ firstName, lastName, email, id, updatedAt }) => {
  return (
    <div className="flex justify-between items-start p-4">
      <div className="flex gap-4 items-center">
        <UsersIcon className="size-5 text-sand-10" />
        <div>
          <div className="flex gap-2 flex-1 items-center">
            <p className="font-semibold text-sand-12 mb-1 text-sm">
              {firstName} {lastName}
            </p>
            <p className="text-sand-10">&bull;</p>
            <p className="text-sm text-error-10 font-medium flex items-center">
              <XCircleIcon className="size-5 text-error-10 mr-1 inline-flex self-center" />
              Could not be verified
            </p>
          </div>
          <p className="text-sm text-sand-10">{email}</p>
        </div>
      </div>
      <div className="flex gap-1 items-center">
        <Button variant="ghost" className="rounded-sm text-primary-11">
          Update
        </Button>
        <div className="h-6 bg-sand-6 w-px" />
        <Button variant="ghost" className="rounded-sm text-error-11">
          <TrashIcon className="h-4 w-4 mr-2" />
          Remove reference
        </Button>
      </div>
    </div>
  );
};

export {
  MissingComplianceDocument as MissingComplianceItem,
  MissingComplianceItemsList,
};
