import React, { Component } from "react";
import { Link } from "react-router-dom";
import NoteList from "../components/NoteList";
import { LocaleConsumer } from "../contexts/LocaleContext";
export default class ArchivePage extends Component {
  render() {
    const { notes, onDelete, onArchive, onUnarchive } = this.props;
    const archivedNotes = notes.filter((note) => note.archived === true);

    return (
      <LocaleConsumer>
        {({ locale }) => {
          return (
            <main>
              <div className="sub-header">
                <h2>{locale === 'id' ? "Catatan Terarsip" : "Archived"}</h2>
                <Link to="/">{locale === 'id' ?  "Kembali ke Beranda" : "Back to home page"}</Link>
              </div>
              <NoteList
                notes={archivedNotes}
                onDelete={onDelete}
                onArchive={onArchive}
                onUnarchive={onUnarchive}
              />
            </main>
          );
        }}
      </LocaleConsumer>
    );
  }
}
