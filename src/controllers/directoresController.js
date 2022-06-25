/* const { connect } = require("../routes/directores"); */

const controller = {};

controller.listAll = (req, res) => {
    req.getConnection((err, conn) => {
        conn.query('SELECT * FROM director WHERE estado = "T"', (err, rows) => {
            if (err) res.json(err);

            res.render('directores', {
                data: rows,
            });
        });
    });
};

controller.listOne = (req, res) => {
    let { iddirector } = req.params;

    req.getConnection((err, conn) => {
        conn.query('SELECT * FROM director WHERE iddirector = ? AND estado = "T"', iddirector, (err, rows) => {
            if (err) res.json(err);

            if (rows != '') {
                res.render('directores', {
                    data: rows,
                });
            } else {
                res.redirect('/Directores/');
            }
        });
    });
};

controller.save = (req, res) => {
    req.body.foto = '/public/images/directores/' + req.file.originalname;

    req.getConnection((err, conn) => {
        if (err) res.json(err);

        conn.query('INSERT INTO director SET ?', req.body, (err, rows) => {
            console.log(rows);
            res.redirect('/Directores/');
        });
    });
};

controller.edit = (req, res) => {
    let { iddirector } = req.params;

    req.getConnection((err, conn) => {
        if (err) res.json(err);

        conn.query('SELECT * FROM director WHERE iddirector = ?', iddirector, (err, rows) => {
            console.log(rows);
            res.render('directores_edit', {
                data: rows[0],
            });
        });
    });
};

controller.update = (req, res) => {
    let { iddirector } = req.params;
    req.body.foto = '/public/images/directores/' + req.file.originalname;

    req.getConnection((err, conn) => {
        if (err) res.json(err);

        conn.query('UPDATE director SET ? WHERE iddirector = ?', [req.body, iddirector], (err, rows) => {
            console.log(rows);
            res.redirect('/Directores/');
        });
    });
};

controller.delete = (req, res) => {
    let { iddirector } = req.params;

    req.getConnection((err, conn) => {
        if (err) res.json(err);

        conn.query('UPDATE director SET estado = "F" WHERE iddirector = ?', iddirector, (err, rows) => {
            console.log(rows);
            res.redirect('/Directores/');
        });
    });
};

module.exports = controller;
