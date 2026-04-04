import React, { Component } from "react";
import { useNavigate } from "react-router-dom";

// components
import NoteForm from "../components/NoteForm";

function WrapperAddNotePage(props) {
  const navigate = useNavigate();

  const handleAddNote = async (note) => {
    await props.addNote(note);
    navigate("/");
  };
  
  return <AddNotePage {...props} addNote={handleAddNote} />;
}

class AddNotePage extends Component {
  render() {
    return (
      <main className="add-new-page">
        <div className="add-new-page__input">
          <NoteForm onSubmit={this.props.addNote} />
        </div>
      </main>
    );
  }
}

export default WrapperAddNotePage;
