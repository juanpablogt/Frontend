const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 8080;

app.use(cors());
app.use(express.json());

const jugadores = [];

class Jugador {
    constructor(id) {
        this.id = id;
        this.fakepon = null;
        this.x = 0;
        this.y = 0;
        this.enemigoId = null;
        this.enBatalla = false;
        this.ataquesJugador = [];
    }

    asignarFakepon(fakepon) {
        this.fakepon = fakepon;
    }

    actualizarPosicion(x, y) {
        this.x = x;
        this.y = y;
    }

    asignarEnemigo(enemigoId) {
        this.enemigoId = enemigoId;
    }

    empezarBatalla() {
        this.enBatalla = true;
    }

    asignarAtaquesJugador(ataques) {
        this.ataquesJugador = ataques;
    }
}

app.get("/unirse", (req, res) => {
    const id = `${Math.random()}`;
    const jugador = new Jugador(id);
    jugadores.push(jugador);
    res.send(id);
});

app.post("/mokepon/:jugadorId", (req, res) => {
    const jugadorId = req.params.jugadorId;
    const { Fakepon, imagen, vida, ataques } = req.body;

    const jugador = jugadores.find(j => j.id === jugadorId);
    if (jugador) {
        jugador.asignarFakepon({ nombre: Fakepon, imagen, vida, ataques });
    }
    res.end();
});

app.post("/fakepon/:jugadorId/posicion", (req, res) => {
    const jugadorId = req.params.jugadorId;
    const { x, y } = req.body;

    const jugador = jugadores.find(j => j.id === jugadorId);
    if (jugador) {
        jugador.actualizarPosicion(x, y);
    }

    const enemigos = jugadores.filter(j => j.id !== jugadorId && j.fakepon);

    res.send({
        enemigos: enemigos.map(e => ({
            id: e.id,
            fakepon: e.fakepon,
            x: e.x,
            y: e.y
        }))
    });
});

app.post("/fakepon/:jugadorId/batalla", (req, res) => {
    const jugadorId = req.params.jugadorId;
    const { enemigoId } = req.body;

    const jugador = jugadores.find(j => j.id === jugadorId);
    const enemigo = jugadores.find(j => j.id === enemigoId);

    if (jugador && enemigo) {
        jugador.asignarEnemigo(enemigoId);
        enemigo.asignarEnemigo(jugadorId);

        jugador.empezarBatalla();
        enemigo.empezarBatalla();
    }

    res.end();
});

app.get("/fakepon/:jugadorId/estado", (req, res) => {
    const jugadorId = req.params.jugadorId;
    const jugador = jugadores.find(j => j.id === jugadorId);

    if (jugador) {
        const enemigo = jugadores.find(j => j.id === jugador.enemigoId);
        res.send({
            enBatalla: jugador.enBatalla,
            enemigo: enemigo ? enemigo.fakepon : null
        });
    } else {
        res.send({ enBatalla: false });
    }
});

app.post("/fakepon/:jugadorId/ataques", (req, res) => {
    const jugadorId = req.params.jugadorId;
    const { ataques } = req.body;

    const jugador = jugadores.find(j => j.id === jugadorId);
    if (jugador) {
        jugador.asignarAtaquesJugador(ataques);
    }

    res.end();
});

// ✅ NUEVO: Endpoint para obtener ataques del enemigo
app.get("/fakepon/:jugadorId/ataques", (req, res) => {
    const jugadorId = req.params.jugadorId;
    const jugador = jugadores.find(j => j.id === jugadorId);

    if (!jugador) {
        res.status(404).send({ mensaje: "Jugador no encontrado" });
        return;
    }

    const enemigo = jugadores.find(j => j.id === jugador.enemigoId);
    if (!enemigo) {
        res.send({ ataques: [] });
        return;
    }

    res.send({ ataques: enemigo.ataquesJugador || [] });
});

app.listen(PORT, () => {
    console.log(`Servidor funcionando en puerto ${PORT}`);
});
