const express = require("express");
const route = express.Router();
const controladorAlumno = require("../controladores/contrladorAlumno");

route.get("/",                  controladorAlumno.mostrar);
route.get("/nuevo",                  controladorAlumno.nuevo);
route.post("/agregar",          controladorAlumno.agregar);
route.get("/editar/:Matri",           controladorAlumno.editar);
route.post("/actualizar/:Matri",    controladorAlumno.actualizar);
route.get("/eliminar/:Matri",      controladorAlumno.eliminar);


module.exports = route;