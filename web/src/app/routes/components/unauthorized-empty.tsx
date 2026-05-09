import { Link } from "react-router";
import { Ban } from "lucide-react";

// Import components
import { Button } from "@/shared/components/ui/button";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/shared/components/ui/empty";

export default function UnauthorizedEmpty() {
  return (
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <Ban />
        </EmptyMedia>
        <EmptyTitle>DeadEnd</EmptyTitle>
        <EmptyDescription>You are not allowed here</EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Button asChild>
          <Link to={".."}>Go back</Link>
        </Button>
      </EmptyContent>
    </Empty>
  );
}
