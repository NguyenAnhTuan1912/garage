import { useState } from "react";
import { create } from "zustand";

// Import components
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Input } from "./ui/input";
import { Separator } from "./ui/separator";

// Import helpers / utils
import { updateObject } from "../utils/object";

export type TTConfirmDeleteDialogData = {
  titleContainer?: {
    label?: string;
  };
  descriptionContainer?: {
    label?: string;
  };
  cancelButton?: {
    label?: string;
  };
  actionButton?: {
    label?: string;
  };
};

export type TConfirmDeleteDialogState = {
  isOpen: boolean;
  canDelete: boolean;
  dialogData?: TTConfirmDeleteDialogData;
  checkDeleteValue?: string;
  _resolve?(value: boolean): void;
};

export type TConfirmDeleteDialogStateActions = {
  setIsOpen(status: boolean): void;
  setDialogData(data: TTConfirmDeleteDialogData): void;
  setCheckDeleteValue(value: string): void;
  _setResolveFn(resolve?: (value: boolean) => void): void;
  reset(): void;
};

function getInitialState(): TConfirmDeleteDialogState {
  return {
    isOpen: false,
    canDelete: false,
    dialogData: {},
    checkDeleteValue: undefined,
    _resolve: undefined,
  };
}

export const useConfirmDeleteDialogState = create<TConfirmDeleteDialogState>(
  () => getInitialState()
);

export const confirmDeleteDialogActions: TConfirmDeleteDialogStateActions = {
  setIsOpen(status) {
    useConfirmDeleteDialogState.setState((state) => ({
      ...state,
      isOpen: status,
    }));
  },

  setCheckDeleteValue(value) {
    useConfirmDeleteDialogState.setState((state) => ({
      ...state,
      checkDeleteValue: value,
    }));
  },

  setDialogData(data) {
    useConfirmDeleteDialogState.setState((state) => ({
      ...state,
      dialogData: updateObject(state.dialogData, data),
    }));
  },

  _setResolveFn(resolve) {
    useConfirmDeleteDialogState.setState((state) => ({
      ...state,
      _resolve: resolve,
    }));
  },

  reset() {
    useConfirmDeleteDialogState.setState(() => {
      const initialState = getInitialState();
      return { ...initialState };
    });
  },
};

export async function openConfirmDeleteDialog({
  checkDeleteValue,
  dialogData,
}: {
  checkDeleteValue?: string;
  dialogData?: TTConfirmDeleteDialogData;
}) {
  return new Promise<boolean>((resolve) => {
    confirmDeleteDialogActions.setIsOpen(true);
    confirmDeleteDialogActions._setResolveFn(resolve);

    if (dialogData) confirmDeleteDialogActions.setDialogData(dialogData);

    if (checkDeleteValue)
      confirmDeleteDialogActions.setCheckDeleteValue(checkDeleteValue);
  });
}

export default function ConfirmDeleteDialog() {
  const { isOpen, dialogData, checkDeleteValue, _resolve } =
    useConfirmDeleteDialogState();
  const [isDeleteAllow, setIsDeleteAllow] = useState(
    Boolean(checkDeleteValue || true)
  );

  const titleLabel =
    dialogData?.titleContainer?.label ?? "Are you absolutely sure?";
  const descriptionLabel =
    dialogData?.descriptionContainer?.label ??
    "This action cannot be undone. This will permanently delete this resource from our servers.";
  const cancleButtonLabel = dialogData?.cancelButton?.label ?? "Cancel";
  const actionButtonLabel = dialogData?.actionButton?.label ?? "Continue";

  return (
    <AlertDialog
      open={isOpen}
      onOpenChange={(status) => {
        if (!status) {
          confirmDeleteDialogActions.reset();
        }
        confirmDeleteDialogActions.setIsOpen(status);
      }}
    >
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{titleLabel}</AlertDialogTitle>
          <AlertDialogDescription>{descriptionLabel}</AlertDialogDescription>
        </AlertDialogHeader>

        {checkDeleteValue && (
          <>
            <Separator />
            <div>
              <p>Confirm delete</p>
              <Input
                className="rounded-lg text-xs"
                placeholder={checkDeleteValue}
                onChange={(e) => {
                  const value = e.target.value;
                  if (value === checkDeleteValue) {
                    setIsDeleteAllow(true);
                  } else {
                    setIsDeleteAllow(false);
                  }
                }}
              />
            </div>
            <Separator />
          </>
        )}

        <AlertDialogFooter>
          <AlertDialogCancel
            className="rounded-lg"
            onClick={() => {
              if (_resolve) _resolve(false);
            }}
          >
            {cancleButtonLabel}
          </AlertDialogCancel>
          <AlertDialogAction
            className="rounded-lg"
            disabled={!isDeleteAllow}
            onClick={() => {
              if (_resolve) _resolve(true);
            }}
          >
            {actionButtonLabel}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
