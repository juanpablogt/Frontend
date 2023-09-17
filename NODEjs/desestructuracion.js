// const Deadpool = {
//     nombre: 'Deadpool',
//     apellido: 'Winston',
//     poder: 'Regeneración',
//     getNombre: function() {
//         return `${this.nombre} ${this.apellido} - poder: ${this.poder}`;
//     }
// }

// console.log(Deadpool.getNombre());

// const { nombre: primerNombre, apellido, poder } = Deadpool;

// console.log(primerNombre, apellido, poder);

//Desestructuración de arreglos

function imprimeHeroe({ nombre, apellido, poder, edad = 0 }) {
    nombre = 'Deadpool';
    console.log(nombre, apellido, poder, edad);
}

const heroes = ['Deadpool', 'Superman', 'Batman'];

const [, , h3] = heroes;

console.log(h3);

//Funcion de flecha

function sumar(a, b) {
    return a + b;
}

const sumar2 = (a, b) => {
    return a + b;
}

const sumar3 = (a, b) => a + b;

console.log(sumar(10, 20));
console.log(sumar2(10, 20));
console.log(sumar3(10, 20));



