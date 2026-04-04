import React, { Component } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import DetailPage from "./pages/DetailPage";
import AddNotePage from "./pages/AddNotePage";
import ArchivePage from "./pages/ArchivePage";
import NotFoundPage from "./pages/NotFoundPage";
import {
  getActiveNotes,
  getUserLogged,
  putAccessToken,
  addNote,
  deleteNote,
  archiveNote,
  getArchivedNotes,
  unarchiveNote,
} from "./utils/api.js";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import Header from "./components/Header.jsx";
import { ThemeProvider } from "./contexts/ThemeContext.js";
import { LocaleProvider } from "./contexts/LocaleContext.js";

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      authedUser: null,
      activeNotes: [],
      archivedNotes: [],
      loading: true,
      theme: "dark",
      searchKeyword: '',
      toggleTheme: () => {
        this.setState((prevState) => {
          const newTheme = prevState.theme === "light" ? "dark" : "light";
          localStorage.setItem("theme", newTheme);

          return {
            theme: newTheme,
          };
        });
      },
      localeContext: {
        locale: "id",
        toggleLocale: () => {
          this.setState((prevState) => {
            return {
              localeContext: {
                ...prevState.localeContext,
                locale: prevState.localeContext.locale === "id" ? "en" : "id",
              },
            };
          });
        },
      },
    };

    this.onLoginSuccess = this.onLoginSuccess.bind(this);
    this.onLogout = this.onLogout.bind(this);
    this.onDeleteNote = this.onDeleteNote.bind(this);
    this.handlerAddNewNote = this.handlerAddNewNote.bind(this);
    this.handlerArchiveNote = this.handlerArchiveNote.bind(this);
    this.handlerUnarchiveNote = this.handlerUnarchiveNote.bind(this);
  }

  async componentDidMount() {
    // Theme
    const savedTheme = localStorage.getItem("theme");
    const initialTheme = savedTheme || "dark";
    this.setState({
      theme: initialTheme,
    });

    // prevent go back when refresh page.
    const token = localStorage.getItem("accessToken");
    if (token) {
      putAccessToken(token);
      const userData = await getUserLogged();
      if (!userData.error) {
        const { data: activeNotes } = await getActiveNotes();
        const { data: archivedNotes } = await getArchivedNotes();

        this.setState({
          authedUser: userData.data,
          activeNotes,
          archivedNotes,
          loading: false,
        });
      } else {
        localStorage.removeItem("accessToken");
        putAccessToken("");
        this.setState({
          loading: false,
        });
      }
    } else {
      this.setState({
        loading: false,
      });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.theme !== this.state.theme) {
      document.documentElement.setAttribute("data-theme", this.state.theme);
    }
  }

  async onLoginSuccess(accessToken) {
    putAccessToken(accessToken);
    const result = await getUserLogged();
    if (result.error) {
      console.error("Gagal mengambil data user");
      return;
    }
    const userData = result.data;

    const { data: activeNotes } = await getActiveNotes();
    const { data: archivedNotes } = await getArchivedNotes();

    this.setState({
      authedUser: userData,
      activeNotes,
      archivedNotes,
      loading: false,
    });
  }

  async onLogout() {
    localStorage.removeItem("accessToken");
    putAccessToken("");
    this.setState({
      authedUser: null,
      activeNotes: [],
      archivedNotes: [],
      loading: false,
    });

    window.location.href = "/login";
  }

  async onDeleteNote(id) {
    await deleteNote(id);
    const { data: activeNotes } = await getActiveNotes();
    const { data: archivedNotes } = await getArchivedNotes();

    this.setState({ activeNotes, archivedNotes });
  }

  async handlerAddNewNote(note) {
    const Newdata = await addNote(note);

    if (!Newdata.error) {
      const { data: activeNotes } = await getActiveNotes();
      const { data: archivedNotes } = await getArchivedNotes();
      this.setState({ activeNotes, archivedNotes });
    }
    return Newdata;
  }

  async handlerArchiveNote(id) {
    await archiveNote(id);
    const { data: activeNotes } = await getActiveNotes();
    const { data: archivedNotes } = await getArchivedNotes();

    this.setState({ activeNotes, archivedNotes });
  }

  async handlerUnarchiveNote(id) {
    await unarchiveNote(id);
    const { data: activeNotes } = await getActiveNotes();
    const { data: archivedNotes } = await getArchivedNotes();

    this.setState({ activeNotes, archivedNotes });
  }

  render() {
    const { loading, authedUser } = this.state;
    if (loading) {
      return <p>Loading...</p>;
    }
    // conditional rendering
    if (authedUser === null) {
      return (
        <BrowserRouter>
          <LocaleProvider value={this.state.localeContext}>
            <ThemeProvider value={this.state}>
            <div className="app-container">
              <Routes>
                <Route
                  path="/*"
                  element={<LoginPage loginSuccess={this.onLoginSuccess} />}
                />

                <Route path="/register" element={<RegisterPage />} />
              </Routes>
            </div>
            </ThemeProvider>
          </LocaleProvider>
        </BrowserRouter>
      );
    }

    // main redering
    return (
      <BrowserRouter>
        <LocaleProvider value={this.state.localeContext}>
          <ThemeProvider value={this.state}>
            <div className="app-container">
              <Header user={this.state.authedUser} onLogout={this.onLogout} />
              <Routes>
                {/* Home Page: tampilkan activeNotes */}
                <Route
                  path="/"
                  element={
                    <HomePage
                      notes={this.state.activeNotes}
                      onDelete={this.onDeleteNote}
                      onArchive={this.handlerArchiveNote}
                      onUnarchive={this.handlerUnarchiveNote}
                    />
                  }
                />
                {/* Add New Note Route */}
                <Route
                  path="/notes/new"
                  element={
                    <AddNotePage addNote={this.handlerAddNewNote}></AddNotePage>
                  }
                ></Route>
                {/* Detail Page */}
                <Route
                  path="/notes/:id"
                  element={
                    <DetailPage
                      onDelete={this.onDeleteNote}
                      onArchive={this.handlerArchiveNote}
                      onUnarchive={this.handlerUnarchiveNote}
                    />
                  }
                />
                {/* Archive Page: tampilkan archivedNotes */}
                <Route
                  path="/archives"
                  element={
                    <ArchivePage
                      notes={this.state.archivedNotes}
                      onDelete={this.onDeleteNote}
                      onArchive={this.handlerArchiveNote}
                      onUnarchive={this.handlerUnarchiveNote}
                    />
                  }
                />
                {/* Not Found page */}
                <Route path="*" element={<NotFoundPage></NotFoundPage>}></Route>
              </Routes>
            </div>
          </ThemeProvider>
        </LocaleProvider>
      </BrowserRouter>
    );
  }
}
