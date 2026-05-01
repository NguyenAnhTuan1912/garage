// Import components
import NoteCard from "@/components/note-card";

// Import modules
import { useNotesQuery } from "@/modules/note/api";

export default function Library() {
  const queryResult = useNotesQuery();

  return (
    <div className="flex flex-col gap-3">
      {queryResult.data?.data.data.map((note) => {
        return <NoteCard key={note._id} note={note} />;
      })}
    </div>
  );
}
