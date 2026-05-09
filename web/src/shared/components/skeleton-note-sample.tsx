// Import components
import { Skeleton } from "@/components/ui/skeleton";

// Import helpers / utils
import { cn } from "@/lib/utils";

export type TSkeletonNoteSampleProps = {
  className?: string;
};

export default function SkeletonNoteSample(props: TSkeletonNoteSampleProps) {
  return (
    <div
      className={cn(
        "w-full max-w-[375px] flex flex-col space-y-3 aspect-[210/297]",
        props.className
      )}
    >
      <Skeleton className="w-full h-full rounded-xl" />
    </div>
  );
}
