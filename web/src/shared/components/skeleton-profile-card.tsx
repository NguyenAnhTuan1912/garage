// Import components
import { Skeleton } from "@/components/ui/skeleton";

export default function SkeletonProfileCard() {
  return (
    <div className="w-full max-w-[375px] flex items-center space-x-4">
      <Skeleton className="h-12 w-12 rounded-full shrink-0" />
      <div className="w-full space-y-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-3/4" />
      </div>
    </div>
  );
}
