const controller = {};

controller.describe = (req, res) => {
  req.getConnection((err, conn) => {
    conn.query('DESCRIBE estadisticas', (err, rows) => {
      if (err) return res.json(err);
      res.json(rows);
    });
  });
};

controller.listAll = (req, res) => {
  req.getConnection((err, conn) => {
    conn.query('SELECT * FROM estadisticas ORDER BY estado ASC', (err, rows, fields) => {
      if (err) return res.json(err);
      res.json({ rows, fields });
    });
  });
};

controller.listOne = (req, res) => {
  let { id_estadisticas } = req.params;

  req.getConnection((err, conn) => {
    conn.query('SELECT * FROM estadisticas WHERE id_estadisticas = ?', id_estadisticas, (err, rows, fields) => {
      if (err) return res.json(err);

      if (rows != '') {
        return res.json({rows, fields});
      } else {
        return res.redirect(303, '/Estadisticas/');
      }
    });
  });
};

controller.save = (req, res) => {
  req.getConnection((err, conn) => {
    conn.query('INSERT INTO estadisticas SET ?', req.body, (err, rows) => {
      if (err) return res.json(err);
      console.log(rows);
      res.redirect(303, '/Estadisticas');
    });
  });
};

controller.edit = (req, res) => {
  let { id_estadisticas } = req.params;

  req.getConnection((err, conn) => {
    if (err) return res.json(err);

    conn.query('SELECT * FROM estadisticas WHERE id_estadisticas = ?', id_estadisticas, (err, rows, fields) => {
      console.log(rows);
      res.json({rows, fields});
    });
  });
};

controller.update = (req, res) => {
  let { id_estadisticas } = req.params;

  req.getConnection((err, conn) => {
    if (err) return res.json(err);

    conn.query('UPDATE estadisticas SET ? WHERE id_estadisticas = ?', [req.body, id_estadisticas], (err, rows) => {
      console.log(rows);
      res.redirect(303, '/Estadisticas/');
    });
  });
};

controller.delete = (req, res) => {
  let { id_estadisticas } = req.params;

  req.getConnection((err, conn) => {
    if (err) return res.json(err);

    conn.query('UPDATE estadisticas SET estado = "F" WHERE id_estadisticas = ?', id_estadisticas, (err, rows) => {
      console.log(rows);
      res.redirect(303, '/Estadisticas/');
    });
  });
};

module.exports = controller;
