// Cara meng import file

// import coffee from "./coffee/coffee.js";
// console.log(coffee)



// Tugas Modularization
import Tiger from "./Tiger.js"
import Wolf from "./Wolf.js"



const fighting = (tiger, wolf) => {
    if(tiger.strength > wolf.strength) {
        tiger.growl()
        return
    }

    if(wolf.strength > tiger.strength) {
        wolf.howl()
        return
    }

    console.log("Tiger And Wolf have same strength")
}

const tiger = new Tiger()
const wolf = new Wolf()

fighting(tiger, wolf)