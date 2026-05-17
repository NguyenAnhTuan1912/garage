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

export type TCreateCollection = Omit<TCollection, "id">;

export type TUpdateCollection = Partial<TCreateCollection>;

export type TCreateItem = Omit<TItem, "id">;

export type TUpdateItem = Partial<TItem>;
