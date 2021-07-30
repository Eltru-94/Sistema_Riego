const express = require("express");
const router = express.Router();
const SerialConexion = require("../../lib/serialportConexion");
var verificador = false;
const { sensores } = require('../../lib/Sensores');
const db = require("../../basedatos");
var InsertAutomatico = true;


var valor_aux = "";
router.get('/', (req, res) => {
   sensores.mensaje_valvula = "Programar Riego";
   sensores.titulo = "Programar Riego",
      res.render("riego/", { layout: "admin" });
});

router.get('/conectar/', async (req, res) => {
   const { temperatura_A, humedad_relativa_A, humedad_suelo_nodoA, humedad_suelo_nodoB, fecha_actual} = req.query;
   var hora_actual =horaTiempos();
   sensores.humedad_suelo_a = Math.ceil((humedad_suelo_nodoA * 100) / 1023);
   sensores.humedad_suelo_b = Math.ceil((humedad_suelo_nodoB * 100) / 1023);
   sensores.temperuta_a = temperatura_A;
   sensores.humedad_relativa = humedad_relativa_A;
   sensores.promedio1 = Math.ceil((sensores.humedad_suelo_a + sensores.humedad_suelo_b) / 2);
   sensores.fecha_actual = fecha_actual;
   sensores.hora_actual = hora_actual;
   var hora = hora_actual.split(":");
   if (hora[1] == 59) {
      verificador = true;
   }
   if (hora[0] <= 18 && hora[0] >= 7) {
      if (hora[1] == 0 && verificador) {

         const newhumedad = {
            hum_sue_nodo_a: sensores.humedad_suelo_a,
            hum_sue_nodo_b: sensores.humedad_suelo_b,
            hum_sue_hora: hora_actual,
            hum_sue_fecha: fecha_actual,
            hum_sue_estado: 1,
         };

         const newtemperatura = {
            tem_temperatura: temperatura_A,
            tem_fecha: fecha_actual,
            tem_hora: hora_actual,
            tem_estado: 1,
         };

         const newtHR = {
            hum_rel_valor: humedad_relativa_A,
            hum_rel_fecha: fecha_actual,
            hum_rel_hora: hora_actual,
            hum_rel_estado: 1,
         };

         const query1 = await db.query("INSERT INTO tbl_humedad_suelo set ?", [newhumedad]);
         const query2 = await db.query("INSERT INTO tbl_temperatura set ?", [newtemperatura]);
         const query3 = await db.query("INSERT INTO tbl_humedad_relativa set ?", [newtHR]);
         verificador = false;
         console.log("Guardado con exito");
      }

   }



   if (sensores.estado_automatico == 1) {
      const aux_fecha = sensores.fecha_actual;

      if (sensores.promedio1 > 75) {
         sensores.valvula = 1;
         if (InsertAutomatico) {
            const new_riego = {
               riego_fecha: sensores.fecha_actual,
               riego_hora_inicio: sensores.hora_actual,
               riego_humedad_suelo: sensores.promedio1,
               riego_temperatura: sensores.temperuta_a,
               riego_estado: 1,
               riego_cul_id: sensores.cultivo_id,
               riego_tipo: 2,
               riego_humedad_relativa: sensores.humedad_relativa,
            }
            const query1 = await db.query("INSERT INTO tbl_riego set ?", [new_riego]);
            sensores.riego_id = query1.insertId;
            console.log(new_riego);
            sensores.mensaje_valvula = "Regando cultivo automatico...";
            InsertAutomatico = false;
         }
         sensores.temp_valvula = "Riego Automático ON";
         console.log("riego automatico");
         valor_aux = "#";

      } else if (InsertAutomatico == false) {
         console.log("riego automatico desactivado");
         sensores.temp_valvula = "Riego Automático OFF";
         sensores.valvula = 0;
         InsertAutomatico = true;
         contador = 1;
         sensores.mensaje_valvula = " ";
         const new_riego = {
            riego_hora_fin: sensores.hora_actual,
            riego_estado: 0,
         };
         const query = await db.query(
            "UPDATE tbl_riego set ? WHERE tbl_riego.riego_id = ?",
            [new_riego, sensores.riego_id]
         );
         console.log(new_riego);
         valor_aux = "*";
      }

      console.log("Promedio sensores : " + sensores.promedio1);
   } else if (sensores.estado_manual == 1) {

      sensores.temp_valvula = "Riego Manual ON";
      valor_aux = "#";
   } else if (sensores.estado_manual == 0) {
      sensores.temp_valvula = "Riego Manual OFF"
      valor_aux = "*";
   }
   if (sensores.estado_manual == 0 && sensores.estado_automatico == 0) {
      sensores.temp_valvula = "0FF"
   }
   console.log(horaTiempos());
   res.json(valor_aux);



});
router.get('/ActivarManual/:id', async (req, res) => {
   sensores.temp_valvula = "Riego Manual ONN"
   sensores.estado_manual = 1;
   const aux_fecha = sensores.fecha_actual;
   const { id } = req.params;
   const query1 = await db.query("SELECT * FROM tbl_riego_cultivo WHERE tbl_riego_cultivo.cli_id=? AND tbl_riego_cultivo.riego_cul_estado=?", [id, 1]);
   const query2 = await db.query("SELECT AVG (tbl_humedad_suelo.hum_sue_nodo_a) AS 'nodo_a', AVG (tbl_humedad_suelo.hum_sue_nodo_b) AS 'nodo_b' FROM tbl_humedad_suelo WHERE tbl_humedad_suelo.hum_sue_estado=? AND tbl_humedad_suelo.hum_sue_fecha=?", [1, aux_fecha]);
   const aux_nodo_a = query2[0].nodo_a;
   const aux_nodo_b = query2[0].nodo_b;
   const promedio = Math.ceil((aux_nodo_a + aux_nodo_b) / 2);

   const new_riego = {
      riego_fecha: sensores.fecha_actual,
      riego_hora_inicio: sensores.hora_actual,
      riego_humedad_suelo: promedio,
      riego_temperatura: sensores.temperuta_a,
      riego_estado: 1,
      riego_cul_id: query1[0].riego_cul_id,
      riego_tipo: 1,
      riego_humedad_relativa: sensores.humedad_relativa,
   }
   const query3 = await db.query("INSERT INTO tbl_riego set ?", [new_riego]);

   const respuesta = {
      response: "success",
      mensaje: "Riego Manual Activado",
   };
   res.json(respuesta);

});

router.get('/DesactivarManual/:id', async (req, res) => {
   sensores.temp_valvula = "Riego Manual OFF"
   sensores.estado_manual = 0;
   const { id } = req.params;
   const query1 = await db.query("SELECT * FROM tbl_riego_cultivo WHERE tbl_riego_cultivo.cli_id=? AND tbl_riego_cultivo.riego_cul_estado=?", [id, 1]);
   const newrol = {
      riego_hora_fin: sensores.hora_actual,
      riego_estado: 0,
   };
   const resul = await db.query(
      "UPDATE  tbl_riego set ? WHERE tbl_riego.riego_cul_id = ? AND tbl_riego.riego_estado=?",
      [newrol, query1[0].riego_cul_id, 1]
   );


   const respuesta = {
      response: "success",
      mensaje: "Riego Manual desactivado",
   };
   res.json(respuesta);
});

router.post('/RiegoCultivo', async (req, res) => {

   const { cul_id, cli_id } = req.body;
   const new_riego_cultivo = {
      riego_cul_estado: 1,
      cli_id: cli_id,
      cul_id: cul_id
   };
   const insert_riego_cultivo = await db.query("INSERT INTO tbl_riego_cultivo set ?", [
      new_riego_cultivo
   ]);



   const riego = {
      id: insert_riego_cultivo.insertId
   }
   sensores.cultivo_id = insert_riego_cultivo.insertId;
   sensores.riego_cultivo = 1;

   res.json(riego)

});

router.get("/ListaRiegoCultivo/:id", async (req, res) => {
   const { id } = req.params;
   const cultivo_riego_user = await db.query("SELECT tbl_cliente.cli_nombre,tbl_cliente.cli_apellido,tbl_cultivo.cul_nombre,tbl_cultivo.cul_estado,tbl_riego_cultivo.cli_id,tbl_riego_cultivo.cul_id FROM tbl_cliente INNER JOIN tbl_riego_cultivo ON (tbl_cliente.cli_id = tbl_riego_cultivo.cli_id) INNER JOIN tbl_cultivo ON (tbl_riego_cultivo.cul_id = tbl_cultivo.cul_id) WHERE tbl_cliente.cli_estado=? AND tbl_cultivo.cul_estado=? AND tbl_riego_cultivo.riego_cul_estado=? AND tbl_riego_cultivo.cli_id=?", [1, 1, 1, id]);

   res.json(cultivo_riego_user[0]);

});
router.get("/Eliminar/:id", async (req, res) => {
   const { id } = req.params;
   const query1 = await db.query("SELECT * FROM tbl_riego_cultivo WHERE tbl_riego_cultivo.cli_id=? AND tbl_riego_cultivo.riego_cul_estado=?", [id, 1]);
   const delete_cul_riego = {
      riego_cul_estado: 0,
   }
   const id_ = query1[0].riego_cul_id;
   console.log(id_)
   const query = await db.query(
      "UPDATE tbl_riego_cultivo set ? WHERE tbl_riego_cultivo.riego_cul_id = ?",
      [delete_cul_riego, id_]
   );
   sensores.riego_cultivo = 0;
   sensores.cultivo_id = 0;
   if (query.affectedRows == 1) {
      const respuesta = { response: "success", mensaje: "Cultivo riego elminado" };
      res.json(respuesta);
   }

});

router.get("/RiegoAutomaticoActivado/:id", async (req, res) => {
   sensores.temp_valvula = "Riego Automático";
   sensores.estado_automatico = 1;
   const { id } = req.params;
   const query1 = await db.query("SELECT * FROM tbl_riego_cultivo WHERE tbl_riego_cultivo.cli_id=? AND tbl_riego_cultivo.riego_cul_estado=?", [id, 1]);
   sensores.cultivo_id = query1[0].riego_cul_id

   res.json("hola");
});



router.get('/DesactivarActumatico', async (req, res) => {

   sensores.estado_automatico = 0;
   sensores.temp_valvula = "Riego Automático OFF";

   const respuesta = {
      response: "success",
      mensaje: "Riego Automatico desactivado",
   };
   res.json(respuesta);
});

router.get("/BuscarActivador/:id", async (req, res) => {
   const { id } = req.params;
   const query1 = await db.query("SELECT * FROM tbl_riego_cultivo WHERE tbl_riego_cultivo.cli_id=? AND tbl_riego_cultivo.riego_cul_estado=?", [id, 1]);
   res.json(query1[0]);

});

function horaTiempos() {
   var fecha = new Date();
   var hora1 = fecha.getHours();
   var minutos = fecha.getMinutes();
   var segundos = fecha.getSeconds();
   var rec = hora1 + ":" + minutos + ":" + segundos;
   return rec;
}



module.exports = router;