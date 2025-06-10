'use client';

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { documentsService } from "@/app/app/services/documents";
import { 
  Document, 
  DocumentReference,
  EnhancedDocumentReference,
  DocumentSubmission,
  DocumentSubmissionPayload,
  DocumentSubmissionStatus,
  DocumentType,
  FormCategory
} from "@/lib/types";
import { useAuth } from "@/lib/auth/auth-context";

export function useDocuments() {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  // Document References (the available documents to complete)
  const { data: documentReferences, isLoading: isLoadingReferences } = useQuery({
    queryKey: ["documentReferences"],
    queryFn: () => documentsService.getDocumentReferences(),
    staleTime: 1000 * 60 * 60, // 1 hour
  });

  // User's Document Submissions
  const { data: documentSubmissions, isLoading: isLoadingSubmissions } = useQuery({
    queryKey: ["documentSubmissions", user?.id],
    queryFn: () => (user?.id ? documentsService.getUserDocumentSubmissions(user.id.toString()) : []),
    enabled: !!user?.id,
    retry: 2,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  // Legacy documents (for backward compatibility)
  const { data: documents, isLoading: isLoadingLegacy } = useQuery({
    queryKey: ["documents", user?.id],
    queryFn: () => (user?.id ? documentsService.getUserDocuments(user.id) : []),
    enabled: !!user?.id,
    retry: 2,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  // Submit Document Mutation
  const { mutate: submitDocument, isPending: isSubmitting } = useMutation({
    mutationFn: (payload: DocumentSubmissionPayload) => documentsService.submitDocument(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["documentSubmissions", user?.id] });
      queryClient.invalidateQueries({ queryKey: ["documents", user?.id] });
    },
  });

  // Update Document Submission Mutation
  const { mutate: updateDocumentSubmission, isPending: isUpdating } = useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: Partial<DocumentSubmissionPayload> }) => 
      documentsService.updateDocumentSubmission(id, user?.id?.toString() || "", payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["documentSubmissions", user?.id] });
      queryClient.invalidateQueries({ queryKey: ["documents", user?.id] });
    },
  });

  // Delete Document Submission Mutation
  const { mutate: deleteDocumentSubmission, isPending: isDeleting } = useMutation({
    mutationFn: (id: string) => documentsService.deleteDocumentSubmission(id, user?.id?.toString() || ""),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["documentSubmissions", user?.id] });
      queryClient.invalidateQueries({ queryKey: ["documents", user?.id] });
    },
  });

  // Legacy mutations (for backward compatibility)
  const { mutate: uploadDocument, isPending: isUploading } = useMutation({
    mutationFn: (payload: any) => documentsService.uploadDocument(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["documents", user?.id] });
      queryClient.invalidateQueries({ queryKey: ["documentSubmissions", user?.id] });
    },
  });

  const { mutate: deleteDocument, isPending: isDeletingLegacy } = useMutation({
    mutationFn: (id: number) => documentsService.deleteDocument(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["documents", user?.id] });
      queryClient.invalidateQueries({ queryKey: ["documentSubmissions", user?.id] });
    },
  });

  // Helper functions
  const getMissingDocuments = () => {
    if (!documentReferences || !documentSubmissions) return documentReferences || [];
    
    // Get all document reference IDs that the user has submitted or completed
    const submittedDocumentIds = documentSubmissions
      .filter(sub => [
        DocumentSubmissionStatus.SUBMITTED,
        DocumentSubmissionStatus.PENDING_VERIFICATION,
        DocumentSubmissionStatus.VERIFIED
      ].includes(sub.status))
      .map(sub => typeof sub.documentReference === 'object' ? sub.documentReference._id : sub.documentReference);
    
    // Filter out document references that the user has already submitted and are required
    return documentReferences.filter(ref => 
      ref.isRequired && !submittedDocumentIds.includes(ref._id)
    );
  };

  const getMandatoryDocuments = () => {
    if (!documentReferences) return [];
    return documentReferences.filter(ref => ref.isMandatoryForOnboarding);
  };

  const getDocumentsByCategory = (category: FormCategory) => {
    if (!documentReferences) return [];
    return documentReferences.filter(ref => ref.category === category);
  };

  const getDocumentsByType = (documentType: DocumentType) => {
    if (!documentReferences) return [];
    return documentReferences.filter(ref => ref.documentType === documentType);
  };

  const getSubmissionByDocumentId = (documentReferenceId: string) => {
    if (!documentSubmissions) return null;
    return documentSubmissions.find(sub => 
      typeof sub.documentReference === 'object' 
        ? sub.documentReference._id === documentReferenceId
        : sub.documentReference === documentReferenceId
    );
  };

  const getComplianceStatus = () => {
    if (!documentReferences || !documentSubmissions) {
      return {
        isCompliant: false,
        totalRequired: 0,
        completed: 0,
        pending: 0,
        missing: 0,
        percentage: 0
      };
    }

    const requiredDocs = documentReferences.filter(ref => ref.isRequired);
    const totalRequired = requiredDocs.length;

    const completedCount = requiredDocs.filter(ref => {
      const submission = getSubmissionByDocumentId(ref._id || '');
      return submission && submission.status === DocumentSubmissionStatus.VERIFIED;
    }).length;

    const pendingCount = requiredDocs.filter(ref => {
      const submission = getSubmissionByDocumentId(ref._id || '');
      return submission && [
        DocumentSubmissionStatus.SUBMITTED,
        DocumentSubmissionStatus.PENDING_VERIFICATION
      ].includes(submission.status);
    }).length;

    const missing = totalRequired - completedCount - pendingCount;
    const percentage = totalRequired > 0 ? Math.round((completedCount / totalRequired) * 100) : 100;

    return {
      isCompliant: completedCount === totalRequired,
      totalRequired,
      completed: completedCount,
      pending: pendingCount,
      missing,
      percentage
    };
  };

  const isLoading = isLoadingReferences || isLoadingSubmissions || isLoadingLegacy;

  return {
    // Enhanced data
    documentReferences,
    documentSubmissions,
    isLoading,
    isLoadingReferences,
    isLoadingSubmissions,

    // Enhanced actions
    submitDocument,
    updateDocumentSubmission,
    deleteDocumentSubmission,
    isSubmitting,
    isUpdating,
    isDeleting,

    // Helper functions
    getMissingDocuments,
    getMandatoryDocuments,
    getDocumentsByCategory,
    getDocumentsByType,
    getSubmissionByDocumentId,
    getComplianceStatus,

    // Legacy compatibility
    documents: documents || [],
    uploadDocument,
    deleteDocument,
    isUploading,
    isDeletingLegacy
  };
}

// Hook for admin document management
export function useAdminDocuments() {
  const queryClient = useQueryClient();

  const getDocumentsForVerification = (params?: {
    status?: DocumentSubmissionStatus;
    category?: FormCategory;
    page?: number;
    limit?: number;
  }) => {
    return useQuery({
      queryKey: ["adminDocuments", params],
      queryFn: () => documentsService.getDocumentsForVerification(params),
      staleTime: 1000 * 60 * 2, // 2 minutes
    });
  };

  const { mutate: verifyDocuments, isPending: isVerifying } = useMutation({
    mutationFn: ({ submissionIds, verifiedBy, verificationNotes }: {
      submissionIds: string[];
      verifiedBy: string;
      verificationNotes?: string;
    }) => documentsService.verifyDocuments(submissionIds, verifiedBy, verificationNotes),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["adminDocuments"] });
    },
  });

  const { mutate: rejectDocuments, isPending: isRejecting } = useMutation({
    mutationFn: ({ submissionIds, verifiedBy, rejectionReason, verificationNotes }: {
      submissionIds: string[];
      verifiedBy: string;
      rejectionReason: string;
      verificationNotes?: string;
    }) => documentsService.rejectDocuments(submissionIds, verifiedBy, rejectionReason, verificationNotes),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["adminDocuments"] });
    },
  });

  return {
    getDocumentsForVerification,
    verifyDocuments,
    rejectDocuments,
    isVerifying,
    isRejecting
  };
}