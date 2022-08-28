const express = require("express");
const route = express.Router();
const controladorTarea = require("../controladores/contraladorTarea");

route.get("/",                  controladorTarea.mostrar);
route.get("/nuevo",                  controladorTarea.nuevo);
route.post("/agregar",          controladorTarea.agregar);
route.post("/agregarC",          controladorTarea.agregarC);
route.get("/editar/:Matri",           controladorTarea.editar);
route.get("/calificar/:Matri",           controladorTarea.calificar);
route.get("/consultar/:Matri",           controladorTarea.consultar);
route.post("/actualizar/:Matri",    controladorTarea.actualizar);
route.get("/eliminar/:Matri",      controladorTarea.eliminar);


module.exports = route;