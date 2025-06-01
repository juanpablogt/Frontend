let ataquejugador;
let ataqueEnemy;
let vidasJugador = 3;
let vidasOponente = 3;

function iniciar() {

    let setionReinicio = document.getElementById("reinicio");
    setionReinicio.style.display = "none";
    let setionSeleccionarAtaque = document.getElementById("seleccionar-ataque");
    setionSeleccionarAtaque.style.display = "none";

    let botonMascota = document.getElementById("boton-mascota");
    botonMascota.addEventListener("click", seleccionarMascota);

    let botonFire = document.getElementById("boton-fire");
    botonFire.addEventListener("click", botonFireClick);
    let botonWater = document.getElementById("boton-water");
    botonWater.addEventListener("click", botonWaterClick);
    let botonGrass = document.getElementById("boton-grass");
    botonGrass.addEventListener("click", botonGrassClick);
    let botonReset = document.getElementById("reinicio");
    botonReset.addEventListener("click", resetearJuego);
}

function seleccionarMascota() {
    let sectionSeleccionaAtaque = document.getElementById("seleccionar-ataque");
    sectionSeleccionaAtaque.style.display = "flex";

    let sectionSeleccionarMascota = document.getElementById("seleccionar-mascota");
    sectionSeleccionarMascota.style.display = "none";

    let inputhipop = document.getElementById("hipop");
    let inputtortugon = document.getElementById("tortugon");
    let inputpajarito = document.getElementById("pajarito");
    let inputperrito = document.getElementById("perrito");
    let spanMascotaJugador = document.getElementById("mascota-jugador");

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

    combate();
}



function aleatorio(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function combate() {
    let sapanVidasJugador = document.getElementById("vidas-jugador");
    let spanVidasOponente = document.getElementById("vidas-enemy");
    let spanMascotaJugador = document.getElementById("mascota-jugador");
    let spanMascotaOponente = document.getElementById("mascota-enemy");
    let sectionMensajes = document.getElementById("mensajes");
    
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
    let sapanVidasJugador = document.getElementById("vidas-jugador");
    let spanVidasOponente = document.getElementById("vidas-enemy");

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
    let sectionMensajes = document.getElementById("mensajes");
    sectionMensajes.innerHTML = "";
    vidasJugador = 3;
    vidasOponente = 3;
    let sapanVidasJugador = document.getElementById("vidas-jugador");
    let spanVidasOponente = document.getElementById("vidas-enemy");
    sapanVidasJugador.innerHTML = vidasJugador;
    spanVidasOponente.innerHTML = vidasOponente;
    let sectionSeleccionarAtaque = document.getElementById("seleccionar-ataque");
    sectionSeleccionarAtaque.style.display = "none";
    let sectionSeleccionarMascota = document.getElementById("seleccionar-mascota");
    sectionSeleccionarMascota.style.display = "flex";
    
}
window.addEventListener("load", iniciar);