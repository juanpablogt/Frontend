let ataquejugador;
let ataqueEnemy;
let vidasJugador = 3;
let vidasOponente = 3;
let fakepones = [];
let opcionFakepones;
let inputhipop 
let inputtortugon 
let inputpajarito 


const contenedorTarjetas = document.getElementById("contenedorTarjetas");
const sectionReinicio = document.getElementById("reinicio");
const sectionSeleccionarAtaque = document.getElementById("seleccionar-ataque");
const sectionSeleccionarMascota = document.getElementById("seleccionar-mascota");

const botonMascota = document.getElementById("boton-mascota");
const botonFire = document.getElementById("boton-fire");
const botonWater = document.getElementById("boton-water");
const botonGrass = document.getElementById("boton-grass");
const botonReset = document.getElementById("reinicio");

const spanMascotaJugador = document.getElementById("mascota-jugador");
const spanMascotaOponente = document.getElementById("mascota-enemy");
const spanVidasJugador = document.getElementById("vidas-jugador");
const spanVidasOponente = document.getElementById("vidas-enemy");
const sectionMensajes = document.getElementById("mensajes");

function iniciar() {
    sectionReinicio.style.display = "none";
    sectionSeleccionarAtaque.style.display = "none";

    fakepones.forEach((fakepon) => {
        opcionFakepones = `
            <input type="radio" name="mascota" id=${fakepon.nombre} />
            <label class="tarjeta-mokepon" for=${fakepon.nombre}>
                <p>${fakepon.nombre}</p>
                <img src="${fakepon.imagen}" alt=${fakepon.nombre}>
            </label>
        `;
        contenedorTarjetas.innerHTML += opcionFakepones;
        inputhipop = document.getElementById("Hipop");
        inputtortugon = document.getElementById("Tortugon");
        inputpajarito = document.getElementById("Pajarito");
    });
    
    botonMascota.addEventListener("click", seleccionarMascota);
    botonFire.addEventListener("click", botonFireClick);
    botonWater.addEventListener("click", botonWaterClick);
    botonGrass.addEventListener("click", botonGrassClick);
    botonReset.addEventListener("click", resetearJuego);
}

function seleccionarMascota() {
    sectionSeleccionarAtaque.style.display = "flex";
    sectionSeleccionarMascota.style.display = "none";

    if (inputhipop.checked) {
        spanMascotaJugador.innerHTML = inputhipop.id;
    } else if (inputtortugon.checked) {
        spanMascotaJugador.innerHTML = inputtortugon.id;
    } else if (inputpajarito.checked) {
        spanMascotaJugador.innerHTML = inputpajarito.id;
    } else {
        alert("Por favor, selecciona una mascota");
        sectionSeleccionarAtaque.style.display = "none";
        sectionSeleccionarMascota.style.display = "flex";
        return;
    }

    seleccionarOponente();
}

function seleccionarOponente() {
    const opciones = ["Hipop", "Tortugon", "Pajarito", "Perrito"];
    const aleatorioIndex = aleatorio(0, opciones.length - 1);
    spanMascotaOponente.innerHTML = opciones[aleatorioIndex];
}

function botonFireClick() {
    ataquejugador = "Fuego";
    ataquealeaEnemy();
}
function botonWaterClick() {
    ataquejugador = "Agua";
    ataquealeaEnemy();
}
function botonGrassClick() {
    ataquejugador = "Planta";
    ataquealeaEnemy();
}

function ataquealeaEnemy() {
    const opciones = ["Fuego", "Agua", "Planta"];
    const index = aleatorio(0, opciones.length - 1);
    ataqueEnemy = opciones[index];
    combate();
}

function combate() {
    if (ataquejugador === ataqueEnemy) {
        sectionMensajes.innerHTML = "Empate";
    } else if (
        (ataquejugador === "Fuego" && ataqueEnemy === "Planta") ||
        (ataquejugador === "Agua" && ataqueEnemy === "Fuego") ||
        (ataquejugador === "Planta" && ataqueEnemy === "Agua")
    ) {
        sectionMensajes.innerHTML = `Ganaste! ${spanMascotaJugador.innerHTML} ataca con ${ataquejugador}, y ${spanMascotaOponente.innerHTML} ataca con ${ataqueEnemy}`;
        vidasOponente--;
        spanVidasOponente.innerHTML = vidasOponente;
    } else {
        sectionMensajes.innerHTML = `Perdiste! ${spanMascotaJugador.innerHTML} ataca con ${ataquejugador}, y ${spanMascotaOponente.innerHTML} ataca con ${ataqueEnemy}`;
        vidasJugador--;
        spanVidasJugador.innerHTML = vidasJugador;
    }

    contadorVidas();
}

function contadorVidas() {
    if (vidasJugador <= 0) {
        alert("Perdiste todas tus vidas, el juego ha terminado");
        spanVidasJugador.innerHTML = 0;
        resetearJuego();
    } else if (vidasOponente <= 0) {
        alert("Felicidades, has ganado el juego!");
        spanVidasOponente.innerHTML = 0;
        resetearJuego();
    }
}

function resetearJuego() {
    sectionMensajes.innerHTML = "";
    vidasJugador = 3;
    vidasOponente = 3;
    spanVidasJugador.innerHTML = vidasJugador;
    spanVidasOponente.innerHTML = vidasOponente;
    sectionSeleccionarAtaque.style.display = "none";
    sectionSeleccionarMascota.style.display = "flex";
}

function aleatorio(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

class Fakepon {
    constructor(nombre, imagen, vida) {
        this.nombre = nombre;
        this.imagen = imagen;
        this.vida = vida;
        this.ataques = [];
    }
}

let hipop = new Fakepon("Hipop", "./assets/mokepons_mokepon_hipodoge_attack.png", 3);
let tortugon = new Fakepon("Tortugon", "./assets/mokepons_mokepon_capipepo_attack.png", 3);
let pajarito = new Fakepon("Pajarito", "./assets/mokepons_mokepon_ratigueya_attack.png", 3);

hipop.ataques.push(
    { nombre: "🔥", id: "boton-fire" },
    { nombre: "🔥", id: "boton-fire" },
    { nombre: "🔥", id: "boton-fire" },
    { nombre: "💧", id: "boton-water" },
    { nombre: "🌱", id: "boton-grass" }
);

tortugon.ataques.push(
    { nombre: "🔥", id: "boton-fire" },
    { nombre: "💧", id: "boton-water" },
    { nombre: "💧", id: "boton-water" },
    { nombre: "💧", id: "boton-water" },
    { nombre: "🌱", id: "boton-grass" }
);

pajarito.ataques.push(
    { nombre: "🔥", id: "boton-fire" },
    { nombre: "💧", id: "boton-water" },
    { nombre: "🌱", id: "boton-grass" },
    { nombre: "🌱", id: "boton-grass" },
    { nombre: "🌱", id: "boton-grass" }
);

fakepones.push(hipop, tortugon, pajarito);

window.addEventListener("load", iniciar);
