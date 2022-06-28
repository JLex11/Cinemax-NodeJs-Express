const controller = {};

controller.describe = (req, res) => {
    req.getConnection((err, conn) => {
        conn.query('DESCRIBE usuario', (err, rows) => {
            if (err) res.json(err);
            res.json(rows);
        });
    });
};

controller.listAll = (req, res) => {
    req.getConnection((err, conn) => {
        conn.query('SELECT * FROM usuario WHERE estado = "T"', (err, rows) => {
            if (err) res.json(err);

            res.json(rows);
        });
    });
};

controller.listOne = (req, res) => {
    let { user } = req.params;

    req.getConnection((err, conn) => {
        conn.query('SELECT * FROM usuario WHERE user = ? estado = "T"', user, (err, rows) => {
            if (err) res.json(err);

            if (rows != '') {
                res.json(rows);
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
            res.json(rows);
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
