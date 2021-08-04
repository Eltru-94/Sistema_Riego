const express = require("express");
const router = express.Router();
const db = require("../../basedatos");
const { isLoggedIn } = require("../../lib/auth");
const { sensores } = require('../../lib/Sensores');

router.get("/", isLoggedIn, async (req, res) => {

    sensores.mensaje_valvula = "Volumen de agua de un cultivo";


    sensores.titulo = "Volumen de agua";
    res.render("Graficos/humedadHR", { layout: "admin" });

});

router.get("/HRP", isLoggedIn, async (req) => {

    const fecha = "2021-08-04";






 



})




module.exports = router;