import { Link } from "react-router";

// Import configs
import { RouteConfigs } from "@/routes/route-configs";

// Import components
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";

// Import helpers / utils
import { cn } from "@/lib/utils";
import { formatURL } from "@/utils/string";

// Import types
import type { TNote } from "@/modules/note/type";

export type TNoteCardProps = {
  className?: string;
  note: TNote;
};

export default function NoteCard(props: TNoteCardProps) {
  const noteURL = props.note._id
    ? formatURL(RouteConfigs.Note.Prefix, props.note._id)
    : RouteConfigs.NotFound.Path;

  return (
    <Link to={noteURL}>
      <Card className={cn("w-full h-full flex flex-col", props.className)}>
        <CardHeader className="p-0">
          <img
            src={
              props.note.photo || props.note.coverPhoto || "/placeholder.svg"
            }
            alt={props.note.name}
            className="w-full aspect-video object-cover"
          />
        </CardHeader>
        <CardContent className="space-y-2 flex-1">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">{props.note.name}</h3>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col items-start">
          <p className="text-xs text-muted-foreground">
            Author: {props.note.createdBy ?? props.note.authorId}
          </p>
          <p className="text-xs text-muted-foreground">
            Created:{" "}
            {props.note.createdAt
              ? new Date(props.note.createdAt).toLocaleDateString()
              : "N/A"}
          </p>
        </CardFooter>
      </Card>
    </Link>
  );
}
