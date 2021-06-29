const express = require("express");
const router = express.Router();
const db = require("../../basedatos");
const { isLoggedIn } = require("../../lib/auth");

/*Asignar rol al cliente */
router.post("/asignar/:id", isLoggedIn, async (req, res) => {
  let { id } = req.params;
  let { radio } = req.body;
  const datos = await db.query("SELECT * FROM tbl_cliente_rol WHERE cli_id=?", [
    id,
  ]);
  const cliente = await db.query(
    "SELECT * FROM tbl_cliente WHERE tbl_cliente.cli_id=?",
    id
  );
  if (radio) {
    if (datos[0]) {
      const temp = { rol_id: radio[0] };

      const resul = await db.query(
        "UPDATE tbl_cliente_rol set ? WHERE cli_id = ?",
        [temp, id]
      );
      if (resul.affectedRows == 1) {
        const respuesta = {
          response: "success",
          mensaje:
            "Se asigno un rol al cliente : " +
            cliente[0].cli_nombre +
            " " +
            cliente[0].cli_apellido,
        };
        res.json(respuesta);
      }
    } else {
      const temp = { rol_id: radio[0], cli_id: id, cli_estado: 1 };
      const resul = await db.query("INSERT INTO tbl_cliente_rol set ?", [temp]);
      if (resul.affectedRows == 1) {
        const respuesta = {
          response: "success",
          mensaje:
            "Se asigno un rol al cliente : " +
            cliente[0].cli_nombre +
            " " +
            cliente[0].cli_apellido,
        };
        res.json(respuesta);
      }
    }
  } else {
    const respuesta = {
      response: "warning",
      mensaje:
        "No se asigno ningun al rol al cliente : " +
        cliente[0].cli_nombre +
        " " +
        cliente[0].cli_apellido,
    };
    res.json(respuesta);
  }
});
/*Mostrar rol al cliente */
router.get("/asignar/:id", isLoggedIn, async (req, res) => {
  const { id } = req.params;
  const roles = await db.query(
    "SELECT * FROM tbl_rol WHERE tbl_rol.rol_estado=?",
    [1]
  );
  const tamanio = await db.query(
    "SELECT COUNT(*) AS 'tamanio' FROM tbl_rol WHERE tbl_rol.rol_estado=?",
    [1]
  );
  const rol_cliente = await db.query(
    "SELECT *, COUNT(*)  AS 'tamanio'FROM tbl_cliente_rol WHERE tbl_cliente_rol.cli_id=?",
    [id]
  );
  const cliente = await db.query(
    "SELECT * FROM tbl_cliente WHERE tbl_cliente.cli_id=?",
    id
  );

  var datos = [];
  var aux;
  for (var i = 0; i < tamanio[0].tamanio; i++) {
    const tem_rol = roles[i].rol_id;
    const aux_tem = rol_cliente[0].rol_id;
    if (tem_rol == aux_tem) {
      aux = {
        id: roles[i].rol_id,
        nombre: roles[i].rol_nombre,
        verificador: 1,
        cliente: cliente[0].cli_nombre + " " + cliente[0].cli_apellido,
      };
    } else {
      aux = {
        id: roles[i].rol_id,
        nombre: roles[i].rol_nombre,
        verificador: 0,
        cliente: cliente[0].cli_nombre + " " + cliente[0].cli_apellido,
      };
    }
    datos[i] = aux;
  }
  res.json(datos);
});

module.exports = router;
