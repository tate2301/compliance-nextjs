'use client';

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { documentsService } from "@/app/subdomains/app/services/documents";
import { Document, DocumentReference } from "@/lib/types";
import { useAuth } from "@/lib/auth/auth-context";

export function useDocuments() {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  const { data: documents, isLoading } = useQuery({
    queryKey: ["documents", user?.id],
    queryFn: () => (user?.id ? documentsService.getUserDocuments(user.id) : []),
    enabled: !!user?.id,
    retry: 2,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  const { data: documentReferences, isLoading: isLoadingReferences } = useQuery({
    queryKey: ["documentReferences"],
    queryFn: () => documentsService.getDocumentReference(),
    staleTime: 1000 * 60 * 60, // 1 hour
  });

  const { mutate: uploadDocument, isPending: isUploading } = useMutation({
    mutationFn: (payload: any) => documentsService.uploadDocument(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["documents", user?.id] });
    },
  });

  const { mutate: deleteDocument, isPending: isDeleting } = useMutation({
    mutationFn: (id: number) => documentsService.deleteDocument(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["documents", user?.id] });
    },
  });

  // Function to get missing documents by comparing references with user documents
  const getMissingDocuments = () => {
    if (!documentReferences || !documents) return documentReferences;
    if(!documents.length) return documentReferences
    
    // Get all document IDs that the user has
    const userDocumentIds = documents.map(doc => doc.id);
    
    // Filter out document references that the user doesn't have and are required
    return documentReferences.filter(ref => 
      ref.is_required && !userDocumentIds.includes(ref.id)
    );
  };

  return {
    documents: [],
    documentReferences,
    isLoading,
    isLoadingReferences,
    uploadDocument,
    deleteDocument,
    isUploading,
    isDeleting,
    getMissingDocuments
  };
}