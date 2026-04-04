// TODO 1
import {EventEmitter} from 'events';

const birthdayEventListerner = ({name}) => {
    console.log(`Happy birthday ${name}`)
}

// TODO 2
const myEmitter = new EventEmitter()

// TODO 3
myEmitter.on('birth', birthdayEventListerner)



// TODO 4
myEmitter.emit('birth',{name: "Gilang Mayong"})