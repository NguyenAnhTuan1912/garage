import { useParams } from "react-router";

// Import components
import { Button } from "@/shared/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import { Input } from "@/shared/components/ui/input";
import { Separator } from "@/shared/components/ui/separator";
import { ScrollArea } from "@/shared/components/ui/scroll-area";
import SectionHeader from "@/shared/components/section-header";
import EmptyNoData from "@/shared/components/ui/empty-no-data";
import CollectedItemCard from "./components/collected-item-card";

// Import hooks
import { useCollectionItemsQuery } from "@/shared/modules/collection/query";

export default function CollectionItems() {
  const { collectionId } = useParams();
  const { data: res } = useCollectionItemsQuery(collectionId || "");
  const items = res?.data.data;

  return (
    <div>
      <SectionHeader
        className="px-2"
        title="Your collected items"
        description="All of your collected items will be showed here."
        size="small"
      />

      <ButtonGroup className="mt-2 w-full px-2">
        <Input id="input-button-group" placeholder="Type to search..." />
        <Button variant="outline">Search</Button>
      </ButtonGroup>

      <Separator className="mt-3 mb-2" />

      {items ? (
        <ScrollArea className="h-full w-full rounded-md">
          <div className="flex flex-col gap-3 px-2 py-1">
            {items?.map((item) => (
              <CollectedItemCard key={item.id} item={item} />
            ))}
          </div>
        </ScrollArea>
      ) : (
        <EmptyNoData />
      )}
    </div>
  );
}
