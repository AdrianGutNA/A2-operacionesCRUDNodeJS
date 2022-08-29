const express = require("express");
const router = express.Router();
const controladorSession = require("../../controladores/controladorSession.js");

router.post('/iniciar', controladorSession.iniciar);
router.post('/cerrar', controladorSession.cerrar);

module.exports = router;