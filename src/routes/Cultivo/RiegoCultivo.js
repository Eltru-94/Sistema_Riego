const express = require("express");
const router = express.Router();
const db = require("../../basedatos");
const { isLoggedIn } = require("../../lib/auth");

router.get("/",isLoggedIn,async(req,res)=>{

    res.render("cultivo/RiegoCultivo",{layout:"admin"});

});

router.get("/Lista/:id",isLoggedIn,async(req,res)=>{
    const { id } = req.params;

  
    const lista = await db.query("SELECT tbl_riego.riego_hora_inicio, tbl_riego.riego_hora_fin, tbl_cultivo.cul_nombre, tbl_cliente.cli_nombre, tbl_cliente.cli_apellido, tbl_riego.riego_tipo,   IF(tbl_riego.riego_tipo=0, 'AUTOMATICO', 'MANUAL')AS 'riego_tipo',  tbl_riego.riego_fecha FROM tbl_riego INNER JOIN tbl_riego_cultivo ON (tbl_riego.riego_cul_id = tbl_riego_cultivo.riego_cul_id) INNER JOIN tbl_cultivo ON (tbl_riego_cultivo.cul_id = tbl_cultivo.cul_id) INNER JOIN tbl_cliente ON (tbl_riego_cultivo.cli_id = tbl_cliente.cli_id) WHERE tbl_cliente.cli_id = ?",
      [id]
    );
   
    console.log(lista),
    res.json(lista);
})


module.exports=router;