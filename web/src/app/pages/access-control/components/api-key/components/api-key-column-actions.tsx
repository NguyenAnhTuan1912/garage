// Import components
import { Button } from "@/shared/components/ui/button";
import { useApiKeyViewDialogState } from "./api-key-view-dialog";

// Import types
import type { CellContext } from "@tanstack/react-table";
import type { TApiKey } from "@/shared/modules/auth/type";

export default function ApiKeyColumnActions({
  row,
}: CellContext<TApiKey, any>) {
  const { open, setData } = useApiKeyViewDialogState();
  const apiKey = row.original;

  return (
    <div className="flex items-center">
      <Button
        variant="secondary"
        onClick={() => {
          open();
          setData(apiKey);
        }}
      >
        View
      </Button>
    </div>
  );
}
