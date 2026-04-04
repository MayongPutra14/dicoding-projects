import React from "react";
import { Link } from "react-router-dom";

class NotFoundPage extends React.Component {
  render() {
    return (
      <main>
        <h2 className="detail-page__title">404</h2>
        <p className="detail-page__body">Halaman tidak ditemukan</p>
        <Link to="/">Kembali ke Beranda</Link>
      </main>
    );
  }
}

export default NotFoundPage;