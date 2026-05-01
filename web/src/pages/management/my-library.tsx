import { Plus } from "lucide-react"; // Cần cài lucide-react (thường đi kèm shadcn)

// Import components
import NoteCard from "@/components/note-card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

// Import modules
import { useMyNotesQuery } from "@/modules/note/api";

export default function MyLibrary() {
  const { data, isLoading } = useMyNotesQuery();
  const notes = data?.data.data || [];

  return (
    <div className="h-full overflow-y-auto space-y-6 w-full py-6">
      <div className="flex items-center justify-between px-2">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">My Library</h2>
          <p className="text-muted-foreground text-sm">
            Manage and organize your personal notes.
          </p>
        </div>
        <Button size="sm" className="cursor-pointer gap-2">
          <Plus className="size-4" />
          New Note
        </Button>
      </div>

      {isLoading ? (
        // Skeleton Loading: Giúp trải nghiệm người dùng mượt mà khi đang fetch data
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="flex flex-col space-y-3">
              <Skeleton className="h-[125px] w-full rounded-xl" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-[250px]" />
                <Skeleton className="h-4 w-[200px]" />
              </div>
            </div>
          ))}
        </div>
      ) : notes.length > 0 ? (
        // Grid Layout: Hiển thị dạng lưới giúp tận dụng không gian màn hình
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 auto-rows-fr">
          {notes.map((note) => (
            <NoteCard key={note._id} note={note} />
          ))}
        </div>
      ) : (
        // Empty State: Khi chưa có dữ liệu
        <div className="flex flex-col items-center justify-center py-20 text-center border-2 border-dashed rounded-xl">
          <div className="bg-muted rounded-full p-4 mb-4">
            <Plus className="size-8 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-medium">No notes found</h3>
          <p className="text-muted-foreground max-w-xs mx-auto">
            You haven't created any notes yet. Start your journey by creating
            your first note.
          </p>
          <Button variant="outline" className="mt-4">
            Create Note
          </Button>
        </div>
      )}
    </div>
  );
}
