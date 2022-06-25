/* const { connect } = require("../routes/generos"); */

const controller = {};

controller.listAll = (req, res) => {
    req.getConnection((err, conn) => {
        conn.query('SELECT * FROM genero WHERE estado = "T"', (err, rows) => {
            if (err) res.json(err);

            res.render('generos', {
                data: rows,
            });
        });
    });
};

controller.listOne = (req, res) => {
    let { idgenero } = req.params;

    req.getConnection((err, conn) => {
        conn.query('SELECT * FROM genero WHERE idgenero = ? estado = "T"', idgenero, (err, rows) => {
            if (err) res.json(err);

            if (rows != '') {
                res.render('generos', {
                    data: rows,
                });
            } else {
                res.redirect('/Generos/');
            }
        });
    });
};

controller.save = (req, res) => {
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
            res.render('generos_edit', {
                data: rows[0],
            });
        });
    });
};

controller.update = (req, res) => {
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
