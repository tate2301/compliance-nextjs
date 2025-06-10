"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useAuth } from "@/lib/auth/auth-context";
import { documentsService } from "@/lib/documents";
import { useDocuments } from "@/app/hooks/documents";
import { 
  StaffDocument, 
  EnhancedDocumentReference, 
  DocumentSubmission,
  DocumentSubmissionStatus,
  DocumentType,
  FormCategory
} from "@/lib/types";
import {
  CheckCircleIcon,
  ChevronRightIcon,
  ClockIcon,
  DocumentIcon,
  ExclamationCircleIcon,
  XCircleIcon,
  UploadIcon,
} from "@heroicons/react/solid";
import { useQuery } from "@tanstack/react-query";
import { HourglassIcon } from "lucide-react";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";

function StaffDocumentsList() {
  const { user } = useAuth();

  // Legacy system documents (forms)
  const {
    data: systemDocuments,
    isLoading: isLoadingSystemDocuments,
  } = useQuery({
    queryKey: ["systemDocuments"],
    queryFn: () => documentsService.getDocuments(),
  });

  // Enhanced documents system
  const {
    documentReferences,
    documentSubmissions,
    isLoading: isLoadingEnhanced,
    getMissingDocuments,
    getMandatoryDocuments,
    getSubmissionByDocumentId,
    getComplianceStatus,
    submitDocument,
    isSubmitting
  } = useDocuments();

  const complianceStatus = getComplianceStatus();
  const missingDocuments = getMissingDocuments();
  const mandatoryDocuments = getMandatoryDocuments();

  const isLoading = isLoadingSystemDocuments || isLoadingEnhanced;

  if (isLoading) {
    return <StaffDocumentListSkeleton />;
  }

  return (
    <div className="space-y-6">
      {/* Compliance Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <DocumentIcon className="h-5 w-5" />
            Compliance Overview
          </CardTitle>
          <CardDescription>
            Your document completion status
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Overall Progress</span>
              <span className="text-sm text-gray-600">
                {complianceStatus.completed}/{complianceStatus.totalRequired} completed
              </span>
            </div>
            <Progress value={complianceStatus.percentage} className="w-full" />
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-green-600">{complianceStatus.completed}</div>
                <div className="text-sm text-gray-500">Verified</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-yellow-600">{complianceStatus.pending}</div>
                <div className="text-sm text-gray-500">Pending</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-red-600">{complianceStatus.missing}</div>
                <div className="text-sm text-gray-500">Missing</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Missing Documents Alert */}
      {missingDocuments.length > 0 && (
        <Card className="border-red-200 bg-red-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-red-700">
              <ExclamationCircleIcon className="h-5 w-5" />
              Action Required
            </CardTitle>
            <CardDescription className="text-red-600">
              You have {missingDocuments.length} required documents missing
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {missingDocuments.slice(0, 3).map((doc) => (
                <div key={doc._id} className="flex items-center justify-between p-2 bg-white rounded">
                  <span className="font-medium">{doc.name}</span>
                  <Button size="sm" variant="outline">
                    Complete
                  </Button>
                </div>
              ))}
              {missingDocuments.length > 3 && (
                <div className="text-sm text-red-600">
                  +{missingDocuments.length - 3} more documents required
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      <div className="">
        <div className="mb-12">
          {/* Legacy System Forms/Documents */}
          {systemDocuments && systemDocuments.length > 0 && (
            <>
              <h2 className="text-md font-semibold px-2 mb-4">Forms</h2>
              <div className="divide-y divide-sand-6 mb-8">
                {systemDocuments.map((document) => (
                  <StaffDocumentListItem key={document._id} {...document} />
                ))}
              </div>
            </>
          )}

          {/* Enhanced Document References */}
          <h2 className="text-md font-semibold px-2 mb-4">Documents</h2>
          <div className="divide-y divide-sand-6">
            {documentReferences && documentReferences.length > 0 ? (
              <ul className="divide-y divide-sand-6">
                {documentReferences.map((document, index) => (
                  <EnhancedDocumentListItem 
                    key={document._id} 
                    document={document} 
                    submission={getSubmissionByDocumentId(document._id || '')}
                    index={index + 1}
                    onSubmitDocument={submitDocument}
                    isSubmitting={isSubmitting}
                    userId={user?.id?.toString() || ""}
                  />
                ))}
              </ul>
            ) : (
              <div className="py-4 text-center text-sand-10">
                No documents available
              </div>
            )}
          </div>
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
    <div className="space-y-6">
      {/* Compliance Overview Skeleton */}
      <Card>
        <CardHeader>
          <Skeleton className="h-6 w-48" />
          <Skeleton className="h-4 w-32" />
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-4 w-20" />
            </div>
            <Skeleton className="h-2 w-full" />
            <div className="grid grid-cols-3 gap-4 text-center">
              {[1, 2, 3].map((i) => (
                <div key={i} className="space-y-2">
                  <Skeleton className="h-8 w-8 mx-auto" />
                  <Skeleton className="h-4 w-16 mx-auto" />
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="mb-12 animate-pulse">
        <Skeleton className="h-5 w-32 mb-4" />
        <div className="divide-y divide-sand-6 mb-8">
          {Array.from({ length: 3 }).map((_, idx) => (
            <SkeletonListItem key={idx} />
          ))}
        </div>

        <Skeleton className="h-5 w-32 mb-4" />
        <div className="divide-y divide-sand-6">
          {Array.from({ length: 3 }).map((_, idx) => (
            <SkeletonListItem key={idx} />
          ))}
        </div>
      </div>
    </div>
  );
};

export const StaffDocumentListItem = (props: StaffDocument) => {
  return (
    <Link
      href={`/app/documents/${props._id}`}
      className="flex gap-8 items-center px-2 py-4"
    >
      <div>
        <DocumentIcon className="size-6 text-sand-11" />
      </div>
      <div className="flex-1">
        <p className="text-sand-11 font-semibold">{props.title}</p>
        <p className="text-sand-10 text-sm">{props.description}</p>
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
        <p className="text-sand-10 text-sm">
          Last updated {new Date(props.updatedAt).toDateString()}
        </p>
      </div>
      <div className="flex justify-end">
        <Tooltip>
          <TooltipTrigger>
            <Button
              disabled={props.status.name === "PENDING"}
              variant="outline"
              className="custom-shadow-sm"
            >
              Update
            </Button>
          </TooltipTrigger>
          {(props.status.name === "PENDING" ||
            props.status.name === "ACTIVE") && (
            <TooltipContent className="text-sand-11 shadow-sm">
              {props.status.name === "PENDING" &&
                "You cannot update your responses until we have verified your responses."}
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

interface EnhancedDocumentListItemProps {
  document: EnhancedDocumentReference;
  submission: DocumentSubmission | null;
  index: number;
  onSubmitDocument: (payload: any) => void;
  isSubmitting: boolean;
  userId: string;
}

export const EnhancedDocumentListItem = ({ 
  document, 
  submission, 
  index, 
  onSubmitDocument, 
  isSubmitting, 
  userId 
}: EnhancedDocumentListItemProps) => {
  const getStatusIcon = () => {
    if (!submission) {
      return <DocumentIcon className="size-6 text-sand-11" />;
    }

    switch (submission.status) {
      case DocumentSubmissionStatus.VERIFIED:
        return <CheckCircleIcon className="size-6 text-green-600" />;
      case DocumentSubmissionStatus.PENDING_VERIFICATION:
        return <ClockIcon className="size-6 text-yellow-600" />;
      case DocumentSubmissionStatus.REJECTED:
        return <XCircleIcon className="size-6 text-red-600" />;
      case DocumentSubmissionStatus.DRAFT:
        return <DocumentIcon className="size-6 text-blue-600" />;
      default:
        return <DocumentIcon className="size-6 text-sand-11" />;
    }
  };

  const getStatusBadge = () => {
    if (!submission) {
      return (
        <Badge variant="outline" className="inline-flex items-center w-fit flex-nowrap">
          Not Started
        </Badge>
      );
    }

    switch (submission.status) {
      case DocumentSubmissionStatus.VERIFIED:
        return (
          <Badge variant="success" className="inline-flex items-center w-fit flex-nowrap">
            <CheckCircleIcon className="size-4 mr-1" />
            Verified
          </Badge>
        );
      case DocumentSubmissionStatus.PENDING_VERIFICATION:
        return (
          <Badge variant="outline" className="inline-flex items-center w-fit flex-nowrap">
            <ClockIcon className="size-4 mr-1" />
            Pending Review
          </Badge>
        );
      case DocumentSubmissionStatus.REJECTED:
        return (
          <Badge variant="destructive" className="inline-flex items-center w-fit flex-nowrap">
            <XCircleIcon className="size-4 mr-1" />
            Rejected
          </Badge>
        );
      case DocumentSubmissionStatus.DRAFT:
        return (
          <Badge variant="outline" className="inline-flex items-center w-fit flex-nowrap">
            Draft
          </Badge>
        );
      default:
        return (
          <Badge variant="outline" className="inline-flex items-center w-fit flex-nowrap">
            Unknown
          </Badge>
        );
    }
  };

  const getLastUpdated = () => {
    if (submission?.verifiedAt) {
      return `Verified ${new Date(submission.verifiedAt).toDateString()}`;
    }
    if (submission?.submittedAt) {
      return `Submitted ${new Date(submission.submittedAt).toDateString()}`;
    }
    if (submission?.updatedAt) {
      return `Updated ${new Date(submission.updatedAt).toDateString()}`;
    }
    return `Created ${new Date(document.createdAt).toDateString()}`;
  };

  const handleSubmit = () => {
    if (document.documentType === DocumentType.FORM) {
      // For forms, navigate to form page
      console.log('Navigate to form for document:', document.name);
    } else {
      // For file uploads, open file picker
      console.log('Open file picker for document:', document.name);
      // Example submission
      onSubmitDocument({
        userId,
        documentReferenceId: document._id,
        fileData: {
          filename: 'example.pdf',
          originalName: 'Example Document.pdf',
          mimeType: 'application/pdf',
          size: 1024000,
          url: '/example.pdf',
          uploadedAt: new Date()
        }
      });
    }
  };

  const canUpdate = () => {
    return !submission || 
           submission.status === DocumentSubmissionStatus.DRAFT || 
           submission.status === DocumentSubmissionStatus.REJECTED;
  };

  const getActionButton = () => {
    if (!submission || submission.status === DocumentSubmissionStatus.REJECTED) {
      return (
        <Button
          onClick={handleSubmit}
          disabled={isSubmitting}
          variant="outline"
          className="custom-shadow-sm flex items-center gap-1"
          size="sm"
        >
          <UploadIcon className="size-4" />
          {document.documentType === DocumentType.FORM ? 'Complete' : 'Upload'}
        </Button>
      );
    } else if (submission.status === DocumentSubmissionStatus.DRAFT) {
      return (
        <Button
          onClick={handleSubmit}
          disabled={isSubmitting}
          variant="outline"
          className="custom-shadow-sm"
          size="sm"
        >
          Continue
        </Button>
      );
    } else {
      return (
        <Button
          variant="outline"
          className="custom-shadow-sm"
          size="sm"
          disabled={submission.status === DocumentSubmissionStatus.PENDING_VERIFICATION}
        >
          View
        </Button>
      );
    }
  };

  return (
    <li className="flex gap-8 items-center px-2 py-4">
      <p className="text-sand-11 font-semibold w-4">
        {index}.
      </p>
      <div>
        {getStatusIcon()}
      </div>
      <div className="flex-1">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sand-11 font-semibold">
              {document.name}
            </p>
            {document.description && (
              <p className="text-sand-10 text-sm">{document.description}</p>
            )}
            <div className="flex items-center gap-2 mt-1">
              <span className="text-xs text-gray-500">
                {document.documentType.replace('_', ' ').toUpperCase()}
              </span>
              {document.isRequired && (
                <Badge variant="outline" className="text-xs">Required</Badge>
              )}
              {document.isMandatoryForOnboarding && (
                <Badge variant="outline" className="text-xs">Onboarding</Badge>
              )}
            </div>
          </div>
        </div>
        
        {/* Submission Details */}
        {submission && submission.rejectionReason && (
          <div className="mt-2 p-2 bg-red-50 rounded text-xs text-red-600">
            Rejection reason: {submission.rejectionReason}
          </div>
        )}
        
        {submission && submission.expiryDate && (
          <div className="mt-1 text-xs text-gray-500">
            Expires: {new Date(submission.expiryDate).toLocaleDateString()}
          </div>
        )}
      </div>

      <div className="flex gap-4 items-center">
        {getStatusBadge()}
      </div>
      
      <div>
        <p className="text-sand-10 text-sm">
          {getLastUpdated()}
        </p>
      </div>

      <div className="flex justify-end gap-2">
        <Tooltip>
          <TooltipTrigger>
            {getActionButton()}
          </TooltipTrigger>
          {submission && submission.status === DocumentSubmissionStatus.PENDING_VERIFICATION && (
            <TooltipContent className="text-sand-11 shadow-sm">
              Your document is being reviewed by our team.
            </TooltipContent>
          )}
          {submission && submission.status === DocumentSubmissionStatus.VERIFIED && (
            <TooltipContent className="text-sand-11 shadow-sm">
              Document has been verified and approved.
            </TooltipContent>
          )}
        </Tooltip>

        <Button variant="ghost">
          <ChevronRightIcon className="size-5" />
        </Button>
      </div>
    </li>
  );
};

export default StaffDocumentsList;
