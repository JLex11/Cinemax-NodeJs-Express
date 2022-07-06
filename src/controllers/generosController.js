const utilFunctions = require('../utils/utilFunctions');

const controller = {};

controller.describe = (req, res) => {
  req.getConnection((err, conn) => {
    conn.query('DESCRIBE genero', (err, rows) => {
      if (err) return res.json(err);
      res.json(rows);
    });
  });
};

controller.listAll = (req, res) => {
  req.getConnection((err, conn) => {
    conn.query('SELECT * FROM genero', (err, rows, fields) => {
      if (err) return res.json(err);

      res.json({ rows, fields });
    });
  });
};

controller.listOne = (req, res) => {
  let { id_genero } = req.params;

  req.getConnection((err, conn) => {
    conn.query('SELECT * FROM genero WHERE id_genero = ? estado = "T"', id_genero, (err, rows, fields) => {
      if (err) return res.json(err);

      if (rows != '') {
        return res.json({rows, fields});
      } else {
        return res.redirect(303, '/Generos/');
      }
    });
  });
};

controller.save = (req, res) => {
  for (let clave in req.body) {
    req.body[clave] = utilFunctions.capitalize(req.body[clave]);
  }

  req.getConnection((err, conn) => {
    if (err) return res.json(err);

    conn.query('INSERT INTO genero SET ?', req.body, (err, rows) => {
      if (err) return res.json(err);
      console.log(rows);
      res.redirect(303, '/Generos/');
    });
  });
};

controller.edit = (req, res) => {
  let { id_genero } = req.params;

  req.getConnection((err, conn) => {
    if (err) return res.json(err);

    conn.query('SELECT * FROM genero WHERE id_genero = ?', id_genero, (err, rows) => {
      console.log(rows);
      res.json(rows);
    });
  });
};

controller.update = (req, res) => {
  for (let clave in req.body) {
    req.body[clave] = utilFunctions.capitalize(req.body[clave]);
  }
  
  let { id_genero } = req.params;

  req.getConnection((err, conn) => {
    if (err) return res.json(err);

    conn.query('UPDATE genero SET ? WHERE id_genero = ?', [req.body, id_genero], (err, rows) => {
      console.log(rows);
      res.redirect(303, '/Generos/');
    });
  });
};

controller.delete = (req, res) => {
  let { id_genero } = req.params;

  req.getConnection((err, conn) => {
    if (err) return res.json(err);

    conn.query('UPDATE genero SET estado = "F" WHERE id_genero = ?', id_genero, (err, rows) => {
      console.log(rows);
      res.redirect(303, '/Generos/');
    });
  });
};

module.exports = controller;