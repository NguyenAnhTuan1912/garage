// Import components
import { Skeleton } from "@/components/ui/skeleton";

// Import helpers / utils
import { cn } from "@/lib/utils";

export type TSkeletonNoteCardProps = {
  className?: string;
};

export default function SkeletonNoteCard(props: TSkeletonNoteCardProps) {
  return (
    <div className={cn("w-full  flex flex-col space-y-3", props.className)}>
      <Skeleton className="w-full h-[125px] rounded-xl" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-1/2" />
      </div>
    </div>
  );
}
