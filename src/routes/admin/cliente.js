const express = require("express");
const router = express.Router();
const db = require("../../basedatos");
const { isLoggedIn } = require("../../lib/auth");
const helpers = require("../../lib/helpers");
const { sensores } = require('../../lib/Sensores');

//Index cliente
router.get("/", isLoggedIn, async (req, res) => {
  sensores.mensaje_valvula = "Lista Usuarios";
  sensores.titulo = "Usuarios",
    res.render("admin/cliente/index", { layout: "admin" });
});

//Index Actualizar Cliente
router.get("/actualizar/:id", isLoggedIn, async (req, res) => {
  const { id } = req.params;
  const cliente = await db.query(
    "SELECT * FROM tbl_cliente INNER JOIN tbl_usuario ON (tbl_cliente.cli_id=tbl_usuario.cli_id) WHERE tbl_cliente.cli_id = ?",
    [id]
  );
  res.json(cliente[0]);
});

//ajax crear usuario
router.get("/crear", isLoggedIn, async (req, res) => {
  res.send("hola");
});
//Crear cliente
router.post("/crear", isLoggedIn, async (req, res) => {
  const {
    nombre,
    apellido,
    cedula,
    telefono,
    correo,
    usuario,
    contraseña,
    rol
  } = req.body;

  const newcliente = {
    cli_nombre: nombre,
    cli_apellido: apellido,
    cli_cedula: cedula,
    cli_telefono: telefono,
    cli_correo: correo,
    cli_estado: 1
  };
  const insert_cliente = await db.query("INSERT INTO tbl_cliente set ?", [
    newcliente,
  ]);

  if (insert_cliente.affectedRows == 1) {
    const insertId = insert_cliente.insertId;
    const newusuario = {
      usu_nombre: usuario,
      usu_contraseña: await helpers.cifrarclave(contraseña),
      usu_estado: 1,
      cli_id: insertId,
    };
    const newrolcliente = {
      rol_id: rol,
      cli_id: insertId,
      cli_estado: 1
    };
    const insert_usuario = await db.query("INSERT INTO tbl_usuario set ?", [
      newusuario,
    ]);
    const insert_rol_cliente = await db.query("INSERT INTO tbl_cliente_rol set ?", [
      newrolcliente,
    ]);
    if (insert_usuario.affectedRows == 1 && insert_rol_cliente.affectedRows == 1) {
      const respuesta = { response: "success", mensaje: "Usuario Ingresado" };
      res.json(respuesta);
    }
  }

});

//lista clientes
router.get("/clientes", isLoggedIn, async (req, res) => {
  const clientes = await db.query(
    "SELECT tbl_cliente.cli_id,tbl_cliente.cli_nombre,tbl_cliente.cli_apellido,tbl_cliente.cli_cedula,tbl_cliente.cli_telefono,tbl_cliente.cli_correo,tbl_rol.rol_nombre,tbl_usuario.usu_nombre FROM tbl_cliente INNER JOIN tbl_usuario ON (tbl_cliente.cli_id = tbl_usuario.cli_id) LEFT  JOIN tbl_cliente_rol ON (tbl_cliente.cli_id = tbl_cliente_rol.cli_rol_id) LEFT  JOIN tbl_rol ON (tbl_cliente_rol.rol_id = tbl_rol.rol_id) WHERE tbl_cliente.cli_estado=?",
    1
  );
  res.json(clientes);
});
//Actualizar cliente
router.post("/actualizar/:id", isLoggedIn, async (req, res) => {
  const { id } = req.params;
  const {
    nombre,
    apellido,
    cedula,
    telefono,
    correo,
    usuario,
    contraseña,
    rol,
  } = req.body;

  var newuser;
  if (contraseña.length == 0) {
    newuser = {
      usu_nombre: usuario,
    };
  } else {
    newuser = {
      usu_nombre: usuario,
      usu_contraseña: await helpers.cifrarclave(contraseña),
    };
  }
  const newcliente = {
    cli_nombre: nombre,
    cli_apellido: apellido,
    cli_cedula: cedula,
    cli_telefono: telefono,
    cli_correo: correo,
    cli_estado: 1,
  };
  const newrol = {
    rol_id: rol,
  }
  const query = await db.query(
    "UPDATE tbl_cliente set ? WHERE tbl_cliente.cli_id = ?",
    [newcliente, id]
  );
  const query1 = await db.query(
    "UPDATE tbl_usuario set ? WHERE tbl_usuario.cli_id = ?",
    [newuser, id]
  );

  const query2 = await db.query(
    "UPDATE tbl_cliente_rol set ? WHERE tbl_cliente_rol.cli_id = ?",
    [newrol, id]
  );



  if (query.affectedRows == 1 && query1.affectedRows == 1 && query2.affectedRows == 1) {
    const respuesta = { response: "success", mensaje: "Usuario Actualizado" };
    res.json(respuesta);
  }
});
//Buscar clientes tabla
router.post("/buscar", isLoggedIn, async (req, res) => {
  const { buscar } = req.body;
  const tem = "%" + buscar + "%";
  const clientes = await db.query(
    "SELECT tbl_cliente.cli_id,tbl_cliente.cli_nombre,tbl_cliente.cli_apellido,tbl_cliente.cli_cedula,tbl_cliente.cli_telefono,tbl_cliente.cli_correo,tbl_rol.rol_nombre,tbl_usuario.usu_nombre FROM tbl_cliente INNER JOIN tbl_usuario ON (tbl_cliente.cli_id = tbl_usuario.cli_id) LEFT  JOIN tbl_cliente_rol ON (tbl_cliente.cli_id = tbl_cliente_rol.cli_rol_id) LEFT  JOIN tbl_rol ON (tbl_cliente_rol.rol_id = tbl_rol.rol_id)  WHERE tbl_cliente.cli_nombre LIKE ?",
    [tem]
  );
  res.json(clientes);

});
//Eliminar clientes
router.get("/eliminar/:id", isLoggedIn, async (req, res) => {
  const { id } = req.params;
  const temp = { cli_estado: 0 };
  const query = await db.query(
    "UPDATE tbl_cliente set ? WHERE tbl_cliente.cli_id = ?",
    [temp, id]
  );
  if (query.affectedRows == 1) {
    const respuesta = { response: "success", mensaje: "Usuario Eliminado" };
    res.json(respuesta);
  }
});



module.exports = router;
