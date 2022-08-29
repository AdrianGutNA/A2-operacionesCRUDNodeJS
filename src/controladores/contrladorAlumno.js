const controlador = {}

controlador.mostrar = (req, res) => {
    req.getConnection((err, conn) => {
        if (err)
            throw err;
        else {
            conn.query("SELECT * FROM alumnos", (error, resultados) => {
                if (error)
                    res.json(error);
                else
                    res.render("alumnos/alumnos.ejs", { data: resultados });
            });
        }
    });
};

controlador.nuevo = (req, res) => {
    res.render("alumnos/alumnos_nuevo.ejs");
};

controlador.agregar = (req, res) => {
    const regAlumno = {
        Matricula: req.body.tfMatricula,
        Nombre: req.body.tfNombre,
        Apellidos: req.body.tfApellido,
    };
    req.getConnection((err, conn) => {
        if (err)
            throw err;
        else {
            conn.query("INSERT INTO alumnos SET ?", [regAlumno], (error, resultados) => {
                if (error)
                    res.json(error);
                else
                    res.redirect("/alumnos");
            })
        }
    });
};

controlador.editar = (req, res) => {
    const matri = req.params.Matri;

    req.getConnection((err, conn) => {
        conn.query("SELECT * FROM alumnos WHERE Matricula=?", [matri], (error, fila) => {
            res.render("alumnos/alumnos_editar.ejs", { reg: fila });
        });
    });
};

controlador.actualizar = (req, res) => {
    const matri = req.params.Matri;

    const regAlumno = {
        Matricula: req.body.tfMatricula,
        Nombre: req.body.tfNombre,
        Apellidos: req.body.tfApellido,
    };
    req.getConnection((err, conn) => {
        conn.query("UPDATE alumnos SET ? WHERE Matricula=?", [regAlumno, matri], (error, resultados) => {
            if (error)
                res.json(error);
            else
                res.redirect("/alumnos");
        });
    });
};

controlador.eliminar = (req, res) => {
    const matri = req.params.Matri;
    req.getConnection((err, conn) => {
        conn.query("DELETE FROM alumnos WHERE Matricula=?", [matri], (error, resultados) => {
            if (error)
                res.json(error);
            else
                res.redirect("/alumnos");
        });
    });
};

module.exports = controlador;