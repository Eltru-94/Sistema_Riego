const express = require("express");
const router = express.Router();
const db = require("../../basedatos");
const { isLoggedIn } = require("../../lib/auth");
const helpers = require("../../lib/helpers");
const { sensores } = require('../../lib/Sensores');
router.get("/", isLoggedIn, async (req, res) => {
  mensaje();
  res.render("GestionDatosClima/index", { layout: "admin" });
});

router.get("/ListaTem", isLoggedIn, async (req, res) => {

  const tem = await db.query(
    "SELECT * FROM tbl_temperatura t WHERE t.tem_estado =? ORDER BY t.tem_fecha DESC LIMIT 10",
    1
  );
  res.json(tem);
});

router.post("/Crear", isLoggedIn, async (req, res) => {
  const { temperatura, fecha, hora } = req.body;
  const newtemperatura = {
    tem_temperatura: temperatura,
    tem_fecha: fecha,
    tem_hora: hora,
    tem_estado: 1,
  };

  const query = await db.query("INSERT INTO tbl_temperatura set ?", [newtemperatura]);
  if (query.affectedRows == 1) {
    const respuesta = {
      response: "success",
      mensaje: "Temperatura reguistrada correctamente",
    };
    res.json(respuesta);
  }

});


router.get("/Actualizar/:id", isLoggedIn, async (req, res) => {
  const { id } = req.params;
  const modulo = await db.query(
    "SELECT * FROM tbl_temperatura t WHERE t.tem_id = ?",
    [id]
  );
  res.json(modulo[0]);
});

router.post("/Actualizar/:id", isLoggedIn, async (req, res) => {
  const { id } = req.params;
  const { temperatura, fecha, hora } = req.body;
  const newtemperatura = {
    tem_temperatura: temperatura,
    tem_fecha: fecha,
    tem_hora: hora,
    tem_estado: 1,
  };

  const query = await db.query(
    "UPDATE tbl_temperatura t set ? WHERE t.tem_id = ?",
    [newtemperatura, id]
  );
  if (query.affectedRows == 1) {
    const respuesta = {
      response: "success",
      mensaje: "Temperatura Actualizado Correctamente",
    };
    res.json(respuesta);
  }
});


router.get("/Eliminar/:id", isLoggedIn, async (req, res) => {
  const { id } = req.params;
  const temp = { tem_estado: 0 };
  const query = await db.query(
    "UPDATE tbl_temperatura t set ? WHERE t.tem_id = ?",
    [temp, id]
  );
  if (query.affectedRows == 1) {
    const respuesta = { response: "success", mensaje: "La temperatura se Eliminado Correctamente" };
    res.json(respuesta);
  }
});



router.post("/HumedadMaxima", isLoggedIn, async (req, res) => {
  const { fecha } = req.body;
  const H_maxima = await db.query(
    "SELECT MAX(t.tem_temperatura) AS 'temperatura_maxima' FROM tbl_temperatura t WHERE t.tem_fecha =? AND t.tem_estado =?",
    [fecha, 1]


  );
  res.json(H_maxima[0]);
});

router.post("/HumedadMinima", isLoggedIn, async (req, res) => {
  const { fecha } = req.body;
  const H_minima = await db.query(
    "SELECT MIN(t.tem_temperatura) AS 'temperatura_minima' FROM tbl_temperatura t WHERE t.tem_fecha =? AND t.tem_estado =?",
    [fecha, 1]
  );
  res.json(H_minima[0]);
});

router.post("/HumedadMedia", isLoggedIn, async (req, res) => {
  const { fecha } = req.body;
  const H_media = await db.query(
    "SELECT AVG(t.tem_temperatura) AS 'temperatura_media' FROM tbl_temperatura t WHERE t.tem_fecha =? AND t.tem_estado =?",
    [fecha, 1]
  );
  res.json(H_media[0]);
});
router.post("/ListaTemperatura", isLoggedIn, async (req, res) => {
  const { fecha } = req.body;
  const temperatura = await db.query(
    "SELECT * FROM tbl_temperatura t WHERE t.tem_fecha =? AND t.tem_estado =? ORDER BY t.tem_hora ",
    [fecha, 1]
  );

  res.json(temperatura);
});

function mensaje() {
  sensores.titulo = "Sensor Temperatura";

  sensores.mensaje_valvula = "Datos Temperatura ";

}

router.get("/ConectarTemperatura", isLoggedIn, async (req, res) => {

  sensores.temperatura_estado = 1;
  if (sensores.temperatura_estado) {
    const respuesta = {
      response: "success",
      mensaje: "Humedad relativa Conectado con exito",
    };
    res.json(respuesta);
  }
});

router.get("/DesconectarTemperatuara", isLoggedIn, async (req, res) => {

  sensores.temperatura_estado = 0;
  if (!sensores.temperatura_estado) {
    const respuesta = {
      response: "success",
      mensaje: "Humedad relativa desconectado con exito",
    };
    res.json(respuesta);
  }
});


module.exports = router;
