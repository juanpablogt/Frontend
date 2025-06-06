let ataquejugador;
let ataqueEnemy;
let vidasJugador = 3;
let vidasOponente = 3;
let mokepones = [];

const setionReinicio = document.getElementById("reinicio");
const setionSeleccionarAtaque = document.getElementById("seleccionar-ataque");
const botonMascota = document.getElementById("boton-mascota");
const botonFire = document.getElementById("boton-fire");
const botonWater = document.getElementById("boton-water");
const botonGrass = document.getElementById("boton-grass");
const botonReset = document.getElementById("reinicio");
const sectionSeleccionaAtaque = document.getElementById("seleccionar-ataque");
const sectionSeleccionarMascota = document.getElementById("seleccionar-mascota");
const inputhipop = document.getElementById("hipop");
const inputtortugon = document.getElementById("tortugon");
const inputpajarito = document.getElementById("pajarito");
const inputperrito = document.getElementById("perrito");
const spanMascotaJugador = document.getElementById("mascota-jugador");
const spanMascotaOponente = document.getElementById("mascota-enemy");
const sapanVidasJugador = document.getElementById("vidas-jugador");
const spanVidasOponente = document.getElementById("vidas-enemy");
const sectionMensajes = document.getElementById("mensajes");
const sectionSeleccionarAtaque = document.getElementById("seleccionar-ataque");

function iniciar() {
    setionReinicio.style.display = "none";
    setionSeleccionarAtaque.style.display = "none";
    botonMascota.addEventListener("click", seleccionarMascota);
    botonFire.addEventListener("click", botonFireClick);
    botonWater.addEventListener("click", botonWaterClick);
    botonGrass.addEventListener("click", botonGrassClick);
    botonReset.addEventListener("click", resetearJuego);
}

function seleccionarMascota() {
    sectionSeleccionaAtaque.style.display = "flex";
    sectionSeleccionarMascota.style.display = "none";

    if (inputhipop.checked) {
        spanMascotaJugador.innerHTML = "Hipop ";
    }else if (inputtortugon.checked) {
        spanMascotaJugador.innerHTML = "Tortugon ";
    }else if (inputpajarito.checked) {
        spanMascotaJugador.innerHTML = "Pajarito ";
    }
    else if (inputperrito.checked) {
        spanMascotaJugador.innerHTML = "Perrito ";
    }else {
        alert("Por favor, selecciona una mascota");
    }
    seleccionarOponente();
}

function seleccionarOponente() {
    let ataqueAleatorio = aleatorio(1, 4);
    if (ataqueAleatorio == 1) {
        spanMascotaOponente.innerHTML = "Hipop";
    }
    else if (ataqueAleatorio == 2) {
        spanMascotaOponente.innerHTML = "Tortugon";
    }
    else if (ataqueAleatorio == 3) {
        spanMascotaOponente.innerHTML = "Pajarito";
    }
    else if (ataqueAleatorio == 4) {
        spanMascotaOponente.innerHTML = "Perrito";
    }
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
    let ataqueAleatorio = aleatorio(1, 3);
    if (ataqueAleatorio == 1) {
        ataqueEnemy = "Fuego";
    }
    else if (ataqueAleatorio == 2) {
        ataqueEnemy = "Agua";
    }
    else if (ataqueAleatorio == 3) {
        ataqueEnemy = "Planta";
    }
    else {
        ataqueEnemy = "Error";
    }
    combate();
}

function aleatorio(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function combate() {
    
    if (ataquejugador == ataqueEnemy) {
        sectionMensajes.innerHTML = "Empate";
    } else if (
        (ataquejugador == "Fuego" && ataqueEnemy == "Planta") ||
        (ataquejugador == "Agua" && ataqueEnemy == "Fuego") ||
        (ataquejugador == "Planta" && ataqueEnemy == "Agua")
    ) {
        sectionMensajes.innerHTML = "Ganaste! " + spanMascotaJugador.innerHTML + " ataca con " + ataquejugador + ", y " + spanMascotaOponente.innerHTML + " ataca con " + ataqueEnemy;
        vidasOponente--;
        spanVidasOponente.innerHTML = vidasOponente;
    } else {
        sectionMensajes.innerHTML = "Perdiste! " + spanMascotaJugador.innerHTML + " ataca con " + ataquejugador + ", y " + spanMascotaOponente.innerHTML + " ataca con " + ataqueEnemy;
        vidasJugador--;
        sapanVidasJugador.innerHTML = vidasJugador;
        
    }
    contadorVidas();
}

function contadorVidas() {
    
    if (vidasJugador <= 0) {
        alert("Perdiste todas tus vidas, el juego ha terminado");
        sapanVidasJugador.innerHTML = 0;
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
    sapanVidasJugador.innerHTML = vidasJugador;
    spanVidasOponente.innerHTML = vidasOponente;
    sectionSeleccionarAtaque.style.display = "none";
    sectionSeleccionarMascota.style.display = "flex";    
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
let tortugon = new Fakepon("Tortugon", "./assets/mokepons_mokepon_copipepo_attack.png", 3);
let pajarito = new Fakepon("Pajarito", "./assets/mokepons_mokepon_ratigueya_attack.png", 3);

hipop.ataques.push(
    { nombre: "🔥", id: "boton-fire" },
    { nombre: "🔥", id: "boton-fire" },
    { nombre: "🔥", id: "boton-fire" },
    { nombre: "💧", id: "boton-water" },
    { nombre: "🌱", id: "boton-grass" });

tortugon.ataques.push(
    { nombre: "🔥", id: "boton-fire" },
    { nombre: "💧", id: "boton-water" },
    { nombre: "💧", id: "boton-water" },
    { nombre: "💧", id: "boton-water" },
    { nombre: "🌱", id: "boton-grass" });

pajarito.ataques.push(
    { nombre: "🔥", id: "boton-fire" },
    { nombre: "💧", id: "boton-water" },
    { nombre: "🌱", id: "boton-grass" },
    { nombre: "🌱", id: "boton-grass" },
    { nombre: "🌱", id: "boton-grass" });

mokepones.push(hipop, tortugon, pajarito);
window.addEventListener("load", iniciar);