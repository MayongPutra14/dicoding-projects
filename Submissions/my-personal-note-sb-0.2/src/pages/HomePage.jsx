import React, { Component } from "react";
import { useSearchParams, Link } from "react-router-dom";
import NoteList from "../components/NoteList.jsx";
import SearchBar from "../components/SearchBar.jsx";
import { LocaleConsumer } from "../contexts/LocaleContext.js";
import { FiPlus } from "react-icons/fi";

// Wrapper Function
function WrapperHomePage(props) {
  const [searchParams, setSearchParams] = useSearchParams();

  const keyword = searchParams.get("keyword") || "";

  function changeSearchParams(keyword) {
    setSearchParams({ keyword });
  }

  return (
    <HomePage {...props} keyword={keyword} keywordChange={changeSearchParams} />
  );
}

class HomePage extends Component {
  render() {
    const { notes, keyword, onDelete, onArchive, onUnarchive, keywordChange } = this.props;
    const filteredNotes = notes.filter((note) => {
      return (
        (note.title || "").toLowerCase().includes(keyword.toLowerCase()) &&
        !note.archived
      );
    });

    return (
      <LocaleConsumer>
        {({ locale }) => {
          return (
            <main>
              <div className="sub-header">
                <h2>{locale === "id" ? "Daftar Catatan" : "Notes List"}</h2>
                <Link to="/archives">
                  {locale === "id" ? "Lihat Arsip" : "Archived"}
                </Link>
              </div>
              <SearchBar
                keyword={keyword}
                keywordChange={keywordChange}
              />

              <NoteList
                notes={filteredNotes}
                onDelete={onDelete}
                onArchive={onArchive}
                onUnarchive={onUnarchive}
              />
              <div className="homepage__action">
                <Link to="notes/new" className="action plus">
                  <FiPlus/>
                </Link>
              </div>
            </main>
          );
        }}
      </LocaleConsumer>
    );
  }
}

export default WrapperHomePage;
