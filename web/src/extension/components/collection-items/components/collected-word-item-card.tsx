import { Link } from "react-router";
import { toast } from "sonner";
import { Link as LinkIcon, Book, Pencil } from "lucide-react";

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

// Import helpers / utils
import * as StringUtils from "@/shared/utils/string";

// Import shared/components
import { openConfirmDeleteDialog } from "@/shared/components/confirm-delete-dialog";

// Import shared/modules
import { useDeleteCollectionItemMutation } from "@/shared/modules/collection/query";

// Import types
import type { TItem } from "@/shared/modules/collection/type";

const itemTypeIconByValue: Record<string, any> = {
  LINK: <LinkIcon size={14} />,
  WORD_EXPLANATION: <Book size={14} />,
};

function CollectedWordTypeIcon({ type }: { type: string }) {
  return itemTypeIconByValue[type];
}

export type TCollectedWordCardProps = {
  item: TItem;
};

export default function CollectedWordItemCard(props: TCollectedWordCardProps) {
  const {
    mutateAsync: deleteCollectionItem,
    isPending: isCollectionItemDeleting,
  } = useDeleteCollectionItemMutation();

  const handleDeleteCollection = async function () {
    const toastId = toast.loading("Deleteing collection...", {
      toasterId: "global",
    });

    try {
      await deleteCollectionItem(props.item.id);
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
    <Card key={props.item.id} className="rounded-xl">
      <CardHeader>
        <CardTitle>{props.item.content}</CardTitle>
        <CardDescription className="flex items-center gap-2">
          <CollectedWordTypeIcon type={props.item.type} />
          <Badge variant="outline">{props.item.type}</Badge>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p>{props.item.description}</p>
      </CardContent>
      <CardFooter className="flex flex-col items-start gap-2">
        <div className="flex gap-2">
          {/* <Link
            to={StringUtils.formatURL(
              ExtensionRouteConfigs.Collection.Path,
              ExtensionRouteConfigs.Item.Prefix
            )}
          >
            <Button variant="outline" size="xs" className="rounded-xl">
              <Eye /> View
            </Button>
          </Link> */}
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
                openConfirmDeleteDialog({
                  dialogData: {
                    titleContainer: {
                      label: "Delete word",
                    },
                    descriptionContainer: {
                      label:
                        "This word will be permanently deleted from our server.",
                    },
                  },
                }).then((ok) => {
                  if (!ok) return;
                  handleDeleteCollection();
                });
              }}
              disabled={isCollectionItemDeleting}
            >
              <Pencil /> Edit
            </Button>
          </Link>
        </div>
      </CardFooter>
    </Card>
  );
}
