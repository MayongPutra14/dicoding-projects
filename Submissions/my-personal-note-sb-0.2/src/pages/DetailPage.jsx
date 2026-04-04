import React, { Component } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import DeleteButton from "../components/DeleteButton";
import ArchiveButton from "../components/ArchiveButton";
import { getNote } from "../utils/api";
import { showFormattedDate } from "../utils";

function WrapperDetailPage(props) {
  const { id } = useParams();
  const navigate = useNavigate();

  const handleDelete = async (noteId) => {
    await props.onDelete(noteId);
    navigate("/");
  };

  const handleArchive = async (noteId) => {
    await props.onArchive(noteId);
    navigate("/");
  };

  const handleUnarchive = async (noteId) => {
    await props.onUnarchive(noteId);
    navigate("/");
  };

  return (
    <DetailPage
      {...props}
      id={id}
      onDelete={handleDelete}
      onArchive={handleArchive}
      onUnarchive={handleUnarchive}
    />
  );
}

class DetailPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      note: null,
      loading: true,
      error: null,
    };
  }

  async componentDidMount() {
    const { id } = this.props;
    try {
      const { data } = await getNote(id);
      this.setState({ note: data, loading: false });
    } catch (err) {
      this.setState({ error: "Catatan tidak ditemukan", loading: false });
    }
  }
  
  render() {
    const { id, onDelete, onArchive, onUnarchive } = this.props;

    const { note, loading, error } = this.state;

    if (loading) {
      return (
        <main>
          <p>Loading...</p>
        </main>
      );
    }

    if (error || !note) {
      return (
        <main>
          <h2 className="detail-page__title">404 - Catatan tidak ditemukan</h2>
          <p className="detail-page__body">
            Catatan dengan id "{id}" tidak ada.
          </p>
          <Link to="/">Kembali ke Beranda</Link>
        </main>
      );
    }

    return (
      <main>
        <h2 className="detail-page__title">{note.title}</h2>
        <p className="detail-page__createdAt">
          {showFormattedDate(note.createdAt)}
        </p>
        <p className="detail-page__body">{note.body}</p>
        <br></br>
        <br></br>
        <p>Status: {note.archived ? "Arsip" : "Aktif"}</p>
        <div className="detail-page__action">
          <DeleteButton id={note.id} onDelete={onDelete} />
          <ArchiveButton
            id={note.id}
            archived={note.archived}
            onArchive={onArchive}
            onUnarchive={onUnarchive}
          />
        </div>
      </main>
    );
  }
}

export default WrapperDetailPage;
