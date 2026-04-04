import { createRoot } from "react-dom/client";
import {
  Routes,
  Route,
  useLocation,
  BrowserRouter,
  Link,
} from "react-router-dom";

function DaftarProduk() {
  const { search } = useLocation();

  const query = new URLSearchParams(search);
  const category = query.get("temukan");
  const sort = query.get("sort");

  return (
    <div>
      <h3>Daftar Produk</h3>
      <p>Kateogri: {category || "semua"}</p>
      <p>Urutan: {sort || "Default"}</p>
    </div>
  );
}

function App() {
  return (
    <div>
      <nav>
        {/* Cara mengirimnya cukup tambahkan ? di ujung URL */}
        <Link
          style={{ marginRight: "10px" }}
          to="/cari?category=elektronik&sort=murah"
        >
          Cari Elektronik Murah
        </Link>

        <Link to="/cari?category=baju&sort=terbaru">Cari Baju Terbaru</Link>
      </nav>

      <hr />
      <Routes>
        <Route path="/cari" Component={DaftarProduk}></Route>
      </Routes>
    </div>
  );
}

const root = createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <App></App>
  </BrowserRouter>,
);
