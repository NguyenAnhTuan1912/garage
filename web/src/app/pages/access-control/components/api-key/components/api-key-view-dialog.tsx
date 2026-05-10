import { useEffect } from "react";
import { Key } from "lucide-react";
import { create } from "zustand";
import { toast } from "sonner";

// Import components
import {
  Dialog,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogContent,
  DialogFooter,
} from "@/shared/components/ui/dialog";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { Switch } from "@/components/ui/switch";

// Import modules
import {
  useUpdateApiKeyMutation,
  useDeleteApiKeyMutation,
} from "@/shared/modules/auth/query";

// Import helpers / utils
import * as DateTimeUtils from "@/utils/datetime";

// Import types
import type { TApiKey } from "@/shared/modules/auth/type";
import { Button } from "@/shared/components/ui/button";

export type TApiKeyViewDialogState = {
  isOpen: boolean;
  data: TApiKey | null;
  open(): void;
  close(): void;
  setOpenStatus(status: boolean): void;
  setData(data: TApiKey | null): void;
};

export const useApiKeyViewDialogState = create<TApiKeyViewDialogState>(
  (setState) => {
    return {
      isOpen: false,
      data: null,
      open() {
        setState((state) => ({ ...state, isOpen: true }));
      },
      close() {
        setState((state) => ({ ...state, isOpen: false }));
      },
      setOpenStatus(status) {
        setState((state) => ({ ...state, isOpen: status }));
      },
      setData(data) {
        setState((state) => ({ ...state, data }));
      },
    };
  }
);

function EmptyApiKeyViewDialogContent() {
  return (
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <Key />
        </EmptyMedia>
        <EmptyTitle>Empty Information</EmptyTitle>
        <EmptyDescription>
          This api key doesn't have any information yet.
        </EmptyDescription>
      </EmptyHeader>
    </Empty>
  );
}

function ApiKeyViewDialogContent({ apiKey }: { apiKey: TApiKey }) {
  const { mutateAsync: updateApiKey } = useUpdateApiKeyMutation();
  const { mutateAsync: deleteApiKey } = useDeleteApiKeyMutation();
  const { close, setData } = useApiKeyViewDialogState();

  const handleUpdateApiKeyStatus = async function (
    id: string,
    isActive: boolean
  ) {
    const toastId = toast.loading("Updating api Key status ...", {
      toasterId: "global",
    });
    try {
      const res = await updateApiKey({ id, isActive });
      const data = res.data?.data;
      toast.success("Update api key status successfully", {
        id: toastId,
        toasterId: "global",
      });
      setData(data ?? null);
    } catch (error) {
      toast.error("Failed to update api key status", {
        id: toastId,
        toasterId: "global",
      });
    }
  };

  const handleDeleteApiKeyStatus = async function (id: string) {
    const toastId = toast.loading("Deleting api Key ...", {
      toasterId: "global",
    });
    try {
      await deleteApiKey(id);
      toast.success("Update api key successfully", {
        id: toastId,
        toasterId: "global",
      });
      setData(null);
      close();
    } catch (error) {
      toast.error("Failed to delete api key", {
        id: toastId,
        toasterId: "global",
      });
    }
  };

  return (
    <div className="flex w-full flex-col gap-3">
      <div className="flex w-full justify-between">
        <p>Status</p>
        <Switch
          checked={apiKey.isActive}
          defaultChecked={apiKey.isActive}
          onCheckedChange={(status) => {
            handleUpdateApiKeyStatus(apiKey.id, status);
          }}
        />
      </div>
      <div className="flex w-full justify-between">
        <p>Created Date</p>
        <p>{DateTimeUtils.getDateTimeStr(apiKey.createdAt)}</p>
      </div>
      <div className="flex w-full justify-between">
        <p>Updated Date</p>
        <p>{DateTimeUtils.getDateTimeStr(apiKey.updatedAt)}</p>
      </div>
      <Button
        variant="destructive"
        onClick={() => {
          handleDeleteApiKeyStatus(apiKey.id);
        }}
      >
        Delete Api Key
      </Button>
    </div>
  );
}

export default function ApiKeyViewDialog() {
  const { isOpen, data, setOpenStatus, setData } = useApiKeyViewDialogState();

  useEffect(() => {
    if (!isOpen) setData(null);
  }, []);

  return (
    <Dialog open={isOpen} onOpenChange={setOpenStatus}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Api Key</DialogTitle>
          <DialogDescription>Details information of Api Key</DialogDescription>
        </DialogHeader>
        {data ? (
          <ApiKeyViewDialogContent apiKey={data} />
        ) : (
          <EmptyApiKeyViewDialogContent />
        )}
        <DialogFooter>
          The api key is not shown here. So make sure that you saved it to
          another place.
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
