const express = require("express");
const router = express.Router();
const db = require("../../basedatos");
const { sensores } = require('../../lib/Sensores');
router.get('/', (req, res) => {
   sensores.mensaje_valvula = "Calculos de riego";
   sensores.titulo = "Programar Riego";
   res.render("riego/CalculosRiego", { layout: "admin" });
});


router.post('/ActualizarRiegoCultivo/:id', async(req, res) => {
   const { id } = req.params;
   const {EtapaDesarrolllo} = req.body;
   const new_riego_cultivo = {
      rig_cul_base_desarrollo:EtapaDesarrolllo
   };
   sensores.EtapaDesarrolllo=EtapaDesarrolllo;
   const update_riego_cultivo = await db.query(
      "UPDATE tbl_riego_cultivo set ? WHERE tbl_riego_cultivo.riego_cul_id= ?",
      [new_riego_cultivo, id]
   );
   
   if (update_riego_cultivo.affectedRows == 1) {
      const respuesta = {
         response: "success",
         mensaje: "Base de desarrollo actualizado con exito",
      };
      res.json(respuesta);
   }
   
});





module.exports = router;