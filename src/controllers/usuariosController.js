const controller = {};

controller.describe = (req, res) => {
  req.getConnection((err, conn) => {
    conn.query('DESCRIBE usuario', (err, rows) => {
      if (err) return res.json(err);
      res.json(rows);
    });
  });
};

controller.listAll = (req, res) => {
  req.getConnection((err, conn) => {
    conn.query('SELECT * FROM usuario WHERE estado = "T"', (err, rows, fields) => {
      if (err) return res.json(err);

      res.json({rows, fields});
    });
  });
};

controller.listOne = (req, res) => {
  let { user } = req.params;

  req.getConnection((err, conn) => {
    conn.query('SELECT * FROM usuario WHERE user = ? estado = "T"', user, (err, rows, fields) => {
      if (err) return res.json(err);

      if (rows != '') {
        return res.json({rows, fields});
      } else {
        return res.redirect(303, '/Usuarios/');
      }
    });
  });
};

controller.save = (req, res) => {
  req.getConnection((err, conn) => {
    if (err) return res.json(err);

    conn.query('INSERT INTO usuario SET ?', req.body, (err, rows) => {
      console.log(rows);
      res.redirect(303, '/Usuarios/');
    });
  });
};

controller.edit = (req, res) => {
  let { user } = req.params;

  req.getConnection((err, conn) => {
    if (err) return res.json(err);

    conn.query('SELECT * FROM usuario WHERE usuario = ?', user, (err, rows, fields) => {
      console.log(rows);
      res.json({rows, fields});
    });
  });
};

controller.update = (req, res) => {
  let { user } = req.params;

  req.getConnection((err, conn) => {
    if (err) return res.json(err);

    conn.query('UPDATE usuario SET ? WHERE usuario = ?', [req.body, user], (err, rows) => {
      console.log(rows);
      res.redirect(303, '/Usuarios/');
    });
  });
};

controller.delete = (req, res) => {
  let { user } = req.params;

  req.getConnection((err, conn) => {
    if (err) return res.json(err);

    conn.query('UPDATE usuario SET estado = "F" WHERE usuario = ?', user, (err, rows) => {
      console.log(rows);
      res.redirect(303, '/Usuarios/');
    });
  });
};

module.exports = controller;
