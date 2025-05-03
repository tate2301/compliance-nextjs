'use client';

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { trainingsService } from "@/app/subdomains/app/services/trainings";
import { Training, TrainingPayload, TrainingReference } from "@/lib/types";
import { useAuth } from "@/lib/auth/auth-context";

export function useTrainings() {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  const { data: trainings, isLoading } = useQuery({
    queryKey: ["trainings", user?.id],
    queryFn: () => (user?.id ? trainingsService.getUserTrainings(user.id) : []),
    enabled: !!user?.id,
    retry: 2,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  const { data: trainingReferences, isLoading: isLoadingReferences } = useQuery({
    queryKey: ["trainingReferences"],
    queryFn: () => trainingsService.getTrainingReference(),
    staleTime: 1000 * 60 * 60, // 1 hour
  });

  const { mutate: uploadTraining, isPending: isUploading } = useMutation({
    mutationFn: (formData: FormData) => trainingsService.uploadTraining(formData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["trainings", user?.id] });
    },
  });

  const { mutate: deleteTraining, isPending: isDeleting } = useMutation({
    mutationFn: (payload: { id: number; withLinked: boolean }) => trainingsService.deleteTraining(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["trainings", user?.id] });
    },
  });

  return {
    trainings,
    trainingReferences,
    isLoading,
    isLoadingReferences,
    uploadTraining,
    deleteTraining,
    isUploading,
    isDeleting,
  };
}