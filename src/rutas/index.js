const express = require("express");
const route = express.Router();

route.get("/", function(req, res){
    res.render("index.ejs",{titulo:"Vista Prinsipal",nombre:"Luis Gustavo y Adrian"});
});

module.exports = route;