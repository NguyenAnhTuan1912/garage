// Import components
import { Skeleton } from "@/components/ui/skeleton";
import SectionCards, { SectionCardsSkeleton } from "./components/section-cards";

export default function HomePage() {
  return (
    <section className="w-full h-fit min-h-[100dvh]">
      <SectionCardsSkeleton />
    </section>
  );
}
