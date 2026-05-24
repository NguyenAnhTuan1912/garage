import { useQuery, useMutation } from "@tanstack/react-query";

// Import configs
import { queryClient } from "@/shared/config/query-client";

// Import api callers
import {
  getCollectionTypes,
  getCollections,
  getCollection,
  createCollection,
  updateCollection,
  getCollectionItems,
  createCollectionItem,
  updateCollectionItem,
} from "./api";

// Import types
import type { TFindManyCollectionsParams } from "./type";

export const useCollectionTypesQuery = () =>
  useQuery({
    queryKey: ["collection-types"],
    queryFn: getCollectionTypes,
    retry: false,
  });

export const useCollectionsQuery = (params?: TFindManyCollectionsParams) =>
  useQuery({
    queryKey: ["collections", params],
    queryFn: () => getCollections({ params }),
    retry: false,
  });

export const useCollectionQuery = (id: string) =>
  useQuery({
    queryKey: ["collections"],
    queryFn: () => getCollection(id),
    retry: false,
  });

export const useCollectionItemsQuery = (collectionId: string) =>
  useQuery({
    queryKey: ["collection-items", collectionId],
    queryFn: () => getCollectionItems(collectionId),
    retry: false,
    enabled: !!collectionId,
  });

export const useCreateCollectionMutation = () =>
  useMutation({
    mutationFn: createCollection,
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ["collections"],
      });
    },
  });

export const useUpdateCollectionMutation = () =>
  useMutation({
    mutationFn: updateCollection,
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["collections"] });
    },
  });

export const useCreateCollectionItemMutation = () =>
  useMutation({
    mutationFn: createCollectionItem,
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ["collection-items"],
      });
    },
  });

export const useUpdateCollectionItemMutation = () =>
  useMutation({
    mutationFn: updateCollectionItem,
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ["collection-items"],
      });
    },
  });
