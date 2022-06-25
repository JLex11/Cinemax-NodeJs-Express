/* const { json } = require('express');
const { connect } = require('../routes/usuarios'); */

const controller = {};

controller.listAll = (req, res) => {
    req.getConnection((err, conn) => {
        conn.query('SELECT * FROM usuario WHERE estado = "T"', (err, rows) => {
            if (err) res.json(err);

            res.render('usuarios', {
                data: rows,
            });
        });
    });
};

controller.listOne = (req, res) => {
    let { user } = req.params;

    req.getConnection((err, conn) => {
        conn.query('SELECT * FROM usuario WHERE user = ? estado = "T"', user, (err, rows) => {
            if (err) res.json(err);

            if (rows != '') {
                res.render('usuarios', {
                    data: rows,
                });
            } else {
                res.redirect('/Usuarios/');
            }
        });
    });
};

controller.save = (req, res) => {
    req.getConnection((err, conn) => {
        if (err) res.json(err);

        conn.query('INSERT INTO usuario SET ?', req.body, (err, rows) => {
            console.log(rows);
            res.redirect('/Usuarios/');
        });
    });
};

controller.edit = (req, res) => {
    let { user } = req.params;

    req.getConnection((err, conn) => {
        if (err) res.json(err);

        conn.query('SELECT * FROM usuario WHERE usuario = ?', user, (err, rows) => {
            console.log(rows);
            res.render('usuarios_edit', {
                data: rows[0],
            });
        });
    });
};

controller.update = (req, res) => {
    let { user } = req.params;

    req.getConnection((err, conn) => {
        if (err) res.json(err);

        conn.query('UPDATE usuario SET ? WHERE usuario = ?', [req.body, user], (err, rows) => {
            console.log(rows);
            res.redirect('/Usuarios/');
        });
    });
};

controller.delete = (req, res) => {
    let { user } = req.params;

    req.getConnection((err, conn) => {
        if (err) res.json(err);

        conn.query('UPDATE usuario SET estado = "F" WHERE usuario = ?', user, (err, rows) => {
            console.log(rows);
            res.redirect('/Usuarios/');
        });
    });
};

module.exports = controller;
