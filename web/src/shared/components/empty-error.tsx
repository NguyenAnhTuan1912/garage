import { Link } from "react-router";
import { CircleX, ArrowUpRightIcon } from "lucide-react";

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

export type TEmptyErrorProps = {
  errorMessage?: string;
};

export default function EmptyError(props: TEmptyErrorProps) {
  return (
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <CircleX />
        </EmptyMedia>
        <EmptyTitle>Opps!! Error</EmptyTitle>
        <EmptyDescription>
          There is an error occurred, please report to admin.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <p className="leading-7 [&:not(:first-child)]:mb-6">
          {props.errorMessage || "Unknown Error"}
        </p>
        <Button variant="outline">
          <Link to={RouteConfigs.Home.Path}>Back home</Link>
        </Button>
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
