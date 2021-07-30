const express = require("express");
const router = express.Router();
const { sensores } = require('../../lib/Sensores');
router.get('/', (req, res) => {
   sensores.mensaje_valvula = "Inicio sistema de riego";
   sensores.titulo="Programar Riego";
   res.render("riego/CalculosRiego", { layout: "admin" });
});





module.exports = router;