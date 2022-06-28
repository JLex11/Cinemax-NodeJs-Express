const utilFunctions = require('../utils/utilFunctions');

const controller = {};

controller.describe = (req, res) => {
    req.getConnection((err, conn) => {
        conn.query('DESCRIBE genero', (err, rows) => {
            if (err) res.json(err);
            res.json(rows);
        });
    });
};

controller.listAll = (req, res) => {
    req.getConnection((err, conn) => {
        conn.query('SELECT * FROM genero WHERE estado = "T"', (err, rows) => {
            if (err) res.json(err);

            res.json(rows);
        });
    });
};

controller.listOne = (req, res) => {
    let { idgenero } = req.params;

    req.getConnection((err, conn) => {
        conn.query('SELECT * FROM genero WHERE idgenero = ? estado = "T"', idgenero, (err, rows) => {
            if (err) res.json(err);

            if (rows != '') {
                res.json(rows);
            } else {
                res.redirect('/Generos/');
            }
        });
    });
};

controller.save = (req, res) => {
    for (let clave in req.body) {
        req.body[clave] = utilFunctions.capitalize(req.body[clave]);
    }
    req.getConnection((err, conn) => {
        if (err) res.json(err);

        conn.query('INSERT INTO genero SET ?', req.body, (err, rows) => {
            if (err) throw err;
            console.log(rows);
            res.redirect('/Generos/');
        });
    });
};

controller.edit = (req, res) => {
    let { idgenero } = req.params;

    req.getConnection((err, conn) => {
        if (err) res.json(err);

        conn.query('SELECT * FROM genero WHERE idgenero = ?', idgenero, (err, rows) => {
            console.log(rows);
            res.json(rows);
        });
    });
};

controller.update = (req, res) => {
    for (let clave in req.body) {
        req.body[clave] = utilFunctions.capitalize(req.body[clave]);
    }
    let { idgenero } = req.params;

    req.getConnection((err, conn) => {
        if (err) res.json(err);

        conn.query('UPDATE genero SET ? WHERE idgenero = ?', [req.body, idgenero], (err, rows) => {
            console.log(rows);
            res.redirect('/Generos/');
        });
    });
};

controller.delete = (req, res) => {
    let { idgenero } = req.params;

    req.getConnection((err, conn) => {
        if (err) res.json(err);

        conn.query('UPDATE genero SET estado = "F" WHERE idgenero = ?', idgenero, (err, rows) => {
            console.log(rows);
            res.redirect('/Generos/');
        });
    });
};

module.exports = controller;
