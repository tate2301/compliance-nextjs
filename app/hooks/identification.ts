'use client';

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { identificationService } from "@/app/app/services/identification";
import { ID, IDReference } from "@/lib/types";
import { useAuth } from "@/lib/auth/auth-context";

export function useIdentification() {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  const { data: identification, isLoading } = useQuery({
    queryKey: ["identification", user?.id],
    queryFn: () => (user?.id ? identificationService.getUserId(user.id) : null),
    enabled: !!user?.id,
    retry: 2,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  const { data: idReferences, isLoading: isLoadingReferences } = useQuery({
    queryKey: ["idReferences"],
    queryFn: () => identificationService.getIdReference(),
    staleTime: 1000 * 60 * 60, // 1 hour
  });

  const { mutate: updateIdentification, isPending: isUpdating } = useMutation({
    mutationFn: ({ id, identification }: { id: number; identification: ID }) => 
      identificationService.updateUserId(id, identification),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["identification", user?.id] });
    },
  });

  const { mutate: addIdentification, isPending: isAdding } = useMutation({
    mutationFn: (newIdentification: ID) =>
      user?.id ? identificationService.addUserId(user.id, newIdentification) : Promise.reject("No user ID"),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["identification", user?.id] });
    },
  });

  return {
    identification,
    idReferences,
    isLoading,
    isLoadingReferences,
    updateIdentification,
    addIdentification,
    isUpdating,
    isAdding,
  };
}