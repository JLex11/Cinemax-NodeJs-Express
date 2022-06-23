const { connect } = require("../routes/generos");

const controller = {};

controller.listAll = (req, res) => {
    req.getConnection((err, connect) => {
        connect.query('SELECT * FROM genero WHERE estado = "T"', (err, rows) => {
            if (err) res.json(err);

            res.render('generos', {
                data: rows
            });
        });
    })
};

controller.listOne = (req, res) => {
    res.send('One gender show')
}

controller.save = (req, res) => {
    let generoData = req.body;

    req.getConnection((err, connect) => {
        if (err) res.json(err);

        connect.query('INSERT INTO genero SET ?', generoData, (err, rows) => {
            console.log(rows);
            res.redirect('/Generos/');
        });
    });
};

controller.edit = (req, res) => {
    let { idgenero } = req.params;

    req.getConnection((err, connect) => {
        if (err) res.json(err);
        
        connect.query('SELECT * FROM genero WHERE idgenero = ?', idgenero, (err, rows) => {
            console.log(rows);
            res.render('generos_edit', {
                data: rows[0]
            });
        });
    });
};

controller.update = (req, res) => {
    let { idgenero } = req.params;
    let generoData = {
        nombre: req.body.nombre,
        estado: req.body.estado
    };

    req.getConnection((err, connect) => {
        if (err) res.json(err);

        connect.query('UPDATE genero SET ? WHERE idgenero = ?', [generoData, idgenero], (err, rows) => {
            console.log(rows);
            res.redirect('/Generos/');
        });
    });
}

controller.delete = (req, res) => {
    let { idgenero } = req.params;

    req.getConnection((err, connect) => {
        if (err) res.json(err);

        connect.query('UPDATE genero SET estado = "F" WHERE idgenero = ?', idgenero, (err, rows) => {
            console.log(rows);
            res.redirect('/Generos/');
        });
    });
};

module.exports = controller;