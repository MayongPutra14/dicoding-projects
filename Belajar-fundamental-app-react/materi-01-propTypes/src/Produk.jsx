import React from "react";
import PropTypes from "prop-types";

function Produk({ nama, harga, diskon, kategori, ulasan, isReady, onBeli }) {
  return (
    <div
      style={{
        border: "1px solid #ccc",
        padding: "20px",
        borderRadius: "10px",
        marginBottom: "10px",
      }}
    >
      <h2>
        {nama} {kategori.nama}
      </h2>

      <p>Harga: Rp. {harga.toLocaleString()}</p>
      <p>Diskon: {diskon}%</p>
      <p>Status: {isReady ? "✅ Tersedia" : "✖️ Habis"}</p>
      <h4>Ulasan</h4>
      <ul>
        {ulasan.map((tesk, index) => (
          <li key={index}>{tesk}</li>
        ))}
      </ul>
      <button onClick={onBeli} style={{ cursor: "pointer" }}>
        Beli Seakrang
      </button>
    </div>
  );
}

Produk.propTypes = {
  nama: PropTypes.string.isRequired,
  kategori: PropTypes.object.isRequired,
  harga: PropTypes.number.isRequired,
  diskon: PropTypes.number.isRequired,
  isReady: PropTypes.bool.isRequired,
  ulasan: PropTypes.array,
  onBeli: PropTypes.func.isRequired,
};

Produk.defaultProps = {
  diskon: 0,
  isReady: false,
  ulasan: ["Belum ada ulasan"],
};

export default Produk;
