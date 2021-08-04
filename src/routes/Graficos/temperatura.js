const express = require("express");
const router = express.Router();
const db = require("../../basedatos");
const { isLoggedIn } = require("../../lib/auth");
const { sensores } = require('../../lib/Sensores');

router.get("/", isLoggedIn, async (req, res) => {

    sensores.mensaje_valvula = "Seguimiento del cultivo";


    sensores.titulo = "Seguimiento Cultivo";
    res.render("Graficos/temperatura", { layout: "admin" });

});




module.exports = router;