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

// Import states
import { workbenchStateActions } from "@/extension/state/workbench";
import { EWorkbenchSectionName } from "@/extension/state/workbench/type";

// Import helpers / utils
import * as StringUtils from "@/shared/utils/string";

// Import types
import type { TItem } from "@/shared/modules/collection/type";

const itemTypeIconByValue: Record<string, any> = {
  LINK: <LinkIcon size={14} />,
  WORD_EXPLANATION: <Book size={14} />,
};

function CollectedLinkTypeIcon({ type }: { type: string }) {
  return itemTypeIconByValue[type];
}

export type TCollectedLinkCardProps = {
  item: TItem;
};

export default function CollectedLinkItemCard(
  props: TCollectedLinkCardProps
) {
  return (
    <Card key={props.item.id} className="rounded-xl">
      <CardHeader>
        <CardTitle>{props.item.content}</CardTitle>
        <CardDescription className="flex items-center gap-2">
          <CollectedLinkTypeIcon type={props.item.type} />
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
                workbenchStateActions.setCurrnetSectionName(
                  EWorkbenchSectionName.SiteCollector
                );
                workbenchStateActions.setSectionDefaultFormData(props.item);
              }}
            >
              <Pencil /> Edit
            </Button>
          </Link>
        </div>
      </CardFooter>
    </Card>
  );
}
