import React, { Component } from "react";
import { Link } from "react-router-dom";
// utils
import { showFormattedDate } from "../utils";



export default class NoteItem extends Component {
  render() {
    const {note} = this.props;
    return (
      <div className="note-item">
        <h3 className="note-item__title"><Link to={`/notes/${note.id}`}>{note.title}</Link></h3>
        <p className="note-item__createdAt">{showFormattedDate(note.createdAt)}</p>
        <p className="note-item__body">{note.body}</p>
      </div>
    );
  }
}
