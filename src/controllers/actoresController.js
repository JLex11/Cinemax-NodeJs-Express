const utilFunctions = require('../utils/utilFunctions');

const controller = {};

controller.describe = (req, res) => {
    req.getConnection((err, conn) => {
        conn.query('DESCRIBE actor', (err, rows) => {
            if (err) res.json(err);
            res.json(rows);
        });
    });
};

controller.listAll = (req, res) => {
    req.getConnection((err, conn) => {
        conn.query('SELECT * FROM actor WHERE estado = "T"', (err, rows) => {
            if (err) res.json(err);
            res.json(rows);
        });
    });
};

controller.listOne = (req, res) => {
    let { idactor } = req.params;

    req.getConnection((err, conn) => {
        conn.query('SELECT * FROM actor WHERE idactor = ? AND estado = "T"', idactor, (err, rows) => {
            if (err) res.json(err);

            if (rows != '') {
                res.json(rows);
            } else {
                res.redirect('/Actores/');
            }
        });
    });
};

controller.save = async (req, res) => {
    console.log(req.file);
    for (let clave in req.body) {
        req.body[clave] = utilFunctions.capitalize(req.body[clave]);
    }
    req.body.foto = '/public/images/actores/' + req.file.originalname;

    req.getConnection((err, conn) => {
        if (err) res.json(err);

        conn.query('INSERT INTO actor SET ?', req.body, (err, rows) => {
            console.log(rows);
            res.redirect('/Actores/');
        });
    });
};

controller.edit = (req, res) => {
    let { idactor } = req.params;

    req.getConnection((err, conn) => {
        if (err) res.json(err);

        conn.query('SELECT * FROM actor WHERE idactor = ?', idactor, (err, rows) => {
            console.log(rows);
            res.json(rows);
        });
    });
};

controller.update = (req, res) => {
    let { idactor } = req.params;
    for (let clave in req.body) {
        req.body[clave] = utilFunctions.capitalize(req.body[clave]);
    }
    req.body.foto = '/public/images/actores/' + req.file.originalname;

    req.getConnection((err, conn) => {
        if (err) res.json(err);

        conn.query('UPDATE actor SET ? WHERE idactor = ?', [req.body, idactor], (err, rows) => {
            console.log(rows);
            res.redirect('/Actores/');
        });
    });
};

controller.delete = (req, res) => {
    let { idactor } = req.params;

    req.getConnection((err, conn) => {
        if (err) res.json(err);

        conn.query('UPDATE actor SET estado = "F" WHERE idactor = ?', idactor, (err, rows) => {
            console.log(rows);
            res.redirect('/Actores/');
        });
    });
};

module.exports = controller;
