import { useEffect } from "react";

// Import components
import SkeletonNoteCard from "@/components/skeleton-note-card";
import NoteCard from "@/components/note-card";

// Import modules
import { useMyNotesQuery } from "@/modules/note/api";
import { useNoteState, noteStateSetters } from "@/modules/note/state";

export default function MyNotes() {
  const { myNotes } = useNoteState();
  const queryResult = useMyNotesQuery();

  useEffect(() => {
    const notes = queryResult.data?.data.data;

    if (!notes) return;

    noteStateSetters.setMyNotes(notes);
  }, [queryResult.data]);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
      {myNotes.length === 0 ||
      (queryResult.isPending && queryResult.isFetching) ? (
        <>
          <SkeletonNoteCard />
          <SkeletonNoteCard />
          <SkeletonNoteCard />
          <SkeletonNoteCard />
          <SkeletonNoteCard />
        </>
      ) : (
        myNotes.map((note) => <NoteCard key={note._id!} note={note} />)
      )}
    </div>
  );
}
