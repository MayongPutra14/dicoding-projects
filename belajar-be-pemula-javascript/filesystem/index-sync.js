import fs from 'fs'

const data = fs.readFileSync('todo.txt', 'utf-8')
console.log(data)