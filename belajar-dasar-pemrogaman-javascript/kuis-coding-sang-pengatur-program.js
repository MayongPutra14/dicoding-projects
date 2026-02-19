function isPrime(num) {
  if (num <= 1) return false;
  for (let i = 2; i <= Math.sqrt(num); i++) {
    if (num % i === 0) return false;
  }
  return true;
}

function categorizeNumber(input) {
  // 1. Perbaikan typo 'typeof' dan validasi tipe data
  if (typeof input !== 'number' || !Number.isInteger(input)) {
    throw new Error("Input harus berupa bilangan bulat");
  }

  // 2. Cek Nol dan Negatif terlebih dahulu
  if (input === 0) {
    return "Nol"
  } else if (input < 0) return "Negatif";
  
  // 3. Cek Prima (Harus di atas Ganjil/Genap agar tidak terlewat)
  if (isPrime(input)) return "Prima";

  // 4. Cek Genap atau Ganjil
  if (input % 2 === 0) {
    return "Genap";
  } else {
    return "Ganjil";
  }


  /**
   * TODO:
   * Lengkapilah fungsi ini agar dapat menghasilkan output berupa kategori bilangan berdasarkan input yang diberikan.
   * Dengan ketentuan sebagai berikut:
   * 1. Jika input bukan number, bangkitkan (throw) error.
   * 2. Jika input adalah bilangan genap, kembalikan dengan nilai "Genap".
   * 3. Jika input adalah bilangan ganjil, kembalikan dengan nilai "Ganjil".
   * 4. Jika input adalah bilangan prima, kembalikan dengan nilai "Prima".
   * 5. Jika input adalah nol, kategorikan kembalikan dengan nilai "Nol".
   * 6. Jika input negatif, kembalikan dengan nilai "Negatif".
   */
}

// Contoh
console.log(categorizeNumber(15)); // Output: "Ganjil"
console.log(categorizeNumber(12)); // Output: "Genap"
console.log(categorizeNumber(17)); // Output: "Prima"
console.log(categorizeNumber(0)); // Output: "Nol"
console.log(categorizeNumber(-5)); // Output: "Negatif"

try {
  categorizeNumber('abc');
} catch (error) {
  console.log(error.message);
} // Output: "Input harus berupa bilangan bulat"
