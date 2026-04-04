import React, { Component } from "react";
import { LocaleConsumer } from "../contexts/LocaleContext";

// components
import NoteItem from "./NoteItem";

export default class NoteList extends Component {
  render() {
    const { notes, onDelete, onArchive, onUnarchive } = this.props;

    if (notes.length === 0) {
      return (
        <LocaleConsumer>
          {({ locale }) => {
            return (
              <div className="notes-list-empty">
                <p>{locale === "id" ? "Tidak ada catatan" : "Empty"}</p>
              </div>
            );
          }}
        </LocaleConsumer>
      );
    }

    return (
      <div className="notes-list">
        {notes.map((note) => {
          return (
            <NoteItem
              key={note.id}
              note={note}
              onDelete={onDelete}
              onArchive={onArchive}
              onUnarchive={onUnarchive}
            ></NoteItem>
          );
        })}
      </div>
    );
  }
}
