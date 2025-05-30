let ataquejugador;
let ataqueEnemy;

function iniciar() {
    
    let botonMascota = document.getElementById("boton-mascota");
    botonMascota.addEventListener("click", seleccionarMascota);

    let botonFire = document.getElementById("boton-fire");
    botonFire.addEventListener("click", botonFireClick);
    let botonWater = document.getElementById("boton-water");
    botonWater.addEventListener("click", botonWaterClick);
    let botonGrass = document.getElementById("boton-grass");
    botonGrass.addEventListener("click", botonGrassClick);
}

function seleccionarMascota() {
    let inputhipop = document.getElementById("hipop");
    let inputtortugon = document.getElementById("tortugon");
    let inputpajarito = document.getElementById("pajarito");
    let inputperrito = document.getElementById("perrito");
    let spanMascotaJugador = document.getElementById("mascota-jugador");

    if (inputhipop.checked) {
        spanMascotaJugador.innerHTML = "Hipop";
    }else if (inputtortugon.checked) {
        spanMascotaJugador.innerHTML = "Tortugon";
    }else if (inputpajarito.checked) {
        spanMascotaJugador.innerHTML = "Pajarito";
    }
    else if (inputperrito.checked) {
        spanMascotaJugador.innerHTML = "Perrito";
    }else {
        alert("Por favor, selecciona una mascota");
    }
    seleccionarOponente();
}

function seleccionarOponente() {
    let ataqueAleatorio = aleatorio(1, 4);
    let spanMascotaOponente = document.getElementById("mascota-enemy");
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

    createMensaje();
}

function createMensaje() {
    let sectionMensajes = document.getElementById("mensajes");
    let parrafo = document.createElement("p")
    parrafo.innerHTML = "Tu mascota ataca con " + ataquejugador + ", la mascota enemiga ataca con " + ataqueEnemy;
    sectionMensajes.appendChild(parrafo);
}

function aleatorio(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

window.addEventListener("load", iniciar);