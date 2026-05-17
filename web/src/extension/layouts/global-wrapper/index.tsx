import { AlertCircle } from "lucide-react";

// Import components
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/shared/components/ui/alert";
import Header from "@/extension/components/header";

// Import hooks
import { useApiKey } from "@/extension/hooks/use-api-key";

// Import types
import type { PropsWithChildren } from "react";

export type TGlobalWrapperLayout = {} & PropsWithChildren;

export default function GlobalWrapperLayout(props: TGlobalWrapperLayout) {
  const { isValid } = useApiKey();

  return (
    <>
      <Header />
      {!isValid && (
        <div className="p-2">
          <Alert variant="destructive">
            <AlertCircle />
            <AlertTitle>Invalid API Key</AlertTitle>
            <AlertDescription>
              Reset your api key.
            </AlertDescription>
          </Alert>
        </div>
      )}
      <section className="p-2 text-sm">{props.children}</section>
    </>
  );
}
