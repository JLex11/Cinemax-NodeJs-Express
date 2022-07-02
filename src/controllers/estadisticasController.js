const controller = {};

controller.describe = (req, res) => {
  req.getConnection((err, conn) => {
    conn.query('DESCRIBE estadisticas', (err, rows) => {
      if (err) res.json(err);
      res.json(rows);
    });
  });
};

controller.listAll = (req, res) => {
  req.getConnection((err, conn) => {
    conn.query('SELECT * FROM estadisticas WHERE estado = "T"', (err, rows) => {
      if (err) res.json(err);

      res.json(rows);
    });
  });
};

controller.listOne = (req, res) => {
  let { id_estadisticas } = req.params;

  req.getConnection((err, conn) => {
    conn.query('SELECT * FROM estadisticas WHERE id_estadisticas = ? estado = "T"', id_estadisticas, (err, rows) => {
      if (err) res.json(err);

      if (rows != '') {
        res.json(rows);
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
  let { id_estadisticas } = req.params;

  req.getConnection((err, conn) => {
    if (err) res.json(err);

    conn.query('SELECT * FROM estadisticas WHERE id_estadisticas = ?', id_estadisticas, (err, rows) => {
      console.log(rows);
      res.json(rows);
    });
  });
};

controller.update = (req, res) => {
  let { id_estadisticas } = req.params;

  req.getConnection((err, conn) => {
    if (err) res.json(err);

    conn.query('UPDATE estadisticas SET ? WHERE id_estadisticas = ?', [req.body, id_estadisticas], (err, rows) => {
      console.log(rows);
      res.redirect('/Estadisticas/');
    });
  });
};

controller.delete = (req, res) => {
  let { id_estadisticas } = req.params;

  req.getConnection((err, conn) => {
    if (err) res.json(err);

    conn.query('UPDATE estadisticas SET estado = "F" WHERE id_estadisticas = ?', id_estadisticas, (err, rows) => {
      console.log(rows);
      res.redirect('/Estadisticas/');
    });
  });
};

module.exports = controller;
