const express = require("express");
const router = express.Router();
const db = require("../../basedatos");
const { isLoggedIn } = require("../../lib/auth");
const helpers = require("../../lib/helpers");


router.get("/", isLoggedIn, async (req, res) => {
    res.render("GestionDatosClima/humedadRelativa", { layout: "admin" });
})

router.get("/ListaHR", isLoggedIn, async (req, res) => {
    const hr = await db.query(
        "SELECT * FROM tbl_humedad_relativa h WHERE h.hum_rel_estado =? ORDER BY h.hum_rel_fecha DESC LIMIT 10",
        1
    );
    res.json(hr);
});

router.post("/Crear", isLoggedIn, async (req, res) => {
    const { valor_hr, fecha, hora } = req.body;
    const newtHR = {
        hum_rel_valor: valor_hr,
        hum_rel_fecha: fecha,
        hum_rel_hora: hora,
        hum_rel_estado: 1,
    };
    const query = await db.query("INSERT INTO tbl_humedad_relativa set ?", [newtHR]);
    if (query.affectedRows == 1) {
        const respuesta = {
            response: "success",
            mensaje: "Humedad Relativa reguistrada correctamente",
        };
        res.json(respuesta);
    }

});

router.get("/Actualizar/:id", isLoggedIn, async (req, res) => {
    const { id } = req.params;
    const modulo = await db.query(
        "SELECT * FROM tbl_humedad_relativa h WHERE h.hum_rel_id = ?",
        [id]
    );
    res.json(modulo[0]);
});

router.post("/Actualizar/:id", isLoggedIn, async (req, res) => {
    const { id } = req.params;
    const { valor_hr, fecha, hora } = req.body;
    const newHR = {
        hum_rel_valor: valor_hr,
        hum_rel_fecha: fecha,
        hum_rel_hora: hora,
        hum_rel_estado: 1,
    };

    const query = await db.query(
        "UPDATE tbl_humedad_relativa h set ? WHERE h.hum_rel_id = ?",
        [newHR, id]
    );
    if (query.affectedRows == 1) {
        const respuesta = {
            response: "success",
            mensaje: "Humedad relativa Actualizado Correctamente",
        };
        res.json(respuesta);
    }
});



router.get("/Eliminar/:id", isLoggedIn, async (req, res) => {
    const { id } = req.params;
    const hr = { hum_rel_estado: 0 };
    const query = await db.query(
        "UPDATE tbl_humedad_relativa t set ? WHERE hum_rel_id = ?",
        [hr, id]
    );
    if (query.affectedRows == 1) {
        const respuesta = { response: "success", mensaje: "Humedad relativa", accion: "Eliminado con Exito" };
        res.json(respuesta);
    }
});


router.post("/ListaHR", isLoggedIn, async (req, res) => {
    const { fecha } = req.body;
    const HR = await db.query(
        "SELECT * FROM tbl_humedad_relativa h WHERE h.hum_rel_fecha =? AND h.hum_rel_estado =? ORDER BY h.hum_rel_hora ",
        [fecha, 1]
    );

    res.json(HR);
});


router.post("/CalculosDatos", isLoggedIn, async (req, res) => {
    const { fecha } = req.body;
    const HR_claculos = await db.query(
        "SELECT AVG(tbl_humedad_relativa.hum_rel_valor) AS 'promedio', MAX(tbl_humedad_relativa.hum_rel_valor) AS 'max', MIN(tbl_humedad_relativa.hum_rel_valor) AS 'min' FROM   tbl_humedad_relativa WHERE tbl_humedad_relativa.hum_rel_fecha=?", [fecha, 1]
    );
    console.log(HR_claculos[0]);
    res.json(HR_claculos[0]);
});
module.exports = router;