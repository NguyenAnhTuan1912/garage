import { useQuery, useMutation } from "@tanstack/react-query";

// Import api callers
import { me, updateProfile } from "./api";

export const useMeQuery = () =>
  useQuery({
    queryKey: ["me"],
    queryFn: me,
    retry: false,
  });

export const useUpdateProfileMutation = () =>
  useMutation({
    mutationFn: updateProfile,
  });
