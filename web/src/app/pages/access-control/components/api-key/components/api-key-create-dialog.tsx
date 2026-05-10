import { useState, useEffect } from "react";
import { toast } from "sonner";
import { AlertCircle, Copy, Eye, EyeClosed } from "lucide-react";

// Import components
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/shared/components/ui/button";
import {
  Dialog,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogContent,
  DialogTrigger,
  DialogClose,
} from "@/shared/components/ui/dialog";

// Import modules
import { useCreateApiKeyMutation } from "@/shared/modules/auth/query";

// Import types
import type { TApiKey } from "@/shared/modules/auth/type";

function EmptyApiKeySection() {
  return (
    <div className="rounded-xl border px-3 py-3">
      Your api key will be shown here
    </div>
  );
}

function ApiKeySection({ apiKey }: { apiKey: TApiKey }) {
  const [isShown, setIsShown] = useState(false);
  const value = isShown ? apiKey.value : "********";

  const handleCopy = async function () {
    const toastId = toast.loading("Copying api key...", {
      toasterId: "global",
    });

    try {
      await navigator.clipboard.writeText(apiKey.value!);
      toast.success("Api key copied", { id: toastId, toasterId: "global" });
    } catch (err) {
      toast.error("Failed to copy api key", {
        id: toastId,
        toasterId: "global",
      });
    }
  };

  return (
    <>
      <div className="flex items-center justify-between gap-2 rounded-xl border px-3 py-3">
        <div className="w-0 min-w-0 flex-1 overflow-hidden">
          <p className="truncate">{value}</p>
        </div>
        <div className="flex shrink-0 items-center gap-1">
          <Button
            className="rounded-lg"
            variant="outline"
            size="icon"
            onClick={handleCopy}
          >
            <Copy />
          </Button>
          <Button
            className="rounded-lg"
            variant="outline"
            size="icon"
            onClick={() => {
              if (isShown) {
                setIsShown(false);
              } else {
                setIsShown(true);
              }
            }}
          >
            {isShown ? <EyeClosed /> : <Eye />}
          </Button>
        </div>
      </div>
      <Alert variant="destructive" className="max-w-md">
        <AlertCircle />
        <AlertTitle>Api Key will be removed</AlertTitle>
        <AlertDescription>
          Please copy your api key and store it in a safe place, because after
          you close this dialog, you cannot see this key anymore.
        </AlertDescription>
      </Alert>
    </>
  );
}

const mockApiKey: TApiKey = {
  id: "lkdfjalksjdlfjkalskdf",
  value: "lkfjalskdjflakjsdlkfjiouqwoeiruoqiwuer",
  isActive: true,
  expireAt: "ljkhalksjdflk",
  createdAt: "ljkhalksjdflk",
  updatedAt: "ljkhalksjdflk",
};

export default function ApiKeyCreateDialog() {
  const [isOpen, open] = useState(false);
  const [apiKey, setApiKey] = useState<TApiKey | null>(null);
  const { mutateAsync: createApiKey, isPending } = useCreateApiKeyMutation();

  const handleCreateApiKey = async function () {
    const toastId = toast.loading("Creating new api key...", {
      toasterId: "global",
    });

    try {
      const res = await createApiKey();
      const data = res.data.data;

      if (!data) throw new Error("Cannot create new api key");

      toast.success("Create new api key successfully", {
        id: toastId,
        toasterId: "global",
      });
      setApiKey(data);
    } catch (error) {
      toast.error("Failed to create new api key", {
        id: toastId,
        toasterId: "global",
      });
    }
  };

  useEffect(() => {
    return function() {
      if (!isOpen) setApiKey(null);
    }
  }, [isOpen]);

  return (
    <Dialog open={isOpen} onOpenChange={open}>
      <DialogTrigger asChild>
        <Button>Create api key</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create your api key</DialogTitle>
          <DialogDescription>
            Integrate this api key to Garage Tools
          </DialogDescription>
        </DialogHeader>
        <div className="flex w-full flex-col gap-3">
          {apiKey ? <ApiKeySection apiKey={apiKey} /> : <EmptyApiKeySection />}
          {apiKey ? (
            <DialogClose asChild>
              <Button variant="secondary">Ok</Button>
            </DialogClose>
          ) : (
            <Button disabled={isPending} onClick={handleCreateApiKey}>
              Create new
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
