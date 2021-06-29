const express = require("express");
const router = express.Router();
const db = require("../basedatos");
const passport = require("passport");
const { isLoggedIn, isNotLoggedIn } = require("../lib/auth");

router.get("/", isNotLoggedIn,(req, res) => {
  res.render("layouts/login", { layout: "login" });
});
router.post("/", (req, res, next) => {
  passport.authenticate("local.login", {
    successRedirect: "/Administrativo",
    failureRedirect: "/login",
    failureFlash: true,
  })(req, res, next);
});

router.get("/admin", isLoggedIn, async (req, res) => {
  res.render("admin", { layout: "admin"});
});

router.get("/cerrar", (req, res) => {
  req.logOut();
  res.redirect("/login");
});

module.exports = router;
