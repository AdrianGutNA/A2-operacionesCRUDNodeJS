const express = require("express");
const route = express.Router();
const controladorPorcentaje = require("../controladores/controladorPorcentaje");

route.get("/",                  controladorPorcentaje.mostrar);
route.get("/nuevo",                  controladorPorcentaje.nuevo);
route.post("/agregar",          controladorPorcentaje.agregar);
route.get("/editar/:Matri",           controladorPorcentaje.editar);
route.post("/actualizar/:Matri",    controladorPorcentaje.actualizar);
route.get("/eliminar/:Matri",      controladorPorcentaje.eliminar);


module.exports = route;