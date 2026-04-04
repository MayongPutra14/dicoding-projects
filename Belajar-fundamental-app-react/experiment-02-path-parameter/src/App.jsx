import React from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  useParams,
  Link,
  useLocation,
} from "react-router-dom";

// 1. CATALOG COMPONENT (USING QUERY PARAMETER)
function BookCatalog() {
  const { search } = useLocation();
  const query = new URLSearchParams(search);

  const genre = query.get("genre") || "All";
  const order = query.get("sort") || "Latest";

  return (
    <div>
      <h2>📚 Book Catalog</h2>
      <p>
        Filter Aktif - Genre: <b>{genre}</b> | Urutan: <b>{order}</b>
      </p>

      <ul>
        <li>
          Laskar Pelangi <Link to="/book/1">(lihat Detail)</Link>
        </li>
        <li>
          Filosofi Teras <Link to="/book/2">(lihat Detail)</Link>
        </li>
      </ul>

      <div style={{ marginTop: "20px" }}>
        <p>Gunakan Filtter:</p>
        <Link to="/catalog?genre=Fiksi&sort=mahal">
          Fiksi (Mahal)
        </Link>{" "}
        |{" "}
        <Link to="/catalog?genre=Edukasi&sort=murah">
          Edukasi (Murah)
        </Link>
      </div>
    </div>
  );
}

// 2. COMPONENT DETAIL (USING PATH PARAMETER)
function DetailBook() {
  // GET ID FROM URL PATH /book/:id
  const { id } = useParams();
  console.log(useParams)

  return (
    <div>
      <h2>📖 Detail Buku</h2>
      <p>
        Sekarang kamu sedang melihat data buku dengan <b>ID: {id}</b>
      </p>
      <Link to="/catalog">⬅ Kembali ke Katalog</Link>
    </div>
  );
}

// 3. APP COMPONENT
export default function App() {
  return (
    <BrowserRouter>
      <nav style={{ padding: "10px", background: "#eee" }}>
        <Link to="/catalog">Beranda Katalog</Link>
      </nav>
      <Routes>
        {/* PATH PARAMETER: Pakai titik dua (:) */}
        <Route path="/book/:id" element={<DetailBook />} />

        {/* QUERY PARAMETER: Path-nya tetap bersih */}
        <Route path="/catalog" element={<BookCatalog />} />
      </Routes>
    </BrowserRouter>
  );
}
