import React, { useState } from "react";

// 1. initialize pages
const Home = () => (
  <div style={{ padding: "20", background: "#e3f2fd" }}>
   😁 Ini Adalah Halaman Beranda
  </div>
);
const Gallery = () => (
  <div style={{ padding: "20px", background: "#f1f8e9" }}>
    🖼️ Ini Halaman Galeri Foto
  </div>
);
const Profile = () => (
  <div style={{ padding: "20px", background: "#fff3e0" }}>
    👤 Ini Halaman Profil Pengguna
  </div>
);

function App() {
  // 2. Stete to navigate active page
  // first state / default is 'home'
  const [page, setPage] = useState("home");

  // 3. Helper function to render component base on state value
  const renderPage = () => {
    switch (page) {
      case "home":
        return <Home></Home>;
      case "gallery":
        return <Gallery></Gallery>;
      case "profile":
        return <Profile></Profile>;
      default:
        return <Home></Home>;
    }
  };

  return (
    <div style={{ fontFamily: "Arial", textAlign: "center" }}>
      <h1>Aplikasi tanpa library Router </h1>

      {/* Navigation: will change when button is cliked */}
      <nav style={{ marginBottom: "20px" }}>
        
        <button onClick={() => setPage("home")}>Beranda</button>
        <button onClick={() => setPage("gallery")}>Galeri</button>
        <button onClick={() => setPage("profile")}>Profile</button>
      </nav>
      <hr />

      {/* 5. Konten Dinamis: Akan berubah sesuai isi state 'page' */}
      <main>{renderPage()}</main>

      <p style={{ marginTop: "20px", fontSize: "12px" }}>
        Status State Saat Ini: <strong>{page}</strong>
      </p>
    </div>
  );
}

export default App;
