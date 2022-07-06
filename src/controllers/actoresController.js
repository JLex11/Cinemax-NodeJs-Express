const utilFunctions = require('../utils/utilFunctions');

const controller = {};

controller.describe = (req, res) => {
  req.getConnection((err, conn) => {
    conn.query('DESCRIBE actor', (err, rows) => {
      if (err) res.json(err);
      res.json(rows);
    });
  });
};

controller.listAll = (req, res) => {
  req.getConnection((err, conn) => {
    conn.query('SELECT * FROM actor ORDER BY estado ASC', (err, rows, fields) => {
      if (err) res.json(err);
      res.json({
        rows: rows,
        fields: fields,
      });
    });
  });
};

controller.listOne = (req, res) => {
  let { id_actor } = req.params;

  req.getConnection((err, conn) => {
    conn.query('SELECT * FROM actor WHERE id_actor = ?', id_actor, (err, rows, fields) => {
      if (err) return res.json(err);

      if (rows != '') {
        res.json({
          rows: rows,
          fields: fields,
        });
      } else {
        return res.redirect(303, '/Actores/');
      }
    });
  });
};

controller.save = (req, res) => {
  for (let clave in req.body) {
    req.body[clave] = utilFunctions.capitalize(req.body[clave]);
  }
  
  if (req.file) {
    req.body.foto = '/public/fotos/actores/' + req.file.originalname;
  }

  req.getConnection((err, conn) => {
    if (err) return res.json(err);

    conn.query('INSERT INTO actor SET ?', req.body, (err, rows) => {
      console.log(rows);
      res.redirect(303, '/Actores/');
    });
  });
};

controller.edit = (req, res) => {
  let { id_actor } = req.params;

  req.getConnection((err, conn) => {
    if (err) res.json(err);

    conn.query('SELECT * FROM actor WHERE id_actor = ?', id_actor, (err, rows, fields) => {
      res.json({
        rows: rows,
        fields: fields
      });
    });
  });
};

controller.update = (req, res) => {
  let { id_actor } = req.params;

  for (let clave in req.body) {
    req.body[clave] = utilFunctions.capitalize(req.body[clave]);
  }
  
  if (req.file) {
    req.body.foto = '/public/fotos/actores/' + req.file.originalname;
  }

  req.getConnection((err, conn) => {
    if (err) return res.json(err);

    conn.query('UPDATE actor SET ? WHERE id_actor = ?', [req.body, id_actor], (err, rows) => {
      if (err) return res.json(err);
      console.log(rows);
      res.redirect(303, '/Actores/');
    });
  });
};

controller.delete = (req, res) => {
  let { id_actor } = req.params;

  req.getConnection((err, conn) => {
    if (err) return res.json(err);

    conn.query('UPDATE actor SET estado = "F" WHERE id_actor = ?', id_actor, (err, rows) => {
      console.log(rows);
      res.redirect(303, '/Actores/');
    });
  });
};

module.exports = controller;