const express = require("express");
const router = express.Router();
const SerialConexion = require("../../lib/serialportConexion");


router.get('/', (req, res) => {
   res.render("riego/CalculosRiego", { layout: "admin" });
});





module.exports = router;