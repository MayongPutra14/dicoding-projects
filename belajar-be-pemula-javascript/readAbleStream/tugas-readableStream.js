import fs from "fs";

const readAbleStream = fs.createReadStream("input-tugas.txt", {
  highWaterMark: 15,
});

const writeAbleStream = fs.createWriteStream('output-tugas.txt')


readAbleStream.on("data", (chunk) => {
    const formattedData = `[${chunk.toString()}]\n`

    process.stdout.write(formattedData);
    writeAbleStream.write(formattedData)
});

readAbleStream.on('end', () => {
    writeAbleStream.end('Sudah selesai menulis')
    console.log("Sudah selesai!")
})


readAbleStream.on('error', (error) => console.log('Error Membaca:', error))
writeAbleStream.on('error', (error) => console.log('Error Membaca:', error))
