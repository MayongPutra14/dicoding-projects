import fs from "fs";

// ReadAble Stream 
// const readAbleStream = fs.createReadStream("article.txt", {
//   highWaterMark: 100,
// });

// readAbleStream.on("readable", () => {
//   try {
//     process.stdout.write(`[${readAbleStream.read()}]`);
//   } catch (error) {}
// });

// readAbleStream.on('end', () => {
//     console.log("Done")
// })

// WriteAble Stream
const writeAbleStream = fs.createWriteStream('output.txt')

// writeAbleStream.write("Ini merupakan bari pertama dengan function dari FS writeable Stream \n")
// writeAbleStream.write("Ini merupakan bari kedua dengan function dari FS writeable Stream \n")
writeAbleStream.write("mencoba untuk menimpa Tulisan sebelumnya \n")

writeAbleStream.end('Method end() digunakan untuk menandakan akhir dari writable stream sekaligus bisa digunakan sebagai penulisan writeable terakhir.')
