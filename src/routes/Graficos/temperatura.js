const express = require("express");
const router = express.Router();
const db = require("../../basedatos");
const { isLoggedIn } = require("../../lib/auth");
const { sensores } = require('../../lib/Sensores');

router.get("/", isLoggedIn, async (req, res) => {
    if (sensores.temperuta_a != 0) {
        sensores.mensaje_valvula = "Gráfica temperatura cultivo : " + sensores.temperuta_a + "° C";
    } else {
        sensores.mensaje_valvula = "Gráfica temperatura : NC";
    }

    sensores.titulo = "Gráfica temperatura";
    res.render("Graficos/temperatura", { layout: "admin" });

});




module.exports = router;