const express = require("express");
const router = express.Router();
const db = require("../../basedatos");
const { isLoggedIn } = require("../../lib/auth");
const { sensores } = require('../../lib/Sensores');

router.get("/", isLoggedIn, async (req, res) => {

    mensaje();
    sensores.titulo = "Visualización HS";
    res.render("Graficos/sensores", { layout: "admin" });

});

function mensaje() {

    var aux_a = "";
    var aux_b = "";
    if (sensores.humedad_suelo_a == 0) {
        aux_a = "Nodo A no conectado";
    } else {
        aux_a = "Nodo A : " + sensores.humedad_suelo_a + "%";
    }
    if (sensores.humedad_suelo_b == 0) {
        aux_b = "Nodo B no conectado";
    } else {
        aux_b = "Nodo B : " + sensores.humedad_suelo_b + "%";
    }

    sensores.mensaje_valvula = "Gráfica HS " + aux_a + "         " + aux_b;
}


module.exports = router;