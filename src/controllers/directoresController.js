const utilFunctions = require('../utils/utilFunctions');

const controller = {};

controller.describe = (req, res) => {
  req.getConnection((err, conn) => {
    conn.query('DESCRIBE director', (err, rows) => {
      if (err) res.json(err);
      res.json(rows);
    });
  });
};

controller.listAll = (req, res) => {
  req.getConnection((err, conn) => {
    conn.query('SELECT * FROM director ORDER BY estado ASC', (err, rows) => {
      if (err) res.json(err);

      res.json(rows);
    });
  });
};

controller.listOne = (req, res) => {
  let { id_director } = req.params;

  req.getConnection((err, conn) => {
    conn.query('SELECT * FROM director WHERE id_director = ?', id_director, (err, rows) => {
      if (err) res.json(err);

      if (rows != '') {
        res.json(rows);
      } else {
        res.redirect('/Directores/');
      }
    });
  });
};

controller.save = (req, res) => {
  for (let clave in req.body) {
    req.body[clave] = utilFunctions.capitalize(req.body[clave]);
  }
  if (req.file) {
    req.body.foto = '/public/fotos/directores/' + req.file.originalname;
  }

  req.getConnection((err, conn) => {
    if (err) res.json(err);

    console.log('req.body',req.body);
    conn.query('INSERT INTO director SET ?', req.body, (err, rows) => {
      res.json(err);
      console.log(rows);
      res.redirect('/Directores/');
    });
  });
};

controller.edit = (req, res) => {
  let { id_director } = req.params;

  req.getConnection((err, conn) => {
    if (err) res.json(err);

    conn.query('SELECT * FROM director WHERE id_director = ?', id_director, (err, rows) => {
      console.log(rows);
      res.json(rows);
    });
  });
};

controller.update = (req, res) => {
  let { id_director } = req.params;
  for (let clave in req.body) {
    req.body[clave] = utilFunctions.capitalize(req.body[clave]);
  }
  if (req.file) {
    req.body.foto = '/public/fotos/directores/' + req.file.originalname;
  }

  req.getConnection((err, conn) => {
    if (err) res.json(err);

    conn.query('UPDATE director SET ? WHERE id_director = ?', [req.body, id_director], (err, rows) => {
      console.log('rows',rows);
      res.redirect('/Directores/');
    });
  });
};

controller.delete = (req, res) => {
  let { id_director } = req.params;

  req.getConnection((err, conn) => {
    if (err) res.json(err);

    conn.query('UPDATE director SET estado = "F" WHERE id_director = ?', id_director, (err, rows) => {
      console.log(rows);
      res.redirect('/Directores/');
    });
  });
};

module.exports = controller;