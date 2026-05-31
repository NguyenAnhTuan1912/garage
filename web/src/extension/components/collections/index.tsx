// Import components
import { Button } from "@/shared/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import { Input } from "@/shared/components/ui/input";
import { Separator } from "@/shared/components/ui/separator";
import { ScrollArea } from "@/shared/components/ui/scroll-area";
import SectionHeader from "@/shared/components/section-header";
import EmptyNoData from "@/shared/components/ui/empty-no-data";
import CollectionCard from "./components/collection-card";

// Import hooks
import { useCollectionsQuery } from "@/shared/modules/collection/query";

export default function Collections() {
  const { data: res } = useCollectionsQuery();
  const collections = res?.data.data;

  return (
    <div>
      <SectionHeader
        className="px-2"
        title="Your collections"
        description="All of your collections will be showed here."
        size="small"
      />

      <ButtonGroup className="mt-2 w-full px-2">
        <Input id="input-button-group" placeholder="Type to search..." />
        <Button variant="outline">Search</Button>
      </ButtonGroup>

      <Separator className="mt-3 mb-2" />

      {collections && collections.length > 0 ? (
        <ScrollArea className="h-full w-full rounded-md">
          <div className="flex flex-col gap-3 px-2 py-1">
            {collections?.map((collection) => (
              <CollectionCard key={collection.id} collection={collection} />
            ))}
          </div>
        </ScrollArea>
      ) : (
        <EmptyNoData />
      )}
    </div>
  );
}
