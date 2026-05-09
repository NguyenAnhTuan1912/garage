// Import components
import SkeletonNoteCard from "@/components/skeleton-note-card";

export default function SkeletonExplore() {
  return (
    <section className="w-full h-fit min-h-[100dvh] pt-4">
      <div className="w-full max-w-[1280px] mx-auto">
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight text-balance">
          Read others' stories
        </h1>

        <div className="w-full my-4 border-t" />

        <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
          <SkeletonNoteCard />
          <SkeletonNoteCard />
          <SkeletonNoteCard />
          <SkeletonNoteCard />
          <SkeletonNoteCard />
          <SkeletonNoteCard />
          <SkeletonNoteCard />
          <SkeletonNoteCard />
          <SkeletonNoteCard />
          <SkeletonNoteCard />
          <SkeletonNoteCard />
          <SkeletonNoteCard />
        </div>
      </div>
    </section>
  );
}
