import {tambah, pembagian} from "./math.js"

tambah(10,-2, (err, data) => {
    if(err) {
        console.error(err)
        return
    } else {
        console.log(data)
    }
})


