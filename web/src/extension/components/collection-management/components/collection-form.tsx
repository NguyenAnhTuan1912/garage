import { useEffect } from "react";
import { AxiosError } from "axios";
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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select";
import { Textarea } from "@/shared/components/ui/textarea";
import { Spinner } from "@/shared/components/ui/spinner";

// Import modules
import {
  useCollectionTypesQuery,
  useCreateCollectionMutation,
  useUpdateCollectionMutation,
} from "@/shared/modules/collection/query";

// Import states
import { useWorkbenchState } from "@/extension/state/workbench";

// Import types
import type {
  TCreateCollection,
  TUpdateCollection,
} from "@/shared/modules/collection/type";
import type { TApiHandlerOptions } from "@/shared/types/api-handler";

export const createCollectionSchema = z.object({
  type: z.string({ error: "Collection type is required" }),
  title: z
    .string({ error: "Title type is required" })
    .min(1, "Length of title must be more than 1"),
  description: z.string().optional(),
  topic: z.string().optional(),
  photo: z.string().optional(),
});

export default function CollectionForm() {
  const { data: collectionTypesRes, isPending } = useCollectionTypesQuery();
  const { mutateAsync: createCollection } = useCreateCollectionMutation();
  const { mutateAsync: updateCollection } = useUpdateCollectionMutation();
  const { sectionDefaultFormData } = useWorkbenchState();

  const collectionTypes = collectionTypesRes?.data.data;
  const buttonLabel = sectionDefaultFormData ? "Edit" : "Create";
  const pendingButtonLabel = sectionDefaultFormData ? "Editting" : "Creating";
  const isInEditMode = Boolean(sectionDefaultFormData);

  const handleFormSubmit = async function (
    fn: any,
    options: TApiHandlerOptions
  ) {
    const toastId = toast.loading(options.toast?.loadingMsg);

    try {
      await fn();

      toast.success(options.toast?.successMsg, {
        id: toastId,
        toasterId: "global",
      });
    } catch (e) {
      if (e instanceof AxiosError) {
        const err = e as AxiosError;
        const data = err.response?.data as any;

        toast.error(data?.error?.message ?? options.toast?.errorMsg, {
          id: toastId,
          toasterId: "global",
        });
      }
    }
  };

  const form = useForm({
    defaultValues: {
      title: sectionDefaultFormData?.title || "",
      type: sectionDefaultFormData?.type || "",
      description: sectionDefaultFormData?.description ?? "",
      topic: sectionDefaultFormData?.topic ?? "",
      photo: sectionDefaultFormData?.photo ?? "",
    } as TCreateCollection | TUpdateCollection,
    validators: {
      onSubmit: createCollectionSchema,
    },
    onSubmit: async ({ value }) => {
      if (isInEditMode) {
        handleFormSubmit(
          async () =>
            updateCollection({
              id: sectionDefaultFormData.id,
              data: value as TUpdateCollection,
            }),
          {
            toast: {
              loadingMsg: "Updating collection ...",
              successMsg: "Updated collection successfully",
              errorMsg: "Failed to update collection",
            },
          }
        );
      } else {
        handleFormSubmit(
          async () => createCollection(value as TCreateCollection),
          {
            toast: {
              loadingMsg: "Creating collection ...",
              successMsg: "Created collection successfully",
              errorMsg: "Failed to create collection",
            },
          }
        );
      }

      form.reset();
    },
  });

  useEffect(() => {
    return function () {
      form.reset();
    };
  }, []);

  return (
    <form
      className="flex w-full flex-col gap-2"
      onSubmit={(e) => {
        e.preventDefault();
        form.handleSubmit(e);
      }}
    >
      <form.Field
        name="title"
        children={(field) => {
          const isInvalid =
            field.state.meta.isTouched && !field.state.meta.isValid;

          return (
            <Field data-invalid={isInvalid}>
              <FieldLabel htmlFor={field.name}>
                <p>
                  Title<sup className="text-red-500">*</sup>
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
                placeholder="Title of collection ..."
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
              <Select
                name={field.name}
                value={field.state.value}
                onValueChange={field.handleChange}
                disabled={isPending}
              >
                <SelectTrigger
                  id={field.name}
                  className="rounded-lg text-sm"
                  aria-invalid={isInvalid}
                >
                  <SelectValue placeholder="Collection type" />
                </SelectTrigger>
                <SelectContent className="rounded-lg text-sm">
                  <SelectGroup>
                    {collectionTypes &&
                      collectionTypes.map((type) => (
                        <SelectItem
                          key={type.value}
                          className="rounded-lg text-sm"
                          value={type.value}
                        >
                          {type.label}
                        </SelectItem>
                      ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
              {isInvalid && <FieldError errors={field.state.meta.errors} />}
            </Field>
          );
        }}
      />

      <form.Field
        name="topic"
        children={(field) => {
          const isInvalid =
            field.state.meta.isTouched && !field.state.meta.isValid;

          return (
            <Field data-invalid={isInvalid}>
              <FieldLabel className="text-gray-500" htmlFor={field.name}>
                Topic {"(Optional)"}
              </FieldLabel>
              <Input
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

      <form.Field
        name="photo"
        children={(field) => {
          const isInvalid =
            field.state.meta.isTouched && !field.state.meta.isValid;

          return (
            <Field data-invalid={isInvalid}>
              <FieldLabel className="text-gray-500" htmlFor={field.name}>
                Photo's URL {"(Optional)"}
              </FieldLabel>
              <Input
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
