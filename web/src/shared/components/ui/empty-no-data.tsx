import { useNavigate } from "react-router";
import { Wrench, ArrowLeft } from "lucide-react";

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

export type TEmptyNoDataProps = {
  hasNavigation?: boolean;
};

export default function EmptyNoData(
  props: TEmptyNoDataProps
) {
  const navigate = useNavigate();

  return (
    <Empty className="h-full bg-gradient-to-b from-muted/50 from-30% to-background">
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <Wrench />
        </EmptyMedia>
        <EmptyTitle>No Data</EmptyTitle>
        <EmptyDescription>
          There is not data here. Please comeback later.
        </EmptyDescription>
      </EmptyHeader>
      {props.hasNavigation && (
        <EmptyContent>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              navigate("..");
            }}
          >
            <ArrowLeft />
            Go back
          </Button>
        </EmptyContent>
      )}
    </Empty>
  );
}
