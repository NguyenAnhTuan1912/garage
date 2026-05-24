// Import components
import CollectedLinkItemCard from "./collected-link-item-card";
import CollectedWordItemCard from "./collected-word-item-card";

// Import types
import type { TItem } from "@/shared/modules/collection/type";

export type TCollectedWordCardProps = {
  item: TItem;
};

export default function CollectedItemCard(props: TCollectedWordCardProps) {
  if (props.item.type === "LINK") {
    return <CollectedLinkItemCard item={props.item} />;
  }

  return <CollectedWordItemCard item={props.item} />;
}
