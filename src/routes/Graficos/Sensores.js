const express = require("express");
const router = express.Router();
const db = require("../../basedatos");
const { isLoggedIn } = require("../../lib/auth");
const { sensores } = require('../../lib/Sensores');

router.get("/", isLoggedIn, async (req, res) => {

    mensaje();
    sensores.titulo = "Visualización HS";
    res.render("Graficos/sensores", { layout: "admin" });

});

router.get("/Cultivo_riego/:id", isLoggedIn, async (req, res) => {

    //const cul_id=sensores.cul_id_tem;
    const cul_id = 2;

    const { id } = req.params;
    const selectCultivoRiego = await db.query("SELECT * FROM tbl_riego_cultivo INNER JOIN tbl_riego ON (tbl_riego_cultivo.riego_cul_id = tbl_riego.riego_cul_id) INNER JOIN tbl_cultivo ON (tbl_riego_cultivo.cul_id = tbl_cultivo.cul_id) WHERE tbl_riego_cultivo.cli_id=? AND tbl_riego_cultivo.cul_id=?", [id, cul_id]);

    res.json(selectCultivoRiego);
});

router.post("/Cultivo_riego/:id", isLoggedIn, async (req, res) => {


    const { cul_id } = req.body
    const { id } = req.params;
    const selectCultivoRiego = await db.query("SELECT * FROM tbl_riego_cultivo INNER JOIN tbl_riego ON (tbl_riego_cultivo.riego_cul_id = tbl_riego.riego_cul_id) INNER JOIN tbl_cultivo ON (tbl_riego_cultivo.cul_id = tbl_cultivo.cul_id) WHERE tbl_riego_cultivo.cli_id=? AND tbl_riego_cultivo.cul_id=?", [id, cul_id]);
    
    if (selectCultivoRiego!=null) {
        res.json(selectCultivoRiego);
    } else {

        const respuesta = { response: "success", mensaje: "No existen datos" };
        res.json(respuesta);

    }


});

function mensaje() {

    var aux_a = "";
    var aux_b = "";
    if (sensores.humedad_suelo_a == 0) {
        aux_a = "Nodo A no conectado";
    } else {
        aux_a = "Nodo A : " + sensores.humedad_suelo_a + "%";
    }
    if (sensores.humedad_suelo_b == 0) {
        aux_b = "Nodo B no conectado";
    } else {
        aux_b = "Nodo B : " + sensores.humedad_suelo_b + "%";
    }

    sensores.mensaje_valvula = "Gráfica HS " + aux_a + "         " + aux_b;
}




module.exports = router;