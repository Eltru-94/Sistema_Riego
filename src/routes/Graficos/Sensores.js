const express = require("express");
const router = express.Router();
const db = require("../../basedatos");
const { isLoggedIn } = require("../../lib/auth");

router.get("/",isLoggedIn,async(req,res)=>{

    res.render("Graficos/sensores",{layout:"admin"});

});
router.get("/Temperatura",isLoggedIn,async(req,res)=>{

    res.render("Graficos/temperatura",{layout:"admin"});

});

router.get("/humedadHR",isLoggedIn,async(req,res)=>{

    res.render("Graficos/humedadHR",{layout:"admin"});

});


module.exports=router;