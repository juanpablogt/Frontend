const express = require('express');

const app = express();

const jugadores = []

class Jugador {
    constructor(id) {
        this.id = id;
    }}


app.get('/unirse', (req, res) => {
    const id = `${Math.random()}`;
    const nuevoJugador = new Jugador(id);
    jugadores.push(nuevoJugador);
    res.setHeader('Access-Control-Allow-Origin', '*');


    res.send(id);
});

app.listen(8080, () => {
    console.log('Servidor escuchando en el puerto 8080');
});