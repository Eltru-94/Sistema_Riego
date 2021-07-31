const express = require("express");
const router = express.Router();
const db = require("../../basedatos");
const { isLoggedIn } = require("../../lib/auth");

router.get("/", isLoggedIn, async (req, res) => {
   
    res.render("Formula/", { layout: "admin" });
})


module.exports = router;