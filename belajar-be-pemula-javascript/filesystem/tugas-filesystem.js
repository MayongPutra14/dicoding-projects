import fs from 'fs';

const fileReadCallback = (error, data) => {
    if(error) {
        console.log("Berkas tidak ditemukan atau rusak!")
        return
    }

    console.log(data)
}

fs.readFile('notes.txt', 'utf-8', fileReadCallback)