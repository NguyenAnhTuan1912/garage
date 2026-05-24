// Import types
import type { TFindManyParams } from "@/shared/types/api";

export type TCollection = {
  id: string;
  type: string;
  title: string;
  description?: string;
  topic?: string;
  photo?: string;
};

export type TItem = {
  id: string;
  collectionId: string;
  type: string;
  description?: string;
  content: string;
};

export type TCollectionType = {
  label: string;
  value: string;
};

export type TFindManyCollectionsParams = {
  title?: string;
  owner?: string;
  topic?: string;
  type?: string;
} & TFindManyParams;

export type TCreateCollection = Omit<TCollection, "id">;

export type TCreateCollectionItem = Omit<TItem, "id">;

export type TUpdateCollection = Partial<TCreateCollection>;

export type TUpdateCollectionItem = Partial<
  Omit<TCreateCollectionItem, "collectionId">
> & {
  collectionId: string;
};
