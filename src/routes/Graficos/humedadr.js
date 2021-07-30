const express = require("express");
const router = express.Router();
const db = require("../../basedatos");
const { isLoggedIn } = require("../../lib/auth");
const { sensores } = require('../../lib/Sensores');

router.get("/", isLoggedIn, async (req, res) => {
    if (sensores.humedad_relativa != 0) {
        sensores.mensaje_valvula = "Gráfica HR cultivo : " + sensores.humedad_relativa+ "° C";
    } else {
        sensores.mensaje_valvula = "Gráfica HR: NC";
    }

    sensores.titulo = "Gráfica HR";
    res.render("Graficos/humedadHR", { layout: "admin" });

});




module.exports = router;