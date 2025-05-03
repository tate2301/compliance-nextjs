'use client';

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { dbsService } from "@/app/app/services/dbs";
import { DBS, DBSReference } from "@/lib/types";
import { useAuth } from "@/lib/auth/auth-context";

export function useDbs() {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  const { data: dbs, isLoading } = useQuery({
    queryKey: ["dbs", user?.id],
    queryFn: () => (user?.id ? dbsService.getUserDbs(user.id) : null),
    enabled: !!user?.id,
    retry: 2,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  const { data: dbsReferences, isLoading: isLoadingReferences } = useQuery({
    queryKey: ["dbsReferences"],
    queryFn: () => dbsService.getDbsReference(),
    staleTime: 1000 * 60 * 60, // 1 hour
  });

  const { mutate: updateDbs, isPending: isUpdating } = useMutation({
    mutationFn: ({ id, dbs }: { id: number; dbs: DBS }) => dbsService.updateUserDbs(id, dbs),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["dbs", user?.id] });
    },
  });

  const { mutate: addDbs, isPending: isAdding } = useMutation({
    mutationFn: (newDbs: DBS) =>
      user?.id ? dbsService.addUserDbs(user.id, newDbs) : Promise.reject("No user ID"),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["dbs", user?.id] });
    },
  });

  return {
    dbs,
    dbsReferences,
    isLoading,
    isLoadingReferences,
    updateDbs,
    addDbs,
    isUpdating,
    isAdding,
  };
}