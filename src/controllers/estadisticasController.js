const controller = {};

controller.listAll = (req, res) => {
    req.getConnection((err, conn) => {
        conn.query('SELECT * FROM estadisticas WHERE estado = "T"', (err, rows) => {
            if (err) res.json(err);

            res.render('estadisticas', {
                data: rows,
            });
        });
    });
};

controller.listOne = (req, res) => {
    let { idestadisticas } = req.params;

    req.getConnection((err, conn) => {
        conn.query('SELECT * FROM estadisticas WHERE idestadisticas = ? estado = "T"', idestadisticas, (err, rows) => {
            if (err) res.json(err);

            if (rows != '') {
                res.render('estadisticas', {
                    data: rows,
                });
            } else {
                res.redirect('/Estadisticas/');
            }
        });
    });
};

controller.save = (req, res) => {
    req.getConnection((err, conn) => {
        if (err) res.json(err);

        conn.query('INSERT INTO estadisticas SET ?', req.body, (err, rows) => {
            if (err) throw err;
            console.log(rows);
            res.redirect('/Estadisticas/');
        });
    });
};

controller.edit = (req, res) => {
    let { idestadisticas } = req.params;

    req.getConnection((err, conn) => {
        if (err) res.json(err);

        conn.query('SELECT * FROM estadisticas WHERE idestadisticas = ?', idestadisticas, (err, rows) => {
            console.log(rows);
            res.render('estadisticas_edit', {
                data: rows[0],
            });
        });
    });
};

controller.update = (req, res) => {
    let { idestadisticas } = req.params;

    req.getConnection((err, conn) => {
        if (err) res.json(err);

        conn.query('UPDATE estadisticas SET ? WHERE idestadisticas = ?', [req.body, idestadisticas], (err, rows) => {
            console.log(rows);
            res.redirect('/Estadisticas/');
        });
    });
};

controller.delete = (req, res) => {
    let { idestadisticas } = req.params;

    req.getConnection((err, conn) => {
        if (err) res.json(err);

        conn.query('UPDATE estadisticas SET estado = "F" WHERE idestadisticas = ?', idestadisticas, (err, rows) => {
            console.log(rows);
            res.redirect('/Estadisticas/');
        });
    });
};

module.exports = controller;
