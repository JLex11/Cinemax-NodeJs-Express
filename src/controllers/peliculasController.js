const utilFunctions = require('../utils/utilFunctions');

const controller = {};

controller.describe = (req, res) => {
  req.getConnection((err, conn) => {
    conn.query('DESCRIBE pelicula', (err, rows) => {
      if (err) res.json(err);
      res.json(rows);
    });
  });
};

controller.listAll = (req, res) => {
  req.getConnection((err, conn) => {
    conn.query(
      'SELECT pelicula.id_pelicula,\n'
            + 'pelicula.titulo_original,\n'
            + 'pelicula.titulo_latino,\n'
            + 'pelicula.foto,\n'
            + 'pelicula.id_tipo,\n'
            + 'pelicula.id_pais,\n'
            + 'pelicula.lanzamiento,\n'
            + 'pelicula.duracion,\n'
            + 'pelicula.resena,\n'
            + 'pelicula.estado,\n'
            + 'estadisticas.cant_vistas,\n'
            + 'estadisticas.cant_likes,\n'
            + 'estadisticas.cant_comentarios\n'
            + 'FROM   pelicula\n'
            + 'LEFT JOIN estadisticaspelicula\n'
            + 'ON pelicula.id_pelicula = estadisticaspelicula.id_pelicula\n'
            + 'INNER JOIN estadisticas\n'
            + 'ON estadisticaspelicula.id_estadisticas =\n'
            + 'estadisticas.id_estadisticas;',
      (err, rows) => {
        if (err) throw err;

        res.json(rows);
      }
    );
  });
};

controller.listOne = (req, res) => {
  let { id_pelicula } = req.params;

  req.getConnection((err, conn) => {
    conn.query('SELECT * FROM pelicula WHERE id_pelicula = ? AND estado = "T"', id_pelicula, (err, rows) => {
      if (err) throw err;

      if (rows != '') {
        res.json(rows);
      } else {
        res.redirect('/Peliculas/');
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
    if (err) throw err;

    conn.query('INSERT INTO pelicula SET ?', req.body, (err, rows) => {
      console.log(rows);
      res.redirect('/Peliculas/');
    });
  });
};

controller.edit = (req, res) => {
  let { id_pelicula } = req.params;

  req.getConnection((err, conn) => {
    if (err) throw err;

    conn.query('SELECT * FROM pelicula WHERE id_pelicula = ?', id_pelicula, (err, rows) => {
      console.log(rows[0]);
      res.json(rows);
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
    if (err) throw err;

    conn.query('UPDATE pelicula SET ? WHERE id_pelicula = ?', [req.body, id_pelicula], (err, rows) => {
      console.log(rows);
      res.redirect('/Peliculas/');
    });
  });
};

controller.delete = (req, res) => {
  let { id_pelicula } = req.params;

  req.getConnection((err, conn) => {
    if (err) throw err;

    conn.query('UPDATE pelicula SET estado = "F" WHERE id_pelicula = ?', id_pelicula, (err, rows) => {
      console.log(rows);
      res.redirect('/Peliculas/');
    });
  });
};

module.exports = controller;