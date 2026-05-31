import { toast } from "sonner";
import { Link } from "react-router";
import { Link as LinkIcon, Book, Eye, Pencil } from "lucide-react";

// Import configs
import { ExtensionRouteConfigs } from "@/shared/config/routes";

// Import components
import { Badge } from "@/shared/components/ui/badge";
import { Button } from "@/shared/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/shared/components/ui/card";

// Import shared/components
import { openConfirmDeleteDialog } from "@/shared/components/confirm-delete-dialog";

// Import shared/modules
import { useDeleteCollectionMutation } from "@/shared/modules/collection/query";

// Import states
import { workbenchStateActions } from "@/extension/state/workbench";
import { EWorkbenchSectionName } from "@/extension/state/workbench/type";

// Import helpers / utils
import * as StringUtils from "@/shared/utils/string";

// Import types
import type { TCollection } from "@/shared/modules/collection/type";

const collectionTypeIconByValue: Record<string, any> = {
  LINK: <LinkIcon size={14} />,
  WORD_EXPLANATION: <Book size={14} />,
};

function CollectionTypeIcon({ type }: { type: string }) {
  return collectionTypeIconByValue[type];
}

export type TCollectionCardProps = {
  collection: TCollection;
};

export default function CollectionCard(props: TCollectionCardProps) {
  const { mutateAsync: deleteCollection, isPending: isCollectionDeleting } =
    useDeleteCollectionMutation();

  const handleDeleteCollection = async function () {
    const toastId = toast.loading("Deleteing collection...", {
      toasterId: "global",
    });

    try {
      await deleteCollection(props.collection.id);
      toast.success("Delete collection successfully", {
        id: toastId,
        toasterId: "global",
      });
    } catch (error) {
      toast.error("Failed to delete collection", {
        id: toastId,
        toasterId: "global",
      });
    }
  };

  return (
    <Card key={props.collection.id} className="rounded-xl">
      <CardHeader>
        <CardTitle>{props.collection.title}</CardTitle>
        <CardDescription className="flex items-center gap-2">
          <CollectionTypeIcon type={props.collection.type} />
          <Badge variant="outline">{props.collection.type}</Badge>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p>{props.collection.description}</p>
      </CardContent>
      <CardFooter className="flex flex-col items-start gap-2">
        <p>Topic: {props.collection.topic}</p>
        <div className="flex gap-2">
          <Link
            to={StringUtils.formatURL(
              ExtensionRouteConfigs.Collection.Prefix,
              props.collection.id,
              ExtensionRouteConfigs.Item.Prefix
            )}
          >
            <Button
              variant="outline"
              size="xs"
              className="rounded-xl"
              disabled={isCollectionDeleting}
            >
              <Eye /> View
            </Button>
          </Link>
          <Link
            to={StringUtils.formatURL(
              ExtensionRouteConfigs.Collection.Path,
              ExtensionRouteConfigs.Item.Path
            )}
          >
            <Button
              variant="outline"
              size="xs"
              className="rounded-xl"
              onClick={() => {
                workbenchStateActions.setCurrnetSectionName(
                  EWorkbenchSectionName.CollectionManagement
                );
                workbenchStateActions.setSectionDefaultFormData(
                  props.collection
                );
              }}
              disabled={isCollectionDeleting}
            >
              <Pencil /> Edit
            </Button>
          </Link>
          <Button
            variant="destructive"
            size="xs"
            className="rounded-xl"
            onClick={() => {
              openConfirmDeleteDialog({
                dialogData: {
                  titleContainer: {
                    label: "Delete collection",
                  },
                  descriptionContainer: {
                    label:
                      "This collection will be permanently deleted from our server.",
                  },
                },
                checkDeleteValue: props.collection.title,
              }).then((ok) => {
                if (!ok) return;
                handleDeleteCollection();
              });
            }}
            disabled={isCollectionDeleting}
          >
            Remove
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
