'use client';

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { addressService } from "@/app/subdomains/app/services/address";
import { Address } from "@/lib/types";
import { useAuth } from "@/lib/auth/auth-context";

export function useAddress() {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  const { data: address, isLoading } = useQuery({
    queryKey: ["address", user?.id],
    queryFn: () => (user?.id ? addressService.getUserAddress(user.id) : null),
    enabled: !!user?.id,
    retry: 2,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  const { mutate: updateAddress, isPending: isUpdating } = useMutation({
    mutationFn: (newAddress: Address) => addressService.updateAddress(newAddress),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["address", user?.id] });
    },
  });

  const { mutate: addAddress, isPending: isAdding } = useMutation({
    mutationFn: (newAddress: Address) =>
      user?.id ? addressService.addUserAddress(user.id, newAddress) : Promise.reject("No user ID"),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["address", user?.id] });
    },
  });

  return {
    address,
    isLoading,
    updateAddress,
    addAddress,
    isUpdating,
    isAdding,
  };
}