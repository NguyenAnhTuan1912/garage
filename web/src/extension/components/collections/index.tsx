import { Link, Book, Eye, Pencil } from "lucide-react";

// Import components
import { Badge } from "@/shared/components/ui/badge";
import { Button } from "@/shared/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/shared/components/ui/card";
import { Input } from "@/shared/components/ui/input";
import { Separator } from "@/shared/components/ui/separator";
import { ScrollArea } from "@/shared/components/ui/scroll-area";
import SectionHeader from "@/shared/components/section-header";
import EmptyNoData from "@/shared/components/ui/empty-no-data";

// Import hooks
import { useCollectionsQuery } from "@/shared/modules/collection/query";

const collectionTypeIconByValue: Record<string, any> = {
  LINK: <Link size={14} />,
  WORD_EXPLANATION: <Book size={14} />,
};

function CollectionTypeIcon({ type }: { type: string }) {
  return collectionTypeIconByValue[type];
}

export default function Collections() {
  const { data: res } = useCollectionsQuery();
  const collections = res?.data.data;
  const meta = res?.data.meta;

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

      {collections ? (
        <ScrollArea className="h-full w-full rounded-md">
          <div className="flex flex-col gap-3 px-2 py-1">
            {collections?.map((collection) => (
              <Card key={collection.id} className="rounded-xl">
                <CardHeader>
                  <CardTitle>{collection.title}</CardTitle>
                  <CardDescription className="flex items-center gap-2">
                    <CollectionTypeIcon type={collection.type} />
                    <Badge variant="outline">{collection.type}</Badge>
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p>{collection.description}</p>
                </CardContent>
                <CardFooter className="flex flex-col items-start gap-2">
                  <p>Topic: {collection.topic}</p>
                  <div className="flex gap-2">
                    <Button variant="outline" size="xs" className="rounded-xl">
                      <Eye /> View
                    </Button>
                    <Button variant="outline" size="xs" className="rounded-xl">
                      <Pencil /> Edit
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        </ScrollArea>
      ) : (
        <EmptyNoData />
      )}
    </div>
  );
}
