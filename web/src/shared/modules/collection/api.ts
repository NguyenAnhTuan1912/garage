import { api } from "@/shared/api";

// Import types
import type {
  TCollection,
  TItem,
  TCreateCollection,
  TCollectionType,
  TCreateCollectionItem,
  TUpdateCollection,
  TUpdateCollectionItem,
  TFindManyCollectionsParams,
} from "./type";

export async function getCollectionTypes() {
  const path = "/api/collections/types";
  return api.get<TCollectionType[]>(path, { withCredentials: true });
}

export async function getCollections({
  params,
}: {
  params?: TFindManyCollectionsParams;
}) {
  console.log("Params:", params);
  const path = "/api/collections";
  return api.get<TCollection[]>(path, { params, withCredentials: true });
}

export async function getCollection(id: string) {
  const path = `/api/collections/${id}`;
  return api.get<TCollection>(path, { withCredentials: true });
}

export async function createCollection(data: TCreateCollection) {
  const path = "/api/collections";
  return api.post<TCollection>(path, data, { withCredentials: true });
}

export async function updateCollection({
  id,
  data,
}: {
  id: string;
  data: TUpdateCollection;
}) {
  const path = `/api/collections/${id}`;
  return api.patch<TCollection>(path, data, { withCredentials: true });
}

export async function deleteCollection(id: string) {
  const path = `/api/collections/${id}`;
  return api.delete<boolean>(path, { withCredentials: true });
}

export async function getCollectionItems(collectionId: string) {
  const path = "/api/items";
  return api.get<TItem[]>(path, {
    params: { collectionId },
    withCredentials: true,
  });
}

export async function createCollectionItem(data: TCreateCollectionItem) {
  const path = "/api/items";
  return api.post<TCollection>(path, data, { withCredentials: true });
}

export async function updateCollectionItem({
  id,
  data,
}: {
  id: string;
  data: TUpdateCollectionItem;
}) {
  const path = `/api/items/${id}`;
  return api.patch<TCollection>(path, data, { withCredentials: true });
}

export async function deleteCollectionItem(id: string) {
  const path = `/api/items/${id}`;
  return api.delete<boolean>(path, { withCredentials: true });
}
