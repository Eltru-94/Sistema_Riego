const express = require("express");
const router = express.Router();
const db = require("../../basedatos");
const { isLoggedIn } = require("../../lib/auth");
const { sensores } = require('../../lib/Sensores');

router.get("/", isLoggedIn, async (req, res) => {
  sensores.mensaje_valvula = "Actualidad del riego cultivo";
  sensores.titulo = "Programar Riego",

    res.render("cultivo/RiegoCultivo", { layout: "admin" });

});

router.get("/Lista/:id", isLoggedIn, async (req, res) => {
  const { id } = req.params;
  const lista = await db.query("SELECT tbl_riego.riego_humedad_relativa, tbl_riego.riego_hora_inicio,tbl_riego.riego_humedad_suelo,tbl_riego.riego_temperatura, tbl_riego.riego_hora_fin, tbl_cultivo.cul_nombre, tbl_riego.riego_tipo,   IF(tbl_riego.riego_tipo=2, 'AUTOMATICO', 'MANUAL')AS 'riego_tipo',  IF(tbl_riego.riego_estado=0, 'REGADO', 'REGANDO..')AS 'riego_estado', tbl_riego.riego_fecha FROM tbl_riego INNER JOIN tbl_riego_cultivo ON (tbl_riego.riego_cul_id = tbl_riego_cultivo.riego_cul_id) INNER JOIN tbl_cultivo ON (tbl_riego_cultivo.cul_id = tbl_cultivo.cul_id) INNER JOIN tbl_cliente ON (tbl_riego_cultivo.cli_id = tbl_cliente.cli_id) WHERE tbl_cliente.cli_id = ?",
    [id]
  );
  res.json(lista);
})

router.post("/Buscar", isLoggedIn, async (req, res) => {

  const { fecha, Tipo } = req.body;
  const lista = await db.query("SELECT tbl_riego.riego_humedad_relativa, tbl_riego.riego_hora_inicio,tbl_riego.riego_humedad_suelo,tbl_riego.riego_temperatura, tbl_riego.riego_hora_fin, tbl_cultivo.cul_nombre, tbl_riego.riego_tipo,   IF(tbl_riego.riego_tipo=2, 'AUTOMATICO', 'MANUAL')AS 'riego_tipo',  IF(tbl_riego.riego_estado=0, 'REGADO', 'REGANDO..')AS 'riego_estado', tbl_riego.riego_fecha FROM tbl_riego INNER JOIN tbl_riego_cultivo ON (tbl_riego.riego_cul_id = tbl_riego_cultivo.riego_cul_id) INNER JOIN tbl_cultivo ON (tbl_riego_cultivo.cul_id = tbl_cultivo.cul_id) INNER JOIN tbl_cliente ON (tbl_riego_cultivo.cli_id = tbl_cliente.cli_id) WHERE tbl_riego.riego_fecha = ? AND tbl_riego.riego_tipo=?",
    [fecha, Tipo]
  );
  res.json(lista);
})


router.get("/DatosCultivoRiego/:id", async (req, res) => {
  const {id} = req.params;
  const riego_cul_id=id;
  
  const DatosCultivoRiego = await db.query("SELECT * FROM tbl_cultivo INNER JOIN tbl_riego_cultivo ON (tbl_cultivo.cul_id = tbl_riego_cultivo.cul_id) WHERE tbl_riego_cultivo.riego_cul_id=? AND tbl_riego_cultivo.riego_cul_estado=?", [riego_cul_id, 1])
  console.log(DatosCultivoRiego)
  res.json(DatosCultivoRiego);

});

module.exports = router;