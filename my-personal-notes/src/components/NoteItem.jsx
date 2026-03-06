import React from "react";
import { showFormattedDate } from "../utils";
import NoteActionButton from "./NoteActionButton";

function NoteItem({ note, onDelete, onArchive }) {
  return (
    <div className="note-item" data-testid="note-item" data-note-id={note?.id}>
      <div className="note-item__content" data-testid="note-item-content">
        <h3 className="note-item__title" data-testid="note-item-title">
          {note.title}
        </h3>
        <p className="note-item__date" data-testid="note-item-date">
          {showFormattedDate(note.createdAt)}
        </p>
        <p className="note-item__body" data-testid="note-item-body">
          {note.body}
        </p>
      </div>
      <div className="note-item__action" data-testid="note-item-action">
        <NoteActionButton
          variant="delete"
          label={"Delete"}
          onClick={() => onDelete(note.id)}
          dataTestId="note-item-delete-button"
        />

        <NoteActionButton
          variant="archive"
          label={note.archived ? "Pindahkan" : "Arsipkan"}
          className="note-item__archive-button"
          onClick={() => onArchive(note.id)}
          dataTestId={"note-item-archive-button"}
        />
      </div>
    </div>
  );
}

export default NoteItem;
