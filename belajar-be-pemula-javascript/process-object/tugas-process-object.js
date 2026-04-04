const initialMemoryUsage = process.memoryUsage().heapUsed;
const yourName = process.argv[2] || "User";
const environment = process.env.NODE_ENV;

let limit = 1000
if(environment === "production") {
    limit = 6000000
    console.log("-- Menjalankan Mode Optimasi --")
} else {
    console.log("-- Menjalankan Mode Debugging --")
}

for (let i = 0; i <= limit; i++) {}

const currentMemoryUsage = process.memoryUsage().heapUsed;

console.log(`Hai, ${yourName}`);
console.log(`Mode environment: ${environment}`);
console.log(
  `Penggunaan memori dari ${initialMemoryUsage} naik ke ${currentMemoryUsage}`,
);

if(environment === 'production' && currentMemoryUsage > 5000000) {
    console.warn("PERINGATAN: Penggunaan memory di production terlalu tinggi")
}
