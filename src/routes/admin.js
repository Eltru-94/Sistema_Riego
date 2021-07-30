const express = require("express");
const router = express.Router();
const db = require("../basedatos");
const passport = require("passport");
const { isLoggedIn, isNotLoggedIn } = require("../lib/auth");
const { sensores } = require('../lib/Sensores');

router.get("/", isLoggedIn, async (req, res) => {
  sensores.mensaje_valvula = "Inicio sistema de riego";
  sensores.titulo="Administrativo";
  res.render("admin", { layout: "admin"});
});

router.get("/cerrar", (req, res) => {
  req.logOut();
  res.redirect("/login");
});

module.exports = router;
