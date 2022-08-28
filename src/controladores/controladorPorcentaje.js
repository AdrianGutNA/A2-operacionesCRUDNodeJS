const controlador = {}

controlador.mostrar = (req,res) => {
    req.getConnection((err,conn) => {
        if(err)
            throw err;
        else
        {
            conn.query("SELECT * FROM porcentajes", (error, resultados) => {
                if(error)
                    res.json(error);
                else
                    res.render("porcentajes.ejs", {data:resultados});
            });
        }
    });
};

controlador.nuevo = (req,res) => {
    res.render("porcentajes_nuevo.ejs");
};

controlador.agregar = (req,res) => {
    const regAlumno =   {
                            Descripcion: req.body.tfDescripcion,
                            Porcentaje: req.body.tfPorcentaje,
                        };
    req.getConnection((err,conn) => {
        if(err)
            throw err;
        else
        {
            conn.query("INSERT INTO porcentajes SET ?",[regAlumno],(error, resultados) => {
                if(error)
                    res.json(error);
                else
                    res.redirect("/porcentajes");
            })
        }
    });
};

controlador.editar = (req,res) => {
    const matri = req.params.Matri;

    req.getConnection((err,conn) => {
        conn.query("SELECT * FROM porcentajes WHERE id=?",[matri],(error,fila) => {
            res.render("porcentajes_editar.ejs",{reg:fila});
        });
    });
};

controlador.actualizar = (req,res) => {
    const matri = req.params.Matri;

    const regAlumno =   {
                            Descripcion: req.body.tfDescripcion,
                            Porcentaje: req.body.tfPorcentaje,
                        };
    req.getConnection((err,conn) => {
        conn.query("UPDATE porcentajes SET ? WHERE id=?",[regAlumno,matri],(error, resultados) => {
            if(error)
                res.json(error);
            else
                res.redirect("/porcentajes");
        });
    });
};

controlador.eliminar = (req,res) =>{
    const matri = req.params.Matri;
    req.getConnection((err,conn) => {
        conn.query("DELETE FROM porcentajes WHERE id=?",[matri],(error,resultados) => {
            if(error)
                res.json(error);
            else
                res.redirect("/porcentajes");
        });
    });
};

module.exports = controlador;