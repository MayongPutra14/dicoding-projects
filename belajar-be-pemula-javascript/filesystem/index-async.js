import fs from 'fs'

const fileReadCallback = (error, data) => {
    if(error) {
        console.log("Gagal membaca berkas!")
        return
    }

    console.log(data)
}

fs.readFile('todo.txt', 'utf-8', fileReadCallback)

