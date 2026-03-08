// OLDWAY TO CREATE AN OBJECT => CONSTRUCTOR FUNCTION
// function Person(name, age) {
//     this.name = name;
//     this.age = age;
// }

// Person.prototype.eat = function() {
//     console.log(`${this.name} is eating!`)
// }

// const person1 = new Person('Gilang', 21)
// const person2 = new Person('Syifa', 22)

// console.log(person1.age)
// console.log(person2.name)
// person1.eat()
// person2.eat()

// MODERN WAY TO CREATE AN OBJECT ==> ES6 CLASS
class Person {
    constructor(name, age) {
        this.name = name;
    this.age = age;
  }
  
  eat() {
    console.log(`${this.name} is eating!`);
}
}

// const person1 = new Person('Gilang', 21)
// const person2 = new Person('Syifa', 22)

// console.log(person1.age)
// console.log(person2.name)
// person1.eat()
// person2.eat()

console.log(typeof Person)