import React from "react";
import NoteItem from "./NoteItem";

function NotesList({ notes, onDelete, onArchive, dataTestId = "notes-list" }) {
  const hasNotes = notes && notes.length > 0 ? true : false;

  if (!hasNotes) {
    return (
      <div className="notes-list" data-testid={dataTestId}>
        <p
          className="notes-list__empty-message"
          data-testid={`${dataTestId}-empty`}
        >
          Tidak ada catatan
        </p>
      </div>
    );
  }

  return (
    <div className="notes-list" data-testid={dataTestId}>
      {notes.map((note) => (
        <NoteItem
          key={note.id}
          note={note}
          onDelete={onDelete}
          onArchive={onArchive}
        ></NoteItem>
      ))}
    </div>
  );
}

export default NotesList;
