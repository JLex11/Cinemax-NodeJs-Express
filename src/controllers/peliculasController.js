const queries = require('../queries/peliculasQueries');
const utilFunctions = require('../utils/utilFunctions');

const controller = {};

controller.describe = (req, res) => {
  req.getConnection((err, conn) => {
    conn.query('DESCRIBE pelicula', (err, rows) => {
      if (err) return res.json(err);
      res.json(rows);
    });
  });
};

controller.listAll = (req, res) => {
  req.getConnection((err, conn) => {
    conn.query(queries.all, (err, rows, fields) => {
      if (err) return res.json(err);

      res.json({
        rows: rows,
        fields: fields,
      });
    });
  });
};

controller.listOne = (req, res) => {
  let { id_pelicula } = req.params;

  req.getConnection((err, conn) => {
    conn.query(queries.one, id_pelicula, (err, rows, fields) => {
      if (err) return res.json(err);

      if (rows != '') {
        return res.json({
          rows: rows,
          fields: fields,
        });
      } else {
        return res.redirect(303, '/Peliculas/');
      }
    });
  });
};

controller.save = (req, res) => {
  for (let clave in req.body) {
    req.body[clave] = utilFunctions.capitalize(req.body[clave]);
  }
  if (req.file) {
    req.body.foto = '/public/fotos/peliculas/' + req.file.filename;
  }

  req.getConnection((err, conn) => {
    if (err) return res.json(err);

    conn.query(queries.insert, req.body, (err, rows) => {
      console.log(rows);
      res.redirect(303, '/Peliculas/');
    });
  });
};

controller.edit = (req, res) => {
  let { id_pelicula } = req.params;

  req.getConnection((err, conn) => {
    if (err) return res.json(err);

    conn.query(queries.one, id_pelicula, (err, rows, fields) => {
      console.log(rows);
      res.json({rows, fields});
    });
  });
};

controller.update = (req, res) => {
  let { id_pelicula } = req.params;

  for (let clave in req.body) {
    req.body[clave] = utilFunctions.capitalize(req.body[clave]);
  }
  
  if (req.file) {
    req.body.foto = '/public/fotos/peliculas/' + req.file.filename;
  }

  req.getConnection((err, conn) => {
    if (err) return res.json(err);

    conn.query(queries.update, [req.body, id_pelicula], (err, rows) => {
      console.log(rows);
      res.redirect(303, '/Peliculas/');
    });
  });
};

controller.delete = (req, res) => {
  let { id_pelicula } = req.params;

  req.getConnection((err, conn) => {
    if (err) return res.json(err);

    conn.query(queries.delete, id_pelicula, (err, rows) => {
      console.log(rows);
      res.redirect(303, '/Peliculas/');
    });
  });
};

module.exports = controller;