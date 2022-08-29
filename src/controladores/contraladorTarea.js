const controlador = {}

controlador.mostrar = (req, res) => {
    req.getConnection((err, conn) => {
        if (err)
            throw err;
        else {
            conn.query("SELECT * FROM actividades", (error, resultados) => {
                if (error)
                    res.json(error);
                else
                    res.render("tareas/tareas.ejs", { data: resultados });
            });
        }
    });
};

controlador.consultar = (req, res) => {
    const matri = req.params.Matri;

    req.getConnection((err, conn) => {
        conn.query("SELECT * FROM calificacion WHERE idActividades=?", [matri], (error, fila) => {
            res.render("tareas/tareas_consultar.ejs", { reg: fila });
        });
    });
};

controlador.nuevo = (req, res) => {
    res.render("tareas/tareas_nuevo.ejs");
};

controlador.calificar = (req, res) => {
    const matri = req.params.Matri;

    req.getConnection((err, conn) => {
        conn.query("SELECT * FROM actividades, alumnos WHERE id=?", [matri], (error, fila) => {
            res.render("tareas/tareas_calificar.ejs", { reg: fila });
        });
    });
};

controlador.agregar = (req, res) => {
    const regAlumno = {
        Actividad: req.body.tfActividad,
        Categoria: req.body.tfCategoria,
    };
    req.getConnection((err, conn) => {
        if (err)
            throw err;
        else {
            conn.query("INSERT INTO actividades SET ?", [regAlumno], (error, resultados) => {
                if (error)
                    res.json(error);
                else
                    res.redirect("/tareas");
            })
        }
    });
};

controlador.agregarC = (req, res) => {
    const regCalif = {
        idActividades: req.body.tfidActividades,
        idMatricula: req.body.tfidMatricula,
        Calificacion: req.body.tfCalificacion
    };
    req.getConnection((err, conn) => {
        if (err)
            throw err;
        else {
            conn.query("INSERT INTO calificacion SET ?", [regCalif], (error, resultados) => {
                if (error)
                    res.json(error);
                else
                    res.redirect("/tareas");
            })
        }
    });
};

controlador.editar = (req, res) => {
    const matri = req.params.Matri;

    req.getConnection((err, conn) => {
        conn.query("SELECT * FROM actividades WHERE id=?", [matri], (error, fila) => {
            res.render("tareas/tareas_editar.ejs", { reg: fila });
        });
    });
};

controlador.actualizar = (req, res) => {
    const matri = req.params.Matri;

    const regAlumno = {
        Actividad: req.body.tfActividad,
        Categoria: req.body.tfCategoria,
    };
    req.getConnection((err, conn) => {
        conn.query("UPDATE actividades SET ? WHERE id=?", [regAlumno, matri], (error, resultados) => {
            if (error)
                res.json(error);
            else
                res.redirect("/tareas");
        });
    });
};

controlador.eliminar = (req, res) => {
    const matri = req.params.Matri;
    req.getConnection((err, conn) => {
        conn.query("DELETE FROM actividades WHERE id=?", [matri], (error, resultados) => {
            if (error)
                res.json(error);
            else
                res.redirect("/tareas");
        });
    });
};


module.exports = controlador;