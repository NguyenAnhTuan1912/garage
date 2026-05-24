export enum EWorkbenchSectionName {
  CollectionManagement = "collection-management",
  SiteCollector = "site-collector",
  WordCollector = "word-collector",
  NoteWriter = "note-writer",
  Other = "other"
};

export type TWorkbenchState = {
  currentSectionName: string;
  sectionDefaultFormData: any;
};

export type TWorkbenchStateActions = {
  setCurrnetSectionName(name: string): void;
  setSectionDefaultFormData(data: any): void;
  reset(): void;
};