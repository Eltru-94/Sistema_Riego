const express = require("express");
const router = express.Router();
const db = require("../../basedatos");
const { isLoggedIn } = require("../../lib/auth");
const { sensores } = require('../../lib/Sensores');
/*Vista Roles index */
router.get("/", isLoggedIn, async (req, res) => {
  sensores.mensaje_valvula = "Lista de roles";
  sensores.titulo="Roles",
  res.render("admin/rol/index", { layout: "admin" });
});
/*Selecion de datos tabla roles cuando es estado sea igaul 1 */
router.get("/roles", isLoggedIn, async (req, res) => {
  const roles = await db.query(
    "SELECT * FROM tbl_rol WHERE tbl_rol.rol_estado =?",
    1
  );
  res.json(roles);
});
/*Buscar rol en la tabla*/
router.post("/buscar", isLoggedIn, async (req, res) => {
  const { buscar } = req.body;
  const tem = "%" + buscar + "%";
  const roles = await db.query(
    "SELECT * FROM tbl_rol WHERE tbl_rol.rol_nombre LIKE ?",
    [tem]
  );
  res.json(roles);
});
/* Vista asignar modulos al rol */
router.get("/asignarRolModulo/:id", isLoggedIn, async (req, res) => {
  const { id } = req.params;
  const modulos = await db.query(
    "SELECT * FROM tbl_modulo WHERE tbl_modulo.mod_estado=?",
    1
  );
  const rol_nombre = await db.query(
    "SELECT * FROM tbl_rol WHERE tbl_rol.rol_id=?",
    id
  );

  const tam_modulos = await db.query(
    "SELECT COUNT(*) AS 'tam_mod' FROM tbl_modulo WHERE tbl_modulo.mod_estado=?",
    1
  );
  const rol_mod = await db.query(
    "SELECT * FROM tbl_rol_modulo WHERE tbl_rol_modulo.rol_id=? AND tbl_rol_modulo.rol_mod_estado = ?",
    [id, 1]
  );
  const tam_rol_mod = await db.query(
    "SELECT COUNT(*) AS 'tam_rol_mod' FROM tbl_rol_modulo WHERE tbl_rol_modulo.rol_id=? AND tbl_rol_modulo.rol_mod_estado = ?",
    [id, 1]
  );
  const a = [];
  var aux = 0;
  for (var i = 0; i < tam_modulos[0].tam_mod; i++) {
    for (var j = 0; j < tam_rol_mod[0].tam_rol_mod; j++) {
      if (modulos[i].mod_id == rol_mod[j].mod_id) {
        aux = 1;
        const newrol = {
          mod_id: modulos[i].mod_id,
          mod_modulo: modulos[i].mod_modulo,
          mod_temp: 1,
          rol: rol_nombre[0].rol_nombre,
        };
        a[i] = newrol;
      }
    }
    if (aux == 0) {
      const newrol = {
        mod_id: modulos[i].mod_id,
        mod_modulo: modulos[i].mod_modulo,
        mod_temp: 0,
        rol: rol_nombre[0].rol_nombre,
      };
      a[i] = newrol;
    }
    aux = 0;
  }
  res.json(a);
});
/* Asignar modulos al rol */
router.post("/asignarRolModulo/:id", isLoggedIn, async (req, res) => {
  const checkbox = req.body.checkbox;
  const { id } = req.params;
  const rol_mod = await db.query(
    "SELECT * FROM tbl_rol_modulo WHERE tbl_rol_modulo.rol_id=?",
    [id]
  );
  const rol_nombre = await db.query(
    "SELECT * FROM tbl_rol WHERE tbl_rol.rol_id=?",
    id
  );
  const tam = await db.query(
    "SELECT COUNT(*) AS 'tamanio' FROM tbl_rol_modulo WHERE tbl_rol_modulo.rol_id=?",
    [id]
  );
  if (checkbox) {
    const tam_rol_mod = await db.query(
      "SELECT COUNT(*) AS 'tam_rol_mod' FROM tbl_rol_modulo WHERE tbl_rol_modulo.rol_id=?",
      [id]
    );
    const cantidad = tam_rol_mod[0].tam_rol_mod;
    const box_selec = checkbox.length;
    if (cantidad != 0) {
      for (var i = 0; i < box_selec; i++) {
        const tem_mod_id = parseInt(checkbox[i]);
        const ver = await db.query(
          "SELECT *, COUNT(*) AS 'tamanio' FROM tbl_rol_modulo WHERE tbl_rol_modulo.rol_id=? AND tbl_rol_modulo.mod_id=?",
          [id, tem_mod_id]
        );
        if (ver[0].tamanio == 0) {
          //Crear
          const new_rol_mod = {
            rol_id: id,
            mod_id: tem_mod_id,
            rol_mod_estado: 1,
          };
          console.log("Sssssss")
          console.log(new_rol_mod);
          await db.query("INSERT INTO tbl_rol_modulo set ?", [new_rol_mod]);
        }
      }

      for (var i = 0; i < tam[0].tamanio; i++) {
        var aux_mod_id = rol_mod[i].mod_id;
        var ver = false;

        for (var j = 0; j < box_selec; j++) {
          const temp_mod_id = checkbox[j];
          if (temp_mod_id == aux_mod_id) {
            ver = true;
            aux_mod_id = parseInt(temp_mod_id);
          }
        }
        if (ver) {
          //Actualizar
          const temp = { rol_mod_estado: 1 };
          await db.query(
            "UPDATE tbl_rol_modulo set ? WHERE tbl_rol_modulo.mod_id = ? AND tbl_rol_modulo.rol_id=?",
            [temp, aux_mod_id, id]
          );
        } else {
          //Actualizar

          const temp = { rol_mod_estado: 0 };
          await db.query(
            "UPDATE tbl_rol_modulo set ? WHERE tbl_rol_modulo.mod_id = ? AND tbl_rol_modulo.rol_id=?",
            [temp, aux_mod_id, id]
          );
        }
      }
    } else {
      for (var i = 0; i < box_selec; i++) {
        //Crear
        const mod_id = checkbox[i];
        const new_rol_mod = {
          rol_id: id,
          mod_id: mod_id,
          rol_mod_estado: 1,
        };
        await db.query("INSERT INTO tbl_rol_modulo set ?", [new_rol_mod]);
        console.log(new_rol_mod);
      }
    }
    const respuesta = {
      response: "success",
      mensaje:
        "Se asigno correctamente modulos al rol : " + rol_nombre[0].rol_nombre,
    };
    res.json(respuesta);
  } else {
    if (tam[0].tamanio) {
      const temp = { rol_mod_estado: 0 };
      for (let i = 0; i < tam[0].tamanio; i++) {
        var aux_mod_id = rol_mod[i].mod_id;
        await db.query(
          "UPDATE tbl_rol_modulo set ? WHERE tbl_rol_modulo.mod_id = ? AND tbl_rol_modulo.rol_id=?",
          [temp, aux_mod_id, id]
        );
      }
      const respuesta = {
        response: "warning",
        mensaje:
          "No se asigno ningún modulo al rol : " + rol_nombre[0].rol_nombre,
      };
      res.json(respuesta);
    } else {
      const respuesta = {
        response: "warning",
        mensaje:
          "No se asigno ningun modulo al rol : " + rol_nombre[0].rol_nombre,
      };
      res.json(respuesta);
    }
  }
});
/*Crer un rol */
router.post("/crear", isLoggedIn, async (req, res) => {
  const { rol, descripcion } = req.body;
  const newrol = {
    rol_nombre: rol,
    rol_descripcion: descripcion,
    rol_estado: 1,
  };
  const resul = await db.query("INSERT INTO tbl_rol set ?", [newrol]);
  if (resul.affectedRows == 1) {
    const respuesta = {
      response: "success",
      mensaje: "Rol Creado Correctamente",
    };
    res.json(respuesta);
  }
});
/*Vista Actualizar rol*/
router.get("/actualizar/:id", isLoggedIn, async (req, res) => {
  const { id } = req.params;
  const rol = await db.query("SELECT * FROM tbl_rol WHERE tbl_rol.rol_id = ?", [
    id,
  ]);
  res.json(rol[0]);
});
/*Actualizar rol*/
router.post("/actualizar/:id", isLoggedIn, async (req, res) => {
  const { id } = req.params;
  const { rol, descripcion } = req.body;
  const newrol = {
    rol_nombre: rol,
    rol_descripcion: descripcion,
  };
  const resul = await db.query(
    "UPDATE tbl_rol set ? WHERE tbl_rol.rol_id = ?",
    [newrol, id]
  );
  if (resul.affectedRows == 1) {
    const respuesta = {
      response: "success",
      mensaje: "Rol Actualizado Correctamente",
    };
    res.json(respuesta);
  }
});
/*Eliminar rol*/
router.get("/eliminar/:id", isLoggedIn, async (req, res) => {
  const { id } = req.params;
  const temp = { rol_estado: 0 };
  const resul = await db.query(
    "UPDATE tbl_rol set ? WHERE tbl_rol.rol_id = ?",
    [temp, id]
  );
  if (resul.affectedRows == 1) {
    const respuesta = {
      response: "success",
      mensaje: "Rol Eliminado Correctamente",
    };
    res.json(respuesta);
  }
});



module.exports = router;
