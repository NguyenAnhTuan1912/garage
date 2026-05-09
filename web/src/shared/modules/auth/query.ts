import { useMutation } from "@tanstack/react-query";

// Import configs
import { queryClient } from "@/shared/config/query-client";

// Import api callers
import { signIn, refreshTokens } from "./api";

export const useSignInMutation = () =>
  useMutation({
    mutationFn: signIn,
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["me"] });
    },
  });

export const useRefreshTokensMutation = () =>
  useMutation({
    mutationFn: refreshTokens,
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["me"] });
    },
  });
