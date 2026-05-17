import { api } from "@/shared/api";

// Import types
import type {
  TCollection,
  TItem,
  TCreateCollection,
  TCollectionType,
} from "./type";

export async function getCollectionTypes() {
  const path = "/api/collections/types";
  return api.get<TCollectionType[]>(path, { withCredentials: true });
}

export async function getCollections() {
  const path = "/api/collections";
  return api.get<TCollection[]>(path, { withCredentials: true });
}

export async function getCollection(id: string) {
  const path = `/api/collections/${id}`;
  return api.get<TCollection>(path, { withCredentials: true });
}

export async function createCollection(data: TCreateCollection) {
  const path = "/api/collections";
  return api.post<TCollection>(path, data, { withCredentials: true });
}
