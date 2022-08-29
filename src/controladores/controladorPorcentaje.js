const controlador = {}

controlador.mostrar = (req, res) => {
    req.getConnection((err, conn) => {
        if (err)
            throw err;
        else {
            conn.query("SELECT * FROM porcentajes", (error, resultados) => {
                if (error)
                    res.json(error);
                else
                    res.render("porcentajes/porcentajes.ejs", { data: resultados });
            });
        }
    });
};

controlador.nuevo = (req, res) => {
    req.getConnection((err, conn) => {
        if (err)
            throw err;
        else {
            conn.query("SELECT * FROM porcentajes", (error, resultados) => {
                if (error)
                    res.json(error);
                else
                    res.render("porcentajes/porcentajes_nuevo.ejs", { data: resultados });
            });
        }
    });

};




controlador.agregar = (req, res) => {
    let suma = 0;

    const datos = {
        Descripcion: req.body.tfDescripcion,
        Porcentaje: req.body.tfPorcentaje,
        PorcentajeAsignado: req.body.tfPorcentajeAsignado,
    };

    const regAlumno = {
        Descripcion: datos.Descripcion,
        Porcentaje: datos.Porcentaje
    };

    suma = Number(datos.Porcentaje) + Number(datos.PorcentajeAsignado);

    req.getConnection((err, conn) => {
        if (err)
            throw err;
        else if (suma <= 100) {

            conn.query("INSERT INTO porcentajes SET ?", [regAlumno], (error, resultados) => {
                if (error)
                    res.json(error);
                else
                    res.redirect("/porcentajes");
            })

        } else {
            req.getConnection((err, conn) => {
                if (err)
                    throw err;
                else {
                    conn.query("SELECT * FROM porcentajes", (error, resultados) => {
                        if (error)
                            res.json(error);
                        else
                            res.render("porcentajes/porcentajes_nuevo.ejs", { data: resultados });
                    });
                }
            });
        }

    });


};

controlador.editar = (req, res) => {
    const matri = req.params.Matri;

    req.getConnection((err, conn) => {
        conn.query("SELECT * FROM porcentajes", (error, resultados) => {

            conn.query("SELECT * FROM porcentajes WHERE id=?", [matri], (error, fila) => {
                res.render("porcentajes/porcentajes_editar.ejs", { reg: fila, data: resultados });
            });
        });
    });

};

controlador.actualizar = (req, res) => {
    const matri = req.params.Matri;

    const regAlumno = {
        Descripcion: req.body.tfDescripcion,
        Porcentaje: req.body.tfPorcentaje,
    };
    req.getConnection((err, conn) => {
        conn.query("UPDATE porcentajes SET ? WHERE id=?", [regAlumno, matri], (error, resultados) => {
            if (error)
                res.json(error);
            else
                res.redirect("/porcentajes");
        });
    });
};

controlador.eliminar = (req, res) => {
    const matri = req.params.Matri;
    req.getConnection((err, conn) => {
        conn.query("DELETE FROM porcentajes WHERE id=?", [matri], (error, resultados) => {
            if (error)
                res.json(error);
            else
                res.redirect("/porcentajes");
        });
    });
};

module.exports = controlador;