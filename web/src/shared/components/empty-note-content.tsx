import { Link } from "react-router";
import { NotepadText, ArrowUpRightIcon } from "lucide-react";

// Import configs
import { RouteConfigs } from "@/routes/route-configs";

// Import compoennts
import { Button } from "@/components/ui/button";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";

// Import helpers / utils
import { formatURL } from "@/utils/string";

export default function EmptyNoteContent() {
  return (
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <NotepadText />
        </EmptyMedia>
        <EmptyTitle>No Note Yet</EmptyTitle>
        <EmptyDescription>
          This note doesn't exist. If there is any error, please contact admin.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <div className="flex gap-2">
          <Button asChild>
            <Link to={formatURL(RouteConfigs.Note.Prefix, "new")}>
              Create note
            </Link>
          </Button>
          <Button variant="outline">
            <Link to={RouteConfigs.Home.Path}>Back home</Link>
          </Button>
        </div>
      </EmptyContent>
      <Button
        variant="link"
        asChild
        className="text-muted-foreground"
        size="sm"
      >
        <Link to={RouteConfigs.NotFound.Path}>
          Learn More <ArrowUpRightIcon />
        </Link>
      </Button>
    </Empty>
  );
}
