import { create } from "zustand";

import { EWorkbenchSectionName } from "./type";

// Import types
import type { TWorkbenchState, TWorkbenchStateActions } from "./type";

export const useWorkbenchState = create<TWorkbenchState>(() => {
  return {
    currentSectionName: EWorkbenchSectionName.CollectionManagement,
    sectionDefaultFormData: null
  }
});

export const workbenchStateActions: TWorkbenchStateActions = {
  setCurrnetSectionName(name) {
    useWorkbenchState.setState((state) => {
      return {
        ...state,
        currentSectionName: name
      }
    });
  },

  setSectionDefaultFormData(data) {
    useWorkbenchState.setState((state) => {
      return {
        ...state,
        sectionDefaultFormData: data
      }
    });
  },

  reset() {
    useWorkbenchState.setState((state) => {
      return {
        ...state,
        currentSectionName: EWorkbenchSectionName.CollectionManagement,
        sectionDefaultFormData: null
      }
    });
  }
};