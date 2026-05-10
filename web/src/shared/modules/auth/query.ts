import { useMutation, useQuery } from "@tanstack/react-query";

// Import configs
import { queryClient } from "@/shared/config/query-client";

// Import api callers
import {
  signIn,
  refreshTokens,
  listApiKeys,
  createApiKey,
  updateApiKey,
  deleteApiKey,
  testConnectionWithApiKey,
} from "./api";

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

export const useApiKeysQuery = () =>
  useQuery({
    queryFn: listApiKeys,
    queryKey: ["api-keys"],
  });

export const useCreateApiKeyMutation = () =>
  useMutation({
    mutationFn: createApiKey,
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["api-keys"] });
    },
  });

export const useUpdateApiKeyMutation = () =>
  useMutation({
    mutationFn: updateApiKey,
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["api-keys"] });
    },
  });

export const useDeleteApiKeyMutation = () =>
  useMutation({
    mutationFn: deleteApiKey,
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["api-keys"] });
    },
  });

export const useTestConnectionWithApiKeyMutation = () =>
  useMutation({
    mutationFn: testConnectionWithApiKey,
  });
