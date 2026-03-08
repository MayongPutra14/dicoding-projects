import React from 'react'
import Produk from "./Produk";

function App() {
  const handlerBeli = () => alert("Barang Dimasukan Kedalam Keranjang!")
  
  return (
    <div style={{padding: '20px'}}>
      <h1>Toko React PropTypes</h1>

      {/* PRODUK 1: Data Lengkap & Benar */}
      <Produk
        nama="Kambing Guling"
        harga={2000000}
        diskon={15}
        isReady={true}
        onBeli={handlerBeli}
        kategori={{ id: 1, nama: "Makanan" }} // Kirim Objek
        ulasan={["Dagingnya empuk!", "Bumbunya meresap"]} // Kirim Array
      />

      {/* PRODUK 2: Menguji DefaultProps */}
      {/* Kita "Sengaja" tidak kirim diskon, isReady, dan ulasan */}
      {/* <Produk
        nama="Sate Ayam"
        harga={25000}
        onBeli={handlerBeli}
        kategori={{ id: 2, nama: "Makanan" }}
      /> */}
    </div>
  )
}

export default App;