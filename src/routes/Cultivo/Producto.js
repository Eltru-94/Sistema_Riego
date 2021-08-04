const express = require("express");
const router = express.Router();
const db = require("../../basedatos");
const { isLoggedIn } = require("../../lib/auth");
const { sensores } = require('../../lib/Sensores');

router.get("/", isLoggedIn, async (req, res) => {
    sensores.mensaje_valvula = "Inicio cultivo sistema de riego";
    sensores.titulo = "Cultivos",
        res.render("Cultivo/index", { layout: "admin" });

});

router.post("/Crear", isLoggedIn, async (req, res) => {
    const { cultivo, kc1, kc2, kc3, kc4, dep, dlp, TpoMad, frecuencia, descripcion } = req.body;

    const newcultivo = {
        cul_nombre: cultivo,
        cul_kc1: kc1,
        cul_kc2: kc2,
        cul_kc3: kc3,
        cul_kc4: kc4,
        cul_dep: dep,
        cul_dlp: dlp,
        cul_frecuencia_riego: frecuencia,
        cul_descripcion: descripcion,
        cul_estado: 1,
        cul_TpoMaduracion: TpoMad,
    };

    const cul = await db.query("INSERT INTO tbl_cultivo set ?", [newcultivo]);
    if (cul.affectedRows == 1) {
        const respuesta = {
            response: "success",
            mensaje: "Cultivo reguistrado correctamente",
        };
        res.json(respuesta);
    }
});

router.get("/Cultivos", isLoggedIn, async (req, res) => {
    const cultivo = await db.query(
        "SELECT * FROM tbl_cultivo c WHERE c.cul_estado =?",
        1
    );
    res.json(cultivo);
});

router.get("/Actualizar/:id", isLoggedIn, async (req, res) => {
    const { id } = req.params;
    const modulo = await db.query(
        "SELECT * FROM tbl_cultivo c WHERE c.cul_id = ?",
        [id]
    );
    res.json(modulo[0]);
});

router.post("/Actualizar/:id", isLoggedIn, async (req, res) => {
    const { id } = req.params;
    const { cultivo, kc1, kc2, kc3, kc4, dep, dlp, frecuencia, descripcion } = req.body;

    const newcultivo = {
        cul_nombre: cultivo,
        cul_kc1: kc1,
        cul_kc2: kc2,
        cul_kc3: kc3,
        cul_kc4: kc4,
        cul_dep: dep,
        cul_dlp: dlp,
        cul_frecuencia_riego: frecuencia,
        cul_descripcion: descripcion,
        cul_estado: 1,
    };

    const cul = await db.query(
        "UPDATE tbl_cultivo c set ? WHERE c.cul_id = ?",
        [newcultivo, id]
    );
    if (cul.affectedRows == 1) {
        const respuesta = {
            response: "success",
            mensaje: "Cultivo Actualizado Correctamente",
        };
        res.json(respuesta);
    }
});

router.get("/Eliminar/:id", isLoggedIn, async (req, res) => {
    const { id } = req.params;
    const temp = { cul_estado: 0 };
    const del = await db.query(
        "UPDATE tbl_cultivo c set ? WHERE c.cul_id = ?",
        [temp, id]
    );
    if (del.affectedRows == 1) {
        const respuesta = { response: "success", mensaje: "Cultivo Eliminado Correctamente" };
        res.json(respuesta);
    }
});
router.post("/Buscar", isLoggedIn, async (req, res) => {

    const { buscar } = req.body;

    const tem = "%" + buscar + "%";
    const cultivo = await db.query(
        "SELECT * FROM tbl_cultivo c WHERE c.cul_nombre LIKE ?",
        [tem]


    );


    res.json(cultivo);

});
module.exports = router;