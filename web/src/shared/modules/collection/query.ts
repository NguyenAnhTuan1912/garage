import { useQuery, useMutation } from "@tanstack/react-query";

// Import configs
import { queryClient } from "@/shared/config/query-client";

// Import api callers
import {
  getCollectionTypes,
  getCollections,
  getCollection,
  createCollection,
} from "./api";

export const useCollectionTypesQuery = () =>
  useQuery({
    queryKey: ["collection-types"],
    queryFn: getCollectionTypes,
    retry: false,
  });

export const useCollectionsQuery = () =>
  useQuery({
    queryKey: ["collections"],
    queryFn: getCollections,
    retry: false,
  });

export const useCollectionQuery = (id: string) =>
  useQuery({
    queryKey: ["collections"],
    queryFn: () => getCollection(id),
    retry: false,
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
