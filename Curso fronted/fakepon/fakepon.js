function iniciar() {
    let botonMascota = document.getElementById("boton-mascota");
    botonMascota.addEventListener("click", seleccionarMascota);
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

function aleatorio(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

window.addEventListener("load", iniciar);