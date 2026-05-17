import { useForm } from "@tanstack/react-form";
import { toast } from "sonner";
import * as z from "zod";
import { Key } from "lucide-react";

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
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Card, CardContent } from "@/shared/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldLabel,
  FieldError,
} from "@/shared/components/ui/field";
import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";

// Import cores
import { useTestConnectionWithApiKeyMutation } from "@/shared/modules/auth/query";

// Import hooks
import { useApiKey } from "@/extension/hooks/use-api-key";

export const apiKeySchema = z.object({
  apiKey: z.string(),
});

// Import types
import type { AxiosError } from "axios";

export default function ApiKey() {
  const { mutateAsync: testConnectionWithApiKey, isPending } =
    useTestConnectionWithApiKeyMutation();
  const { apiKey, setApiKey, clearApiKey } = useApiKey();

  const form = useForm({
    defaultValues: {
      apiKey: "",
    },
    validators: {
      onSubmit: apiKeySchema,
    },
    onSubmit: async ({ value }) => {
      try {
        setApiKey(value.apiKey);
        await testConnectionWithApiKey();

        toast.success("Your api key is valid", { toasterId: "global" });
      } catch (e) {
        const err = e as AxiosError;
        const data = err.response?.data as any;

        console.log("Err:", err);

        toast.error(data?.error?.message ?? "Invalid api key", {
          toasterId: "global",
        });
      }
    },
  });

  return (
    <div className="w-full">
      <Card className="rounded-xl">
        <CardContent>
          <form
            className="flex flex-col gap-3"
            onSubmit={(e) => {
              e.preventDefault();
              form.handleSubmit(e);
            }}
          >
            <form.Field
              name="apiKey"
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;

                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>API Key</FieldLabel>
                    {apiKey ? (
                      <Input
                        disabled
                        value={apiKey.slice(0, 5) + "*".repeat(apiKey.length)}
                        className="rounded-lg"
                      />
                    ) : (
                      <Input
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        disabled={isPending}
                        aria-invalid={isInvalid}
                        autoComplete="off"
                        type="password"
                        placeholder="sk-..."
                        className="rounded-lg"
                      />
                    )}

                    <FieldDescription>
                      Your API key is encrypted and stored securely.
                    </FieldDescription>
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            />
            <div className="flex w-full flex-col gap-2">
              <Button className="w-full rounded-lg" type="submit">
                <Key /> Test connection
              </Button>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button
                    className="w-full rounded-lg"
                    variant="destructive"
                    type="button"
                  >
                    Clear key
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Are you absolutely sure?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. This will permanently delete
                      your api key from our servers.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={() => {
                        clearApiKey();
                      }}
                    >
                      Continue
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
