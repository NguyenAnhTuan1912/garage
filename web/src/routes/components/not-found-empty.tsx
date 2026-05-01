import { Link } from "react-router";
import { CircleSlash } from "lucide-react";

// Import components
import { Button } from "@/components/ui/button";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";

export default function NotFoundEmpty() {
  return (
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <CircleSlash />
        </EmptyMedia>
        <EmptyTitle>404 Not Found</EmptyTitle>
        <EmptyDescription>This page is under constructing or doesn't exist.</EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Button asChild>
          <Link to={".."}>Go back</Link>
        </Button>
      </EmptyContent>
    </Empty>
  );
}
