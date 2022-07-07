const controller = {};

controller.describe = (req, res) => {
  req.getConnection((err, conn) => {
    conn.query('DESCRIBE director', (err, rows) => {
      if (err) return res.json(err);
      res.json(rows);
    });
  });
};

controller.listAll = (req, res) => {
  req.getConnection((err, conn) => {
    conn.query('SELECT * FROM director ORDER BY estado ASC', (err, rows, fields) => {
      if (err) return res.json(err);

      res.json({ rows, fields });
    });
  });
};

controller.listOne = (req, res) => {
  let { id_director } = req.params;

  req.getConnection((err, conn) => {
    conn.query('SELECT * FROM director WHERE id_director = ?', id_director, (err, rows, fields) => {
      if (err) return res.json(err);

      if (rows != '') {
        return res.json({ rows, fields });
      } else {
        return res.redirect(303, '/Directores/');
      }
    });
  });
};

controller.save = (req, res) => {
  if (req.file) {
    req.body.foto = '/public/fotos/directores/' + req.file.originalname;
  }

  req.getConnection((err, conn) => {
    if (err) return res.json(err);

    conn.query('INSERT INTO director SET ?', req.body, (err, rows) => {
      console.log(rows);
      res.redirect(303, '/Directores/');
    });
  });
};

controller.edit = (req, res) => {
  let { id_director } = req.params;

  req.getConnection((err, conn) => {
    if (err) return res.json(err);

    conn.query('SELECT * FROM director WHERE id_director = ?', id_director, (err, rows, fields) => {
      console.log(rows);
      res.json({ rows, fields });
    });
  });
};

controller.update = (req, res) => {
  let { id_director } = req.params;
  if (req.file) {
    req.body.foto = '/public/fotos/directores/' + req.file.originalname;
  }

  req.getConnection((err, conn) => {
    if (err) return res.json(err);

    conn.query('UPDATE director SET ? WHERE id_director = ?', [req.body, id_director], (err, rows) => {
      console.log('rows', rows);
      res.redirect(303, '/Directores/');
    });
  });
};

controller.delete = (req, res) => {
  let { id_director } = req.params;

  req.getConnection((err, conn) => {
    if (err) return res.json(err);

    conn.query('UPDATE director SET estado = "F" WHERE id_director = ?', id_director, (err, rows) => {
      console.log(rows);
      res.redirect(303, '/Directores/');
    });
  });
};

module.exports = controller;
