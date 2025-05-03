'use client';

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { referenceService } from "@/app/app/services/reference";
import { Reference } from "@/lib/types";
import { useAuth } from "@/lib/auth/auth-context";

export function useReferences() {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  const { data: references, isLoading } = useQuery({
    queryKey: ["references", user?.id],
    queryFn: () => (user?.id ? referenceService.getUserReferences(user.id) : []),
    enabled: !!user?.id,
    retry: 2,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  const { mutate: addReference, isPending: isAdding } = useMutation({
    mutationFn: (newReference: Reference) => referenceService.addReference({...newReference, user_id: user.id}),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["references", user?.id] });
    },
  });

  const { mutate: updateReference, isPending: isUpdating } = useMutation({
    mutationFn: (reference: Reference) => referenceService.updateReference(reference),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["references", user?.id] });
    },
  });

  const { mutate: removeReference, isPending: isRemoving } = useMutation({
    mutationFn: (id: number) => referenceService.deleteReference(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["references", user?.id] });
    },
  });

  const { mutate: downloadReference, isPending: isDownloading } = useMutation({
    mutationFn: (token: string) => referenceService.downloadReference(token),
  });

  return {
    references: references || [],
    isLoading,
    addReference,
    updateReference,
    removeReference,
    downloadReference,
    isAdding,
    isUpdating,
    isRemoving,
    isDownloading,
  };
}