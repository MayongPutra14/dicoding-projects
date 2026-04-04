function tambah(a,b, callback) {
    if(a < 1 || b < 1) {
        callback(new Error("Angka tidak boleh lebih kecil dari 1"), null)
        return
    }

    const hasil = a + b
    callback(null, hasil)
}

function pembagian(a, b, callback) {
  if (a === 0 || b === 0) {
    callback(new Error("Nilainya tidak boleh 0!!"), null);
    return;
  }

  const hasil = a / b;

  callback(null, hasil);
}

export {
    tambah,
    pembagian
}