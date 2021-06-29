const express = require("express");
const router = express.Router();
const db = require("../basedatos");
const passport = require("passport");
const { isLoggedIn, isNotLoggedIn } = require("../lib/auth");


router.get("/", isLoggedIn, async (req, res) => {
  res.render("admin", { layout: "admin"});
});

router.get("/cerrar", (req, res) => {
  req.logOut();
  res.redirect("/login");
});

module.exports = router;
