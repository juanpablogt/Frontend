let MyName = "Pablo"
function my_function(){
    document.write("Hallo " + MyName + "<br>"+ "<br>")
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
