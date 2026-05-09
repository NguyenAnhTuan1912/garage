// Import components
import { Skeleton } from "@/components/ui/skeleton";
import SkeletonProfileCard from "./skeleton-profile-card";

export default function SkeletonNoteContent() {
  return (
    <section className="w-full">
      {/* Cover photo */}
      <Skeleton className="w-full h-[240px] rounded-none" />

      <div className="w-fulf max-w-[960px] mx-auto mt-4">
        <SkeletonProfileCard />

        <div className="w-full my-4 border-t" />

        {/* Title */}
        <div className="mb-6">
          <Skeleton className="w-full h-[2.25rem] mb-2" />
          <Skeleton className="w-2/3 h-[2.25rem]" />
        </div>

        <Skeleton className="w-5/12 h-[1.875rem] mt-6 mb-3" />
        <Skeleton className="w-full h-[1rem] mb-2" />
        <Skeleton className="w-full h-[1rem] mb-2" />
        <Skeleton className="w-full h-[1rem] mb-2" />
        <Skeleton className="w-full h-[1rem] mb-2" />
        <Skeleton className="w-7/12 h-[1rem] mb-2" />

        <Skeleton className="w-3/12 h-[1.875rem] mt-6 mb-3" />
        <Skeleton className="w-full h-[1rem] mb-2" />
        <Skeleton className="w-full h-[1rem] mb-2" />
        <Skeleton className="w-full h-[1rem] mb-2" />
        <Skeleton className="w-4/12 h-[1rem] mb-2" />
      </div>
    </section>
  );
}
