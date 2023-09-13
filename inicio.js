<<<<<<< HEAD
<<<<<<< HEAD
while (strawberryCount <200){
    document.write("There are "+strawberryCount+" strawberries.<br>");
    strawberryCount++;
}
=======

let pets = [
    {name: 'rex', type: 'dog', age: 10},
    {name: 'miau', type: 'cat', age: 2},
    {name: 'gulp', type: 'fish', age: 1},

]

pets.push({name: 'bolinha', type: 'dog', age: 5})

function nameOnly(x){
    return x.name
=======
//Functions 
let MyName = "Pablo"
function my_function(){
    document.write("Hallo " + MyName + "<br>"+ "<br>")
>>>>>>> cfdfd53129827d09093a68be6e6d95654d316349
}
my_function()
document.write("Are you " + MyName + "? <br>"+ "<br>")

let jhon = {
    name: "Jhon",
    surname: "Smith",
    age: 25,
    driveCar(){
        function functionLocal(){
            console.log(this.name + " " + this.surname + " is driving a car")
        }
        console.log(this.name + " " + this.surname + " is driving a car")
    }
}
jhon.driveCar()

function breathe(){
    console.log(this.name + " " + this.surname + " is breathing")
}
breathe.call(jhon)

let myNumbers = [10, 500, 2000]
let doubleNumbers = myNumbers.map(x => x*2)
console.log(doubleNumbers)

<<<<<<< HEAD
document.write(dogs.map(nameOnly)+ '<br>')
document.write(baby.map(nameOnly)+ '<br>')
>>>>>>> 4b2a08fb485e850a7c76f426725d97352b1fc6f3
=======
//Funcion-variable
let cool = function (){
    console.log("I am cool")
}
cool()

//Llamar una variable con los corchetes
let myname = "Pablo";
console.log(`Hello, my name is ${myname} and I'm programming in JavaScript`)
>>>>>>> cfdfd53129827d09093a68be6e6d95654d316349
