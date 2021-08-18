const express = require("express");
const router = express.Router();
const db = require("../../basedatos");
const { isLoggedIn } = require("../../lib/auth");
const helpers = require("../../lib/helpers");
const { sensores } = require("../../lib/Sensores");


router.get("/", isLoggedIn, async (req, res) => {
  mensaje();
  res.render("GestionDatosClima/humedadSuelo", { layout: "admin" });
})

router.get("/SelectHumedad", isLoggedIn, async (req, res) => {
  const humedad = await db.query(
    "SELECT * FROM tbl_humedad_suelo h WHERE h.hum_sue_estado =? ORDER BY h.hum_sue_fecha  DESC LIMIT 10 AND h.hum_sue_estado =?",
    1
  );

  res.json(humedad);
});

router.post("/Crear", isLoggedIn, async (req, res) => {
  const { humedad_a, humedad_b, fecha, hora } = req.body;
  const newhumedad = {
    hum_sue_nodo_a: humedad_a,
    hum_sue_nodo_b: humedad_b,
    hum_sue_hora: hora,
    hum_sue_fecha: fecha,
    hum_sue_estado: 1,
  };



  const query = await db.query("INSERT INTO tbl_humedad_suelo set ?", [newhumedad]);
  if (query.affectedRows == 1) {
    const respuesta = {
      response: "success",
      mensaje: "Humedad reguistrado correctamente",
    };
    res.json(respuesta);
  }

});

router.get("/Actualizar/:id", isLoggedIn, async (req, res) => {
  const { id } = req.params;
  const modulo = await db.query(
    "SELECT * FROM tbl_humedad_suelo h WHERE h.hum_sue_id = ? ",
    [id]
  );
  res.json(modulo[0]);
});

router.post("/Actualizar/:id", isLoggedIn, async (req, res) => {
  const { id } = req.params;
  const { humedad_a, humedad_b, fecha, hora } = req.body;
  const newhumedad = {
    hum_sue_nodo_a: humedad_a,
    hum_sue_nodo_b: humedad_b,
    hum_sue_hora: hora,
    hum_sue_fecha: fecha,
    hum_sue_estado: 1,
  };

  const query = await db.query(
    "UPDATE tbl_humedad_suelo h set ? WHERE h.hum_sue_id = ?",
    [newhumedad, id]
  );
  if (query.affectedRows == 1) {
    const respuesta = {
      response: "success",
      mensaje: "Humedad Actualizado Correctamente",
    };
    res.json(respuesta);
  }
});


router.get("/Eliminar/:id", isLoggedIn, async (req, res) => {

  const { id } = req.params;
  const temp = { hum_sue_estado: 0 };
  const del = await db.query(
    "UPDATE tbl_humedad_suelo set ? WHERE tbl_humedad_suelo.hum_sue_id = ?",
    [temp, id]
  );
  if (del.affectedRows == 1) {
    const respuesta = { response: "success", mensaje: "Humedad suelo Eliminado Correctamente" };
    res.json(respuesta);
  }
});

router.post("/ListaHumedadFecha", isLoggedIn, async (req, res) => {
  const { fecha } = req.body;
  const humedad = await db.query(
    "SELECT * FROM tbl_humedad_suelo h WHERE h.hum_sue_fecha =? AND h.hum_sue_estado =? ORDER BY h.hum_sue_hora ",
    [fecha, 1]
  );
  res.json(humedad);
});

router.post("/nodo", isLoggedIn, async (req, res) => {
  const { fecha } = req.body;
  const H_media = await db.query(
    "SELECT AVG(h.hum_sue_nodo_a) AS 'nodo_a',AVG(h.hum_sue_nodo_b) AS 'nodo_b'FROM tbl_humedad_suelo h  WHERE h.hum_sue_fecha =? AND h.hum_sue_estado =?",
    [fecha, 1]
  );
  res.json(H_media[0]);
});

router.post("/CalculosDatos", isLoggedIn, async (req, res) => {
  const { fecha } = req.body;
  const H_claculos = await db.query(
    "SELECT AVG(tbl_humedad_suelo.hum_sue_nodo_a) AS 'pro_nodo_a', MAX(tbl_humedad_suelo.hum_sue_nodo_a) AS 'max_nodo_a', MIN(tbl_humedad_suelo.hum_sue_nodo_a) AS 'min_nodo_a', AVG(tbl_humedad_suelo.hum_sue_nodo_b) AS 'pro_nodo_b', MAX(tbl_humedad_suelo.hum_sue_nodo_b) AS 'max_nodo_b', MIN(tbl_humedad_suelo.hum_sue_nodo_b) AS 'min_nodo_b' FROM tbl_humedad_suelo WHERE tbl_humedad_suelo.hum_sue_fecha=?", [fecha, 1]
  );
  res.json(H_claculos[0]);
});
;
function mensaje() {
  sensores.titulo = "Sensor Humedad Suelo";


  sensores.mensaje_valvula = "Humedad Suelo";
}

router.get("/ConectarSuelo", isLoggedIn, async (req, res) => {

  sensores.humedad_suelo = 1;
  if (sensores.humedad_suelo) {
    const respuesta = {
      response: "success",
      mensaje: "Sensor Humedad suelo Conectado con exito",
    };
    res.json(respuesta);
  }
});

router.get("/DesconectarSuelo", isLoggedIn, async (req, res) => {

  sensores.humedad_suelo = 0;
  if (!sensores.humedad_suelo) {
    const respuesta = {
      response: "success",
      mensaje: "Sensor humedad suelo desconectado con exito",
    };
    res.json(respuesta);
  }
});

module.exports = router;
