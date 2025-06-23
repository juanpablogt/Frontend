// Variables del juego
let ataquesJugador = [];
let ataquesEnemigo = [];
let vidasJugador = 3;
let vidasEnemigo = 3;
let mascotasDisponibles = [];
let mascotaJugador;
let ataquesMascotaEnemigo = [];
let nombreMascotaEnemigo = "";
let intervalo;
let fondoMapa = new Image();
fondoMapa.src = "./assets/mokemap.png";

// Elementos del DOM
const contenedorTarjetas = document.getElementById("contenedorTarjetas");
const sectionReinicio = document.getElementById("reinicio");
const sectionSeleccionarAtaque = document.getElementById("seleccionar-ataque");
const sectionSeleccionarMascota = document.getElementById("seleccionar-mascota");
const botonMascota = document.getElementById("boton-mascota");
const botonReset = document.getElementById("reinicio");
const contenedorAtaques = document.getElementById("contenedor-ataques");
const spanMascotaJugador = document.getElementById("mascota-jugador");
const spanMascotaEnemigo = document.getElementById("mascota-enemy");
const spanVidasJugador = document.getElementById("vidas-jugador");
const spanVidasEnemigo = document.getElementById("vidas-enemy");
const sectionMensajes = document.getElementById("mensajes");
const sectionVerMapa = document.getElementById("ver-mapa");
const mapa = document.getElementById("mapa");
const lienzo = mapa.getContext("2d");

// Clase Fakepon
class Fakepon {
    constructor(nombre, imagen, vida, fotoMapa, x = 10, y = 10, ataques = []) {
        this.nombre = nombre;
        this.imagen = imagen;
        this.vida = vida;
        this.ataques = ataques;
        this.x = x;
        this.y = y;
        this.ancho = 60;
        this.alto = 60;
        this.mapaFoto = new Image();
        this.mapaFoto.src = fotoMapa;
        this.velocidadX = 0;
        this.velocidadY = 0;
    }

    pintar() {
        lienzo.drawImage(this.mapaFoto, this.x, this.y, this.ancho, this.alto);
    }
}

// Instancias
const hipop = new Fakepon("Hipop", "./assets/mokepons_mokepon_hipodoge_attack.png", 3, './assets/hipodoge.png', 10, 10, ["🔥", "🔥", "💧", "💧", "🌱"]);
const tortugon = new Fakepon("Tortugon", "./assets/mokepons_mokepon_capipepo_attack.png", 3, './assets/capipepo.png', 10, 10, ["💧", "💧", "💧", "🌱", "🌱"]);
const pajarito = new Fakepon("Pajarito", "./assets/mokepons_mokepon_ratigueya_attack.png", 3, './assets/ratigueya.png', 10, 10, ["🌱", "🌱", "🌱", "🔥", "🔥"]);

const hipopEnemigo = new Fakepon("Hipop", "./assets/mokepons_mokepon_hipodoge_attack.png", 3, './assets/hipodoge.png', 170, 450, hipop.ataques);
const tortugonEnemigo = new Fakepon("Tortugon", "./assets/mokepons_mokepon_capipepo_attack.png", 3, './assets/capipepo.png', 545, 240, tortugon.ataques);
const pajaritoEnemigo = new Fakepon("Pajarito", "./assets/mokepons_mokepon_ratigueya_attack.png", 3, './assets/ratigueya.png', 270, 130, pajarito.ataques);

mascotasDisponibles.push(hipop, tortugon, pajarito);

function iniciar() {
    sectionSeleccionarAtaque.style.display = "none";
    sectionVerMapa.style.display = "none";

    mascotasDisponibles.forEach((mascota) => {
        contenedorTarjetas.innerHTML += `
            <input type="radio" name="mascota" id="${mascota.nombre}" />
            <label for="${mascota.nombre}" class="tarjeta-mokepon">
                <p>${mascota.nombre}</p>
                <img src="${mascota.imagen}" alt="${mascota.nombre}">
            </label>
        `;
    });

    botonMascota.addEventListener("click", seleccionarMascota);
    botonReset.addEventListener("click", () => location.reload());

    unirseAlJuego();
}

function unirseAlJuego() {
    fetch("http://localhost:8080/unirse")
        .then(function (res) {
            if (res.ok) {
                res.text()
                    .then(function (respuesta) {
                    console.log(respuesta);
                });
            }
        })
}

function seleccionarMascota() {
    const seleccion = [...document.querySelectorAll('input[name="mascota"]')].find(input => input.checked);

    if (!seleccion) {
        alert("Selecciona una mascota para continuar");
        return;
    }

    sectionSeleccionarMascota.style.display = "none";
    sectionVerMapa.style.display = "flex";

    mascotaJugador = mascotasDisponibles.find(m => m.nombre === seleccion.id);
    spanMascotaJugador.innerText = mascotaJugador.nombre;

    mostrarAtaques(mascotaJugador.ataques);
    iniciarMapa();
}

function mostrarAtaques(ataques) {
    const simboloATipo = { "🔥": "FUEGO", "💧": "AGUA", "🌱": "PLANTA" };
    contenedorAtaques.innerHTML = "";

    ataques.forEach((simbolo) => {
        const boton = document.createElement("button");
        boton.innerText = simbolo;
        boton.classList.add("boton-ataque");
        boton.addEventListener("click", (e) => {
            ataquesJugador.push(simboloATipo[simbolo]);
            e.target.disabled = true;
            e.target.style.background = "#112f58";
            ataqueEnemigoAleatorio();
        });
        contenedorAtaques.appendChild(boton);
    });
}

function ataqueEnemigoAleatorio() {
    const simboloATipo = { "🔥": "FUEGO", "💧": "AGUA", "🌱": "PLANTA" };
    const ataqueSimbolo = ataquesMascotaEnemigo[Math.floor(Math.random() * ataquesMascotaEnemigo.length)];
    const tipo = simboloATipo[ataqueSimbolo];
    ataquesEnemigo.push(tipo);
    combate(tipo);
}

function seleccionarOponente(enemigo) {
    ataquesMascotaEnemigo = enemigo.ataques;
    nombreMascotaEnemigo = enemigo.nombre;
    spanMascotaEnemigo.innerText = enemigo.nombre;
}

function combate(ataqueEnemigoActual) {
    const ataqueJugadorActual = ataquesJugador[ataquesJugador.length - 1];
    let resultado = "";

    if (ataqueJugadorActual === ataqueEnemigoActual) {
        resultado = `Empate: ${ataqueJugadorActual} vs ${ataqueEnemigoActual}`;
    } else if (
        (ataqueJugadorActual === "FUEGO" && ataqueEnemigoActual === "PLANTA") ||
        (ataqueJugadorActual === "AGUA" && ataqueEnemigoActual === "FUEGO") ||
        (ataqueJugadorActual === "PLANTA" && ataqueEnemigoActual === "AGUA")
    ) {
        resultado = `¡Ganaste!: ${ataqueJugadorActual} vence a ${ataqueEnemigoActual}`;
        vidasEnemigo--;
        spanVidasEnemigo.innerText = vidasEnemigo;
    } else {
        resultado = `¡Perdiste!: ${ataqueEnemigoActual} vence a ${ataqueJugadorActual}`;
        vidasJugador--;
        spanVidasJugador.innerText = vidasJugador;
    }

    sectionMensajes.innerText = resultado;

    if (ataquesJugador.length === 5) {
        setTimeout(() => {
            if (vidasJugador > vidasEnemigo) {
                alert("Ganaste la partida!");
            } else if (vidasEnemigo > vidasJugador) {
                alert("Perdiste la partida.");
            } else {
                alert("¡La partida terminó en empate!");
            }
        }, 100);
    }
}

function pintarCanvas() {
    mascotaJugador.x += mascotaJugador.velocidadX;
    mascotaJugador.y += mascotaJugador.velocidadY;

    lienzo.clearRect(0, 0, mapa.width, mapa.height);
    lienzo.drawImage(fondoMapa, 0, 0, mapa.width, mapa.height);
    mascotaJugador.pintar();
    hipopEnemigo.pintar();
    tortugonEnemigo.pintar();
    pajaritoEnemigo.pintar();

    [hipopEnemigo, tortugonEnemigo, pajaritoEnemigo].forEach(enemigo => revisarColision(enemigo));
}

function mover(x, y) {
    mascotaJugador.velocidadX = x;
    mascotaJugador.velocidadY = y;
}

function detenerMovimiento() {
    mover(0, 0);
}

function sePresionoTecla(e) {
    switch (e.key) {
        case "ArrowUp": mover(0, -5); break;
        case "ArrowDown": mover(0, 5); break;
        case "ArrowLeft": mover(-5, 0); break;
        case "ArrowRight": mover(5, 0); break;
    }
}

function iniciarMapa() {
    mapa.width = 800;
    mapa.height = 600;
    intervalo = setInterval(pintarCanvas, 50);
    window.addEventListener("keydown", sePresionoTecla);
    window.addEventListener("keyup", detenerMovimiento);
}

function revisarColision(enemigo) {
    const colision = !(
        mascotaJugador.y + mascotaJugador.alto < enemigo.y ||
        mascotaJugador.y > enemigo.y + enemigo.alto ||
        mascotaJugador.x + mascotaJugador.ancho < enemigo.x ||
        mascotaJugador.x > enemigo.x + enemigo.ancho
    );

    if (colision) {
        detenerMovimiento();
        clearInterval(intervalo);
        sectionVerMapa.style.display = "none";
        sectionSeleccionarAtaque.style.display = "flex";
        seleccionarOponente(enemigo);
    }
}

window.addEventListener("load", iniciar);