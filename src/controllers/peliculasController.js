/* const connect = require('../routes/peliculas'); */
const utilFunctions = require('../utils/utilFunctions');

const controller = {};

controller.listAll = (req, res) => {
    req.getConnection((err, conn) => {
        conn.query('SELECT * FROM pelicula WHERE estado = "T"', (err, rows) => {
            if (err) throw err;

            res.render('peliculas', {
                data: rows,
            });
        });
    });
};

controller.listOne = (req, res) => {
    let { idpelicula } = req.params;

    req.getConnection((err, conn) => {
        conn.query('SELECT * FROM pelicula WHERE idpelicula = ? estado = "T"', idpelicula, (err, rows) => {
            if (err) throw err;

            if (rows != '') {
                res.render('peliculas', {
                    data: rows,
                });
            } else {
                res.redirect('/Peliculas/');
            }
        });
    });
};

controller.save = (req, res) => {
    for (let clave in req.body) {
        req.body[clave] = utilFunctions.capitalize(req.body[clave]);
    }
    req.body.foto = '/public/images/peliculas/' + req.file.filename;

    req.getConnection((err, conn) => {
        if (err) throw err;

        conn.query('INSERT INTO pelicula SET ?', req.body, (err, rows) => {
            console.log(rows);
            res.redirect('/Peliculas/');
        });
    });
};

controller.edit = (req, res) => {
    let { idpelicula } = req.params;

    req.getConnection((err, conn) => {
        if (err) throw err;

        conn.query('SELECT * FROM pelicula WHERE idpelicula = ?', idpelicula, (err, rows) => {
            console.log(rows[0]);
            /* res.render("peliculas_edit", {
                data: rows[0],
            }); */
            res.json(rows);
        });
    });
};

controller.update = (req, res) => {
    let { idpelicula } = req.params;
    for (let clave in req.body) {
        req.body[clave] = utilFunctions.capitalize(req.body[clave]);
    }
    req.body.foto = '/public/images/peliculas/' + req.file.filename;

    req.getConnection((err, conn) => {
        if (err) throw err;

        conn.query('UPDATE pelicula SET ? WHERE idpelicula = ?', [req.body, idpelicula], (err, rows) => {
            console.log(rows);
            res.redirect('/Peliculas/');
        });
    });
};

controller.delete = (req, res) => {
    let { idpelicula } = req.params;

    req.getConnection((err, conn) => {
        if (err) throw err;

        conn.query('UPDATE pelicula SET estado = "F" WHERE idpelicula = ?', idpelicula, (err, rows) => {
            console.log(rows);
            res.redirect('/Peliculas/');
        });
    });
};

module.exports = controller;
