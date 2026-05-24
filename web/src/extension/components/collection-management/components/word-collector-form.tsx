import { useForm } from "@tanstack/react-form";
import { toast } from "sonner";
import * as z from "zod";

// Import components
import { Button } from "@/shared/components/ui/button";
import {
  Field,
  FieldLabel,
  FieldSeparator,
  FieldError,
} from "@/shared/components/ui/field";
import { Input } from "@/shared/components/ui/input";
import { Textarea } from "@/shared/components/ui/textarea";
import { Spinner } from "@/shared/components/ui/spinner";
import { Separator } from "@/shared/components/ui/separator";
import { createSearchableSelectWithQuery } from "@/shared/components/searchable-select-with-query";

// Import modules
import {
  useCollectionsQuery,
  useCollectionTypesQuery,
  useCreateCollectionItemMutation,
} from "@/shared/modules/collection/query";

// Import states
import { useWorkbenchState } from "@/extension/state/workbench";

// Import types
import type { AxiosError } from "axios";
import type {
  TCollection,
  TCreateCollectionItem,
} from "@/shared/modules/collection/type";

const SearchableSelectWithQuery = createSearchableSelectWithQuery(useCollectionsQuery);

export const createCollectionItemSchema = z.object({
  collectionId: z.uuid(),
  type: z.string({ error: "Collection type is required" }),
  content: z
    .string({ error: "Content type is required" })
    .min(1, "Length of content must be more than 1"),
  description: z.string().optional(),
});

export default function WordCollectorForm() {
  const { data: collectionTypesRes, isPending } = useCollectionTypesQuery();
  const { mutateAsync: createCollectionItem } =
    useCreateCollectionItemMutation();
  const { sectionDefaultFormData } = useWorkbenchState();

  const collectionTypes = collectionTypesRes?.data.data;

  const buttonLabel = sectionDefaultFormData ? "Edit" : "Create";
  const pendingButtonLabel = sectionDefaultFormData ? "Editting" : "Creating";

  const form = useForm({
    defaultValues: {
      collectionId: sectionDefaultFormData
        ? sectionDefaultFormData.collectionId
        : "",
      type: sectionDefaultFormData ? sectionDefaultFormData.type : "",
      description: sectionDefaultFormData
        ? sectionDefaultFormData.description
        : "",
      content: sectionDefaultFormData ? sectionDefaultFormData.content : "",
    } as TCreateCollectionItem,
    validators: {
      onSubmit: createCollectionItemSchema,
    },
    onSubmit: async ({ value }) => {
      try {
        value.type = collectionTypes?.find(type => type.value === "WORD_EXPLANATION")?.value || "";

        await createCollectionItem(value);

        toast.success("Create collection item successfully", {
          toasterId: "global",
        });

        form.reset();
      } catch (e) {
        const err = e as AxiosError;
        const data = err.response?.data as any;

        toast.error(data?.error?.message ?? "Failed to create new collection item", {
          toasterId: "global",
        });
      }
    },
  });

  return (
    <form
      className="flex w-full flex-col gap-2"
      onSubmit={(e) => {
        e.preventDefault();
        form.handleSubmit(e);
      }}
    >
      <form.Field
        name="collectionId"
        children={(field) => {
          const isInvalid =
            field.state.meta.isTouched && !field.state.meta.isValid;

          return (
            <Field data-invalid={isInvalid}>
              <FieldLabel htmlFor={field.name}>
                <p>
                  Collection<sup className="text-red-500">*</sup>
                </p>
              </FieldLabel>
              <SearchableSelectWithQuery<TCollection>
                field={field}
                isInvalid={isInvalid}
                getItemKey={(item) => item.id}
                getItemSearchValue={(item) => item.title}
                getItemValue={(item) => item.id}
                buildQueryParams={(text) => ({ title: text })}
              />
              {isInvalid && <FieldError errors={field.state.meta.errors} />}
            </Field>
          );
        }}
      />

      <Separator className="my-2" />

      <form.Field
        name="content"
        children={(field) => {
          const isInvalid =
            field.state.meta.isTouched && !field.state.meta.isValid;

          return (
            <Field data-invalid={isInvalid}>
              <FieldLabel htmlFor={field.name}>
                <p>
                  Content<sup className="text-red-500">*</sup>
                </p>
              </FieldLabel>
              <Input
                className="rounded-lg text-sm"
                id={field.name}
                name={field.name}
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
                disabled={isPending}
                placeholder="Item's content..."
                aria-invalid={isInvalid}
                autoComplete="off"
              />
              {isInvalid && <FieldError errors={field.state.meta.errors} />}
            </Field>
          );
        }}
      />

      <form.Field
        name="type"
        children={(field) => {
          const isInvalid =
            field.state.meta.isTouched && !field.state.meta.isValid;

          return (
            <Field data-invalid={isInvalid}>
              <FieldLabel htmlFor={field.name}>
                <p>
                  Type<sup className="text-red-500">*</sup>
                </p>
              </FieldLabel>
              <Input
                className="rounded-lg text-sm"
                id={field.name}
                name={field.name}
                onBlur={field.handleBlur}
                value={collectionTypes?.find(type => type.value === "WORD_EXPLANATION")?.value || ""}
                onChange={(e) => field.handleChange(e.target.value)}
                disabled={true}
                aria-invalid={isInvalid}
                autoComplete="off"
              />
              {isInvalid && <FieldError errors={field.state.meta.errors} />}
            </Field>
          );
        }}
      />

      <form.Field
        name="description"
        children={(field) => {
          const isInvalid =
            field.state.meta.isTouched && !field.state.meta.isValid;

          return (
            <Field data-invalid={isInvalid}>
              <FieldLabel className="text-gray-500" htmlFor={field.name}>
                Description {"(Optional)"}
              </FieldLabel>
              <Textarea
                className="rounded-lg text-sm"
                id={field.name}
                name={field.name}
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
                disabled={isPending}
                placeholder="Title of collection ..."
                aria-invalid={isInvalid}
                autoComplete="off"
              />
              {isInvalid && <FieldError errors={field.state.meta.errors} />}
            </Field>
          );
        }}
      />

      <FieldSeparator />

      <div>
        <Button className="w-full" type="submit">
          {isPending ? (
            <>
              <Spinner /> {pendingButtonLabel}
            </>
          ) : (
            buttonLabel
          )}
        </Button>
      </div>
    </form>
  );
}
