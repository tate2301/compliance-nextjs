"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { useDocuments } from "@/app/hooks/documents";
import { useAuth } from "@/lib/auth/auth-context";
import { 
  DocumentType, 
  FormCategory, 
  DocumentSubmissionStatus,
  EnhancedDocumentReference,
  DocumentSubmission 
} from "@/lib/types";
import {
  CheckCircleIcon,
  ClockIcon,
  DocumentIcon,
  ExclamationCircleIcon,
  XCircleIcon,
  UploadIcon
} from "@heroicons/react/solid";

export function EnhancedDocumentsList() {
  const { user } = useAuth();
  const {
    documentReferences,
    documentSubmissions,
    getMissingDocuments,
    getMandatoryDocuments,
    getDocumentsByCategory,
    getSubmissionByDocumentId,
    getComplianceStatus,
    submitDocument,
    isLoading,
    isSubmitting
  } = useDocuments();

  const [selectedCategory, setSelectedCategory] = useState<FormCategory>(FormCategory.ONBOARDING);
  const complianceStatus = getComplianceStatus();
  const missingDocuments = getMissingDocuments();
  const mandatoryDocuments = getMandatoryDocuments();

  if (isLoading) {
    return <DocumentsListSkeleton />;
  }

  return (
    <div className="space-y-6">
      {/* Compliance Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <DocumentIcon className="h-5 w-5" />
            Compliance Status
          </CardTitle>
          <CardDescription>
            Your document completion progress
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

      {/* Documents by Category */}
      <Card>
        <CardHeader>
          <CardTitle>Documents</CardTitle>
          <CardDescription>
            Manage your documents by category
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={selectedCategory} onValueChange={(value) => setSelectedCategory(value as FormCategory)}>
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value={FormCategory.ONBOARDING}>Onboarding</TabsTrigger>
              <TabsTrigger value={FormCategory.COMPLIANCE}>Compliance</TabsTrigger>
              <TabsTrigger value={FormCategory.EMPLOYMENT}>Employment</TabsTrigger>
              <TabsTrigger value={FormCategory.HEALTH}>Health</TabsTrigger>
            </TabsList>

            {Object.values(FormCategory).map((category) => (
              <TabsContent key={category} value={category} className="space-y-4">
                <CategoryDocuments 
                  category={category}
                  documents={getDocumentsByCategory(category)}
                  getSubmissionByDocumentId={getSubmissionByDocumentId}
                  onSubmitDocument={submitDocument}
                  isSubmitting={isSubmitting}
                  userId={user?.id?.toString() || ""}
                />
              </TabsContent>
            ))}
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}

interface CategoryDocumentsProps {
  category: FormCategory;
  documents: EnhancedDocumentReference[];
  getSubmissionByDocumentId: (id: string) => DocumentSubmission | null;
  onSubmitDocument: (payload: any) => void;
  isSubmitting: boolean;
  userId: string;
}

function CategoryDocuments({ 
  category, 
  documents, 
  getSubmissionByDocumentId, 
  onSubmitDocument, 
  isSubmitting,
  userId 
}: CategoryDocumentsProps) {
  if (documents.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        No documents in this category
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {documents.map((doc) => {
        const submission = getSubmissionByDocumentId(doc._id || '');
        return (
          <DocumentCard
            key={doc._id}
            document={doc}
            submission={submission}
            onSubmitDocument={onSubmitDocument}
            isSubmitting={isSubmitting}
            userId={userId}
          />
        );
      })}
    </div>
  );
}

interface DocumentCardProps {
  document: EnhancedDocumentReference;
  submission: DocumentSubmission | null;
  onSubmitDocument: (payload: any) => void;
  isSubmitting: boolean;
  userId: string;
}

function DocumentCard({ document, submission, onSubmitDocument, isSubmitting, userId }: DocumentCardProps) {
  const getStatusIcon = () => {
    if (!submission) {
      return <DocumentIcon className="h-5 w-5 text-gray-400" />;
    }

    switch (submission.status) {
      case DocumentSubmissionStatus.VERIFIED:
        return <CheckCircleIcon className="h-5 w-5 text-green-500" />;
      case DocumentSubmissionStatus.PENDING_VERIFICATION:
        return <ClockIcon className="h-5 w-5 text-yellow-500" />;
      case DocumentSubmissionStatus.REJECTED:
        return <XCircleIcon className="h-5 w-5 text-red-500" />;
      default:
        return <DocumentIcon className="h-5 w-5 text-gray-400" />;
    }
  };

  const getStatusBadge = () => {
    if (!submission) {
      return <Badge variant="outline">Not Started</Badge>;
    }

    switch (submission.status) {
      case DocumentSubmissionStatus.VERIFIED:
        return <Badge variant="success">Verified</Badge>;
      case DocumentSubmissionStatus.PENDING_VERIFICATION:
        return <Badge variant="outline">Pending Verification</Badge>;
      case DocumentSubmissionStatus.REJECTED:
        return <Badge variant="destructive">Rejected</Badge>;
      case DocumentSubmissionStatus.DRAFT:
        return <Badge variant="outline">Draft</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  const handleSubmit = () => {
    if (document.documentType === DocumentType.FORM) {
      // For forms, you would open a form modal or navigate to form page
      console.log('Open form for document:', document.name);
    } else {
      // For file uploads, you would open file picker
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

  return (
    <Card className="transition-shadow hover:shadow-md">
      <CardContent className="p-4">
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-3 flex-1">
            {getStatusIcon()}
            <div className="flex-1">
              <div className="flex items-start justify-between">
                <div>
                  <h4 className="font-medium">{document.name}</h4>
                  {document.description && (
                    <p className="text-sm text-gray-600 mt-1">{document.description}</p>
                  )}
                  <div className="flex items-center gap-2 mt-2">
                    {getStatusBadge()}
                    {document.isRequired && (
                      <Badge variant="outline" className="text-xs">Required</Badge>
                    )}
                    {document.isMandatoryForOnboarding && (
                      <Badge variant="outline" className="text-xs">Onboarding</Badge>
                    )}
                  </div>
                </div>
              </div>
              
              {/* Document Type Info */}
              <div className="mt-3 text-xs text-gray-500">
                Type: {document.documentType.replace('_', ' ').toUpperCase()}
                {document.validityPeriod && (
                  <span> • Valid for {document.validityPeriod} days</span>
                )}
                {document.allowedFileTypes && (
                  <span> • Accepts: {document.allowedFileTypes.join(', ').toUpperCase()}</span>
                )}
              </div>

              {/* Submission Details */}
              {submission && (
                <div className="mt-3 p-2 bg-gray-50 rounded text-xs">
                  {submission.submittedAt && (
                    <div>Submitted: {new Date(submission.submittedAt).toLocaleDateString()}</div>
                  )}
                  {submission.verifiedAt && (
                    <div>Verified: {new Date(submission.verifiedAt).toLocaleDateString()}</div>
                  )}
                  {submission.rejectionReason && (
                    <div className="text-red-600">Reason: {submission.rejectionReason}</div>
                  )}
                  {submission.expiryDate && (
                    <div>Expires: {new Date(submission.expiryDate).toLocaleDateString()}</div>
                  )}
                </div>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-2">
            {!submission || submission.status === DocumentSubmissionStatus.REJECTED ? (
              <Button
                onClick={handleSubmit}
                disabled={isSubmitting}
                size="sm"
                className="flex items-center gap-1"
              >
                <UploadIcon className="h-4 w-4" />
                {document.documentType === DocumentType.FORM ? 'Fill Form' : 'Upload'}
              </Button>
            ) : submission.status === DocumentSubmissionStatus.DRAFT ? (
              <Button
                onClick={handleSubmit}
                disabled={isSubmitting}
                variant="outline"
                size="sm"
              >
                Continue
              </Button>
            ) : (
              <Button
                onClick={() => console.log('View submission')}
                variant="outline"
                size="sm"
              >
                View
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function DocumentsListSkeleton() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="h-6 bg-gray-200 rounded animate-pulse"></div>
          <div className="h-4 bg-gray-200 rounded animate-pulse w-2/3"></div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="h-2 bg-gray-200 rounded animate-pulse"></div>
            <div className="grid grid-cols-3 gap-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="text-center space-y-2">
                  <div className="h-8 bg-gray-200 rounded animate-pulse"></div>
                  <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
      
      {[1, 2, 3].map((i) => (
        <Card key={i}>
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <div className="h-5 w-5 bg-gray-200 rounded animate-pulse"></div>
              <div className="flex-1 space-y-2">
                <div className="h-5 bg-gray-200 rounded animate-pulse"></div>
                <div className="h-4 bg-gray-200 rounded animate-pulse w-2/3"></div>
                <div className="flex gap-2">
                  <div className="h-6 w-16 bg-gray-200 rounded animate-pulse"></div>
                  <div className="h-6 w-12 bg-gray-200 rounded animate-pulse"></div>
                </div>
              </div>
              <div className="h-8 w-20 bg-gray-200 rounded animate-pulse"></div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

export default EnhancedDocumentsList; 