const { connect } = require("../routes/usuarios");

const controller = {};

controller.listAll = (req, res) => {
    req.getConnection((err, connect) => {
        connect.query('SELECT * FROM usuario WHERE estado = "T"', (err, rows) => {
            if (err) res.json(err);

            res.render('usuarios', {
                data: rows
            });
        });
    })
};

controller.listOne = (req, res) => {
    res.send('One user show')
}

controller.save = (req, res) => {
    let usuarioData = req.body;

    req.getConnection((err, connect) => {
        if (err) res.json(err);

        connect.query('INSERT INTO usuario SET ?', usuarioData, (err, rows) => {
            console.log(rows);
            res.redirect('/Usuarios/');
        });
    });
};

controller.edit = (req, res) => {
    let { user } = req.params;

    req.getConnection((err, connect) => {
        if (err) res.json(err);
        
        connect.query('SELECT * FROM usuario WHERE usuario = ?', user, (err, rows) => {
            console.log(rows);
            res.render('usuarios_edit', {
                data: rows[0]
            });
        });
    });
};

controller.update = (req, res) => {
    let { user } = req.params;
    let usuarioData = {
        contrasena: req.body.contrasena,
        estado: req.body.estado
    };

    req.getConnection((err, connect) => {
        if (err) res.json(err);

        connect.query('UPDATE usuario SET ? WHERE usuario = ?', [usuarioData, user], (err, rows) => {
            console.log(rows);
            res.redirect('/Usuarios/');
        });
    });
}

controller.delete = (req, res) => {
    let { user } = req.params;

    req.getConnection((err, connect) => {
        if (err) res.json(err);

        connect.query('UPDATE usuario SET estado = "F" WHERE usuario = ?', user, (err, rows) => {
            console.log(rows);
            res.redirect('/Usuarios/');
        });
    });
};

module.exports = controller;