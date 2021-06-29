const express = require("express");
const router = express.Router();
const db = require("../../basedatos");
const { isLoggedIn } = require("../../lib/auth");
/*Vista index modulo*/
router.get("/", isLoggedIn, async (req, res) => {
  res.render("admin/modulo/index", { layout: "admin" });
});
/*Crear modulo*/
router.post("/crear", isLoggedIn, async (req, res) => {
  const { modulo, descripcion } = req.body;
  const newmodulo = {
    mod_modulo: modulo,
    mod_descripcion: descripcion,
    mod_estado: 1,
  };
  const mod = await db.query("INSERT INTO tbl_modulo set ?", [newmodulo]);
  if (mod.affectedRows == 1) {
    const respuesta = {
      response: "success",
      mensaje: "Modulo Ingresado correctamente",
    };
    res.json(respuesta);
  }
});
/*Vista Actualizar modulo*/
router.get("/actualizar/:id", isLoggedIn, async (req, res) => {
  const { id } = req.params;
  const modulo = await db.query(
    "SELECT * FROM tbl_modulo WHERE tbl_modulo.mod_id = ?",
    [id]
  );
  res.json(modulo[0]);
});
/*Actualizar modulo*/
router.post("/actualizar/:id", isLoggedIn, async (req, res) => {
  const { id } = req.params;
  const { modulo, descripcion } = req.body;
  const newmodulo = {
    mod_modulo: modulo,
    mod_descripcion: descripcion,
  };
  const mod = await db.query(
    "UPDATE tbl_modulo set ? WHERE tbl_modulo.mod_id = ?",
    [newmodulo, id]
  );
  if (mod.affectedRows == 1) {
    const respuesta = {
      response: "success",
      mensaje: "Modulo Actualizado Correctamente",
    };
    res.json(respuesta);
  }
});
/*Eliminar modulo*/
router.get("/eliminar/:id", isLoggedIn, async (req, res) => {
  const { id } = req.params;
  const temp = { mod_estado: 0 };
  const del = await db.query(
    "UPDATE tbl_modulo set ? WHERE tbl_modulo.mod_id = ?",
    [temp, id]
  );
  if (del.affectedRows == 1) {
    const respuesta = { response: "success", mensaje: "Modulo Eliminado Correctamente" };
    res.json(respuesta);
  }
});
/*Vista lista modulos*/
router.get("/modulos", isLoggedIn, async (req, res) => {
  const modulos = await db.query(
    "SELECT * FROM tbl_modulo WHERE tbl_modulo.mod_estado =?",
    1
  );
  res.json(modulos);
});
/*Buscar modulo*/
router.post("/buscar", isLoggedIn, async (req, res) => {
  const { buscar } = req.body;
  const tem = "%" + buscar + "%";
  const modulos = await db.query(
    "SELECT * FROM tbl_modulo WHERE tbl_modulo.mod_modulo LIKE ?",
    [tem]
  );
  res.json(modulos);
});

module.exports = router;
