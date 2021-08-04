const express = require("express");
const router = express.Router();
const db = require("../../basedatos");
const { isLoggedIn } = require("../../lib/auth");
const { sensores } = require('../../lib/Sensores');

router.get("/", isLoggedIn, async (req, res) => {

    sensores.mensaje_valvula = "Seguimiento de riego en el cultivo";
    sensores.titulo = "Seguimiento R Cultivo";
    res.render("Graficos/temperatura", { layout: "admin" });
});

module.exports = router;