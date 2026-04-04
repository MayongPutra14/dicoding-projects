import {EventEmitter} from 'events'

const myEventEmitter = new EventEmitter()

const makeCoffee = (({nama}) => {
    console.log(`Kopi ${nama} telah dibuat`)
})

const harga = (({harga, nama}) => {
    console.log(`Harga dari ${nama} tersebut adalah ${harga}`)
})

myEventEmitter.on("coffe-order", makeCoffee)
myEventEmitter.on("coffe-order", harga)
myEventEmitter.emit("coffe-order", {nama: "Tiramisu", harga:15000})

