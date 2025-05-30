function iniciar() {
    let botonMascota = document.getElementById("boton-mascota");
    botonMascota.addEventListener("click", seleccionarMascota);
}

function seleccionarMascota() {
    let inputhipop = document.getElementById("hipop");
    let inputtortugon = document.getElementById("tortugon");
    let inputpajarito = document.getElementById("pajarito");
    let inputperrito = document.getElementById("perrito");

    if (inputhipop.checked) {
        alert("Has seleccionado Hipopótamo");
    }else if (inputtortugon.checked) {
        alert("Has seleccionado Tortugón");
    }else if (inputpajarito.checked) {
        alert("Has seleccionado Pajarito");
    }
    else if (inputperrito.checked) {
        alert("Has seleccionado Perrito");
    }else {
        alert("Por favor, selecciona una mascota");
    }
}

window.addEventListener("load", iniciar);