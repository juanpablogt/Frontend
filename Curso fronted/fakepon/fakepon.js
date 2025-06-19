let ataqueJugador = [];
let ataqueEnemy = [];
let vidasJugador = 3;
let vidasOponente = 3;
let fakepones = [];
let mascotj;
let ataqueFoqueEnemy = [];
let intervalo

const contenedorTarjetas = document.getElementById("contenedorTarjetas");
const sectionReinicio = document.getElementById("reinicio");
const sectionSeleccionarAtaque = document.getElementById("seleccionar-ataque");
const sectionSeleccionarMascota = document.getElementById("seleccionar-mascota");
const botonMascota = document.getElementById("boton-mascota");
const botonReset = document.getElementById("reinicio");
const contenedorAtaques = document.getElementById("contenedor-ataques");
const spanMascotaJugador = document.getElementById("mascota-jugador");
const spanMascotaOponente = document.getElementById("mascota-enemy");
const spanVidasJugador = document.getElementById("vidas-jugador");
const spanVidasOponente = document.getElementById("vidas-enemy");
const sectionMensajes = document.getElementById("mensajes");
const sectionVerMapa = document.getElementById("ver-mapa");
const mapa = document.getElementById("mapa");
const lienzo = mapa.getContext("2d");

class Fakepon {
    constructor(nombre, imagen, vida) {
        this.nombre = nombre;
        this.imagen = imagen;
        this.vida = vida;
        this.ataques = [];
        this.x = 20;
        this.y = 20;
        this.ancho = 60;
        this.alto = 60;
        this.mapaFoto = new Image();
        this.mapaFoto.src = imagen;
        this.velocidadX = 0;
        this.velocidadY = 0;
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

function iniciar() {
    sectionSeleccionarAtaque.style.display = "none";
    sectionVerMapa.style.display = "none";

    fakepones.forEach((fakepon) => {
        contenedorTarjetas.innerHTML += `
            <input type="radio" name="mascota" id="${fakepon.nombre}" />
            <label for="${fakepon.nombre}" class="tarjeta-mokepon">
                <p>${fakepon.nombre}</p>
                <img src="${fakepon.imagen}" alt="${fakepon.nombre}">
            </label>
        `;
    });

    botonMascota.addEventListener("click", seleccionarMascota);
    botonReset.addEventListener("click", resetearJuego);

}

function seleccionarMascota() {
    sectionSeleccionarMascota.style.display = "none";
    sectionVerMapa.style.display = "flex";
    iniciarMapa();

    const inputsMascota = document.querySelectorAll('input[name="mascota"]');
    let seleccion = null;

    inputsMascota.forEach((input) => {
        if (input.checked) {
            seleccion = input;
        }
    });

    if (!seleccion) {
        alert("Por favor selecciona una mascota.");
        sectionSeleccionarMascota.style.display = "flex";
        return;
    }

    mascotj = fakepones.find(f => f.nombre === seleccion.id);
    spanMascotaJugador.innerHTML = mascotj.nombre;

    extraerAtaques(mascotj.nombre);
    seleccionarOponente();
    pintarpersonaje();
}

function extraerAtaques(mascota) {
    const mokepon = fakepones.find(f => f.nombre === mascota);
    mostrarAtaques(mokepon.ataques);
}

function mostrarAtaques(ataques) {
    contenedorAtaques.innerHTML = "";
    ataques.forEach((ataque) => {
        const boton = document.createElement("button");
        boton.innerText = ataque.nombre;
        boton.classList.add("boton-ataque");
        boton.addEventListener("click", (e) => {
            if (ataque.nombre === "🔥") {
                ataqueJugador.push("FUEGO");
            } else if (ataque.nombre === "💧") {
                ataqueJugador.push("AGUA");
            } else {
                ataqueJugador.push("PLANTA");
            }
            e.target.disabled = true;
            e.target.style.background = "#112f58";
            ataquealeaEnemy();
        });
        contenedorAtaques.appendChild(boton);
    });
}

function seleccionarOponente() {
    const index = aleatorio(0, fakepones.length - 1);
    const enemigo = fakepones[index];
    spanMascotaOponente.innerHTML = enemigo.nombre;
    ataqueFoqueEnemy = enemigo.ataques;
}

function ataquealeaEnemy() {
    const index = aleatorio(0, ataqueFoqueEnemy.length - 1);
    let tipo;
    const simbolo = ataqueFoqueEnemy[index].nombre;
    if (simbolo === "🔥") tipo = "FUEGO";
    else if (simbolo === "💧") tipo = "AGUA";
    else tipo = "PLANTA";

    ataqueEnemy.push(tipo);
    combate();
}

function combate() {
    const ultimoAtaqueJugador = ataqueJugador[ataqueJugador.length - 1];
    const ultimoAtaqueEnemy = ataqueEnemy[ataqueEnemy.length - 1];

    if (ultimoAtaqueJugador === ultimoAtaqueEnemy) {
        sectionMensajes.innerHTML = "Empate";
    } else if (
        (ultimoAtaqueJugador === "FUEGO" && ultimoAtaqueEnemy === "PLANTA") ||
        (ultimoAtaqueJugador === "AGUA" && ultimoAtaqueEnemy === "FUEGO") ||
        (ultimoAtaqueJugador === "PLANTA" && ultimoAtaqueEnemy === "AGUA")
    ) {
        sectionMensajes.innerHTML = `¡Ganaste!`;
        vidasOponente--;
        spanVidasOponente.innerHTML = vidasOponente;
    } else {
        sectionMensajes.innerHTML = `¡Perdiste!`;
        vidasJugador--;
        spanVidasJugador.innerHTML = vidasJugador;
    }

    contadorVidas();
}

function contadorVidas() {
    if (vidasJugador <= 0) {
        alert("Perdiste todas tus vidas, el juego ha terminado");
        spanVidasJugador.innerHTML = 0;
    } else if (vidasOponente <= 0) {
        alert("Felicidades, has ganado el juego!");
        spanVidasOponente.innerHTML = 0;
    }
}

function resetearJuego() {
    location.reload();
}

function aleatorio(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function pintarpersonaje() {
    mascotj.x = mascotj.x + mascotj.velocidadX;
    mascotj.y = mascotj.y + mascotj.velocidadY;
    lienzo.clearRect(0, 0, mapa.width, mapa.height);
    lienzo.drawImage(mascotj.mapaFoto, mascotj.x, mascotj.y, mascotj.ancho, mascotj.alto);
}

function moverDerecha() {
    mascotj.velocidadX = 5;
}

function moverIzquierda() {
    mascotj.velocidadX = -5;
}

function moverAbajo() {
    mascotj.velocidadY = 5;
}

function moverArriba() {
    mascotj.velocidadY = -5;
}

function detenerMovimiento() {
    mascotj.velocidadX = 0;
    mascotj.velocidadY = 0;
}

function sePresionoTecla(event) {
    switch (event.key) {
        case "ArrowUp": moverArriba(); break;
        case "ArrowDown": moverAbajo(); break;
        case "ArrowLeft": moverIzquierda(); break;
        case "ArrowRight": moverDerecha(); break;
        default: break;
    }
}

function iniciarMapa() {
    intervalo = setInterval(pintarpersonaje, 50);
    window.addEventListener("keydown", sePresionoTecla);
    window.addEventListener("keyup", detenerMovimiento);

}

window.addEventListener("load", iniciar);