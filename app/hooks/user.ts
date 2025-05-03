'use client';

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { userService } from "@/app/app/services/user";
import { User } from "@/lib/types";
import { useAuth } from "@/lib/auth/auth-context";

export function useUser() {
  const { user: authUser } = useAuth();
  const queryClient = useQueryClient();

  const { data: userData, isLoading, error, refetch } = useQuery({
    queryKey: ["user", authUser?.id],
    queryFn: () => (authUser?.id ? userService.getUser(authUser.id) : null),
    enabled: !!authUser?.id,
    retry: 2,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  const { mutate: updateUser, isPending: isUpdating } = useMutation({
    mutationFn: (data: Partial<User>) => {
      if (!authUser?.id) throw new Error("User not authenticated");
      return userService.updateUser(authUser.id, data);
    },
    onSuccess: () => {
      // Invalidate and refetch the user data
      queryClient.invalidateQueries({ queryKey: ["user", authUser?.id] });
    },
  });

  return {
    userData, // Renamed from user to userData to avoid confusion with authUser
    isLoading,
    error,
    refetch,
    updateUser,
    isUpdating
  };
}