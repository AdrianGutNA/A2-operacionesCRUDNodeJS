const express = require("express");
const ejs = require("ejs");
const mysql = require("mysql");
const myConnection = require("express-myconnection");
const session = require("express-session");
const path = require("path");

const servidor = express();

var datosBD = {
    host: "127.0.0.1",
    user: "root",
    password: "",
    port: "3306",
    database: "actividad2"
};


servidor.set("puerto", 3000);
servidor.set("view engine", "ejs");
servidor.set("views", path.join(__dirname, "./src/vistas"));
servidor.engine("html", ejs.renderFile);

servidor.use(express.urlencoded({ extended: false }));
servidor.use(express.json());

servidor.use(myConnection(mysql, datosBD, "single"));

servidor.use("/", require("./src/rutas/index.js"));
servidor.use("/alumnos", require("./src/rutas/alumnos.js"));
servidor.use("/tareas", require("./src/rutas/tareas.js"));
servidor.use("/porcentajes", require("./src/rutas/porcentajes.js"));

servidor.use(express.static("./src/recursos/css"));
servidor.use(express.static("./src/recursos/js"));
servidor.use(express.static("./src/recursos/img"));

servidor.listen(servidor.get("puerto"), function() {
    console.log("Servidor express escuchando por el puerto: ", servidor.get("puerto"));
});