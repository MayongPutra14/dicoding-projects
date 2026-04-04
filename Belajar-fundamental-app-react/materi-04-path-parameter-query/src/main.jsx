import React from "react";
import { createRoot } from "react-dom/client";
import {
  BrowserRouter,
  Link,
  Routes,
  Route,
  useParams,
} from "react-router-dom";

function DetailProduk() {
  const { id } = useParams();

  return (
    <h3>
      Menampilkan detail untuk Produk{" "}
      <span style={{ color: "red", fontWeight: "700" }}>ID:{id}</span>
    </h3>
  );
}

function App() {
  return (
    <React.StrictMode>
      <nav>
        <Link to="/produk/101">Lihat Sepatu</Link>
        <Link to="/produk/102">Lihat Keyboard ASMR</Link>
      </nav>
      <Routes>
        <Route path="/produk/:id" Component={DetailProduk}></Route>
      </Routes>
    </React.StrictMode>
  );
}

const root = createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <App></App>
  </BrowserRouter>,
);
