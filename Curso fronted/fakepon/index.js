const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const jugadores = []

class Jugador {
    constructor(id) {
        this.id = id;
    }
    asiganarFakepon(fakepon) {
        this.fakepon = fakepon;
    }
}


class Fakepon {
    constructor(nombre, imagen, vida, ataques) {
        this.nombre = nombre;
        this.imagen = imagen;
        this.vida = vida;
        this.ataques = ataques;
    }
}

app.get('/unirse', (req, res) => {
    const id = `${Math.random()}`;
    const nuevoJugador = new Jugador(id);
    jugadores.push(nuevoJugador);
    res.setHeader('Access-Control-Allow-Origin', '*');


    res.send(id);
});

app.post('/mokepon/:jugadorId', (req, res) => {
    const jugadorId = req.params.jugadorId || '';
    const nombre = req.body.Fakepon || '';
    const fakepon = new Fakepon(nombre);
    const jugadorIndex = jugadores.findIndex((jugador) => jugador.id === jugadorId);
    if (jugadorIndex >= 0) {
        jugadores[jugadorIndex].asiganarFakepon(fakepon);
    }
    console.log(jugadores);
    console.log(jugadorId);
    res.end()
});


app.listen(8080, () => {
    console.log('Servidor escuchando en el puerto 8080');
});