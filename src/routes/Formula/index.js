const express = require("express");
const router = express.Router();
const db = require("../../basedatos");
const { isLoggedIn } = require("../../lib/auth");
const { sensores } = require('../../lib/Sensores');
router.get("/", isLoggedIn, async (req, res) => {
    sensores.mensaje_valvula = "Calculos de la Evapotranspiración";
    sensores.titulo = "Cultivos";
    res.render("Formula/", { layout: "admin" });
})

router.get("/Formula_Cultivo", isLoggedIn, async (req, res) => {
    sensores.mensaje_valvula = "Lista de Cultivos";
    res.render("cultivo/", { layout: "admin" });
})


router.get("/Ecuacion", isLoggedIn, async (req, res) => {
    const ecuacion = await db.query(
        "SELECT * FROM tbl_ecuacion e WHERE e.ecu_estado =?",
        1
    );
    res.json(ecuacion);

});
router.post("/Actualizar/:id", isLoggedIn, async (req, res) => {
    const { id } = req.params;
    const { vels, altura, latitud, mes, msnm, Tpromedio, Tmax, Tmin, HRpromedio, porcentaje, FlujoCalor } = req.body;


    const new_ecuacion = {
        ecu_vels: vels,
        ecu_altura: altura,
        ecu_latitud: latitud,
        ecu_Tmax: Tmax,
        ecu_Tmin: Tmin,
        ecu_Tpromedio: Tpromedio,
        ecu_humedad_relativa_promedio: HRpromedio,
        ecu_msnm: msnm,
        ecu_despeje_nubes: porcentaje,
        ecu_mes: mes,
        ecu_flujoCalor: FlujoCalor
    };

    const ecuacion = await db.query(
        "UPDATE tbl_ecuacion e set ? WHERE e.ecu_id = ?",
        [new_ecuacion, id]
    );
    if (ecuacion.affectedRows == 1) {
        const respuesta = {
            response: "success",
            mensaje: "Ecuacion Actualizado Correctamente",
        };
        res.json(respuesta);
    }
});

module.exports = router;