import { api, localApiClient } from "@/lib/auth"
import { 
  Document, 
  DocumentReference, 
  DocumentPayload,
  EnhancedDocumentReference,
  DocumentSubmission,
  DocumentSubmissionPayload,
  DocumentSubmissionStatus,
  DocumentType,
  FormCategory
} from "@/lib/types"
import { isAxiosError } from "axios"

export const documentsService = {
    // Document References
    getDocumentReferences: async (params?: {
        category?: FormCategory;
        documentType?: DocumentType;
        mandatory?: boolean;
    }): Promise<EnhancedDocumentReference[]> => {
        try {
            const searchParams = new URLSearchParams();
            if (params?.category) searchParams.append('category', params.category);
            if (params?.documentType) searchParams.append('documentType', params.documentType);
            if (params?.mandatory) searchParams.append('mandatory', 'true');
            
            const response = await localApiClient.get(`/api/documents?${searchParams.toString()}`);
            return response.data;
        } catch (error) {
            if (isAxiosError(error)) {
                throw new Error(error.response?.data.message || "Failed to fetch document references");
            }
            throw error;
        }
    },

    getDocumentReferenceById: async (id: string): Promise<EnhancedDocumentReference> => {
        try {
            const response = await localApiClient.get(`/api/documents/${id}`);
            return response.data;
        } catch (error) {
            if (isAxiosError(error)) {
                throw new Error(error.response?.data.message || "Failed to fetch document reference");
            }
            throw error;
        }
    },

    // User Document Submissions
    getUserDocumentSubmissions: async (
        userId: string, 
        params?: { status?: DocumentSubmissionStatus }
    ): Promise<DocumentSubmission[]> => {
        try {
            const searchParams = new URLSearchParams();
            searchParams.append('type', 'submissions');
            searchParams.append('userId', userId);
            if (params?.status) searchParams.append('status', params.status);
            
            const response = await localApiClient.get(`/api/documents?${searchParams.toString()}`);
            return response.data;
        } catch (error) {
            if (isAxiosError(error)) {
                throw new Error(error.response?.data.message || "Failed to fetch document submissions");
            }
            throw error;
        }
    },

    getDocumentSubmissionById: async (id: string, userId: string): Promise<DocumentSubmission> => {
        try {
            const response = await localApiClient.get(`/api/documents/${id}?type=submission&userId=${userId}`);
            return response.data;
        } catch (error) {
            if (isAxiosError(error)) {
                throw new Error(error.response?.data.message || "Failed to fetch document submission");
            }
            throw error;
        }
    },

    // Create or update document submission
    submitDocument: async (payload: DocumentSubmissionPayload): Promise<DocumentSubmission> => {
        try {
            const response = await localApiClient.post(`/api/documents`, payload);
            return response.data;
        } catch (error) {
            if (isAxiosError(error)) {
                throw new Error(error.response?.data.message || "Failed to submit document");
            }
            throw error;
        }
    },

    updateDocumentSubmission: async (
        id: string, 
        userId: string, 
        payload: Partial<DocumentSubmissionPayload>
    ): Promise<DocumentSubmission> => {
        try {
            const response = await localApiClient.put(`/api/documents/${id}?type=submission&userId=${userId}`, payload);
            return response.data;
        } catch (error) {
            if (isAxiosError(error)) {
                throw new Error(error.response?.data.message || "Failed to update document submission");
            }
            throw error;
        }
    },

    deleteDocumentSubmission: async (id: string, userId: string): Promise<any> => {
        try {
            const response = await localApiClient.delete(`/api/documents/${id}?type=submission&userId=${userId}`);
            return response.data;
        } catch (error) {
            if (isAxiosError(error)) {
                throw new Error(error.response?.data.message || "Failed to delete document submission");
            }
            throw error;
        }
    },

    // Admin functions
    getDocumentsForVerification: async (params?: {
        status?: DocumentSubmissionStatus;
        category?: FormCategory;
        page?: number;
        limit?: number;
    }): Promise<{
        submissions: DocumentSubmission[];
        pagination: {
            page: number;
            limit: number;
            total: number;
            pages: number;
        };
    }> => {
        try {
            const searchParams = new URLSearchParams();
            if (params?.status) searchParams.append('status', params.status);
            if (params?.category) searchParams.append('category', params.category);
            if (params?.page) searchParams.append('page', params.page.toString());
            if (params?.limit) searchParams.append('limit', params.limit.toString());
            
            const response = await localApiClient.get(`/api/documents/admin?${searchParams.toString()}`);
            return response.data;
        } catch (error) {
            if (isAxiosError(error)) {
                throw new Error(error.response?.data.message || "Failed to fetch documents for verification");
            }
            throw error;
        }
    },

    verifyDocuments: async (
        submissionIds: string[], 
        verifiedBy: string, 
        verificationNotes?: string
    ): Promise<any> => {
        try {
            const response = await localApiClient.put(`/api/documents/admin`, {
                submissionIds,
                action: 'verify',
                verifiedBy,
                verificationNotes
            });
            return response.data;
        } catch (error) {
            if (isAxiosError(error)) {
                throw new Error(error.response?.data.message || "Failed to verify documents");
            }
            throw error;
        }
    },

    rejectDocuments: async (
        submissionIds: string[], 
        verifiedBy: string, 
        rejectionReason: string, 
        verificationNotes?: string
    ): Promise<any> => {
        try {
            const response = await localApiClient.put(`/api/documents/admin`, {
                submissionIds,
                action: 'reject',
                verifiedBy,
                rejectionReason,
                verificationNotes
            });
            return response.data;
        } catch (error) {
            if (isAxiosError(error)) {
                throw new Error(error.response?.data.message || "Failed to reject documents");
            }
            throw error;
        }
    },

    // Backward compatibility methods
    getDocumentReference: async (): Promise<DocumentReference[]> => {
        try {
            const enhancedRefs = await documentsService.getDocumentReferences();
            // Convert enhanced references to legacy format for backward compatibility
            return enhancedRefs.map(ref => ({
                id: parseInt(ref.referenceId),
                name: ref.name,
                reference: ref.referenceId,
                is_required: ref.isRequired
            }));
        } catch (error) {
            if (isAxiosError(error)) {
                throw new Error(error.response?.data.message || "Failed to fetch document reference");
            }
            throw error;
        }
    },

    getUserDocuments: async (userId: number): Promise<Document[]> => {
        try {
            const submissions = await documentsService.getUserDocumentSubmissions(userId.toString());
            // Convert submissions to legacy format for backward compatibility
            return submissions
                .filter(sub => sub.status === DocumentSubmissionStatus.VERIFIED)
                .map(sub => ({
                    id: parseInt(sub._id || '0'),
                    name: typeof sub.documentReference === 'object' ? sub.documentReference.name : 'Document',
                    user_id: parseInt(sub.user),
                    uploaded_at: sub.submittedAt?.toISOString(),
                    verified_by: typeof sub.verifiedBy === 'string' ? parseInt(sub.verifiedBy) : undefined,
                    certificate: sub.fileData?.url
                }));
        } catch (error) {
            if (isAxiosError(error)) {
                throw new Error(error.response?.data.message || "Failed to fetch documents");
            }
            throw error;
        }
    },

    uploadDocument: async (payload: any): Promise<any> => {
        try {
            // Convert legacy payload to new format
            const newPayload: DocumentSubmissionPayload = {
                userId: payload.user_id?.toString() || payload.userId,
                documentReferenceId: payload.document_reference_id || payload.documentReferenceId,
                fileData: payload.fileData,
                status: DocumentSubmissionStatus.SUBMITTED
            };
            
            const response = await documentsService.submitDocument(newPayload);
            return response;
        } catch (error) {
            if (isAxiosError(error)) {
                throw new Error(error.response?.data.message || "Failed to upload document");
            }
            throw error;
        }
    },

    deleteDocument: async (id: number): Promise<any> => {
        try {
            // This would need user context - for now, throw an error
            throw new Error("Delete document requires user context. Use deleteDocumentSubmission instead.");
        } catch (error) {
            if (isAxiosError(error)) {
                throw new Error(error.response?.data.message || "Failed to delete document");
            }
            throw error;
        }
    }
}