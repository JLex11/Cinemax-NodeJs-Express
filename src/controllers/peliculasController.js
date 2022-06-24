const { connect } = require("../routes/peliculas");
const utilFunctions = require("../utils/utilFunctions");

const controller = {};

controller.listAll = (req, res) => {
    req.getConnection((err, conn) => {
        conn.query('SELECT * FROM pelicula WHERE estado = "T"', (err, rows) => {
            if (err) res.json(err);

            res.render("peliculas", {
                data: rows,
            });
        });
    });
};

controller.listOne = (req, res) => {
    res.send("One movie show");
};

controller.save = (req, res) => {
    console.log("req.file", req.file);
    let peliculaData = {
        titulooriginal: utilFunctions.capitalize(req.body.titulooriginal),
        titulolatino: utilFunctions.capitalize(req.body.titulooriginal),
        foto: "/src/files/peliculas/" + req.file.filename,
        idtipo: req.body.idtipo,
        idpais: req.body.idpais,
        lanzamiento: req.body.lanzamiento,
        duracion: req.body.duracion,
        resena: utilFunctions.capitalize(req.body.resena),
        estado: utilFunctions.capitalize(req.body.estado),
    };

    req.getConnection((err, conn) => {
        if (err) res.json(err);

        conn.query("INSERT INTO pelicula SET ?", peliculaData, (err, rows) => {
            console.log(rows);
            res.redirect("/Peliculas/");
        });
    });
};

controller.edit = (req, res) => {
    let { idpelicula } = req.params;

    req.getConnection((err, conn) => {
        if (err) res.json(err);

        conn.query("SELECT * FROM pelicula WHERE idpelicula = ?", idpelicula, (err, rows) => {
            console.log(rows[0]);
            res.render("peliculas_edit", {
                data: rows[0],
            });
        });
    });
};

controller.update = (req, file, res) => {
    console.log(file);
    let { idpelicula } = req.params;
    let peliculaData = {
        titulooriginal: utilFunctions.capitalize(req.body.titulooriginal),
        titulolatino: utilFunctions.capitalize(req.body.titulooriginal),
        foto: "/src/files/peliculas/" + req.file.filename,
        idtipo: req.body.idtipo,
        idpais: req.body.idpais,
        lanzamiento: req.body.lanzamiento,
        duracion: req.body.duracion,
        resena: utilFunctions.capitalize(req.body.resena),
        estado: utilFunctions.capitalize(req.body.estado),
    };

    req.getConnection((err, conn) => {
        if (err) res.json(err);

        conn.query("UPDATE pelicula SET ? WHERE idpelicula = ?", [peliculaData, idpelicula], (err, rows) => {
            console.log(rows);
            res.redirect("/Peliculas/");
        });
    });
};

controller.delete = (req, res) => {
    let { idpelicula } = req.params;

    req.getConnection((err, conn) => {
        if (err) res.json(err);

        conn.query('UPDATE pelicula SET estado = "F" WHERE idpelicula = ?', idpelicula, (err, rows) => {
            console.log(rows);
            res.redirect("/Peliculas/");
        });
    });
};

module.exports = controller;
