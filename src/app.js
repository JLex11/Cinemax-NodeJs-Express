require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const myConnection = require('express-myconnection');
const compression = require('compression');
const mysql = require('mysql');
const path = require('path');

const app = express();

//express settings
app.set('port', process.env.PORT || 3000);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));

//middlewares
app.use(compression({
  level: 9,
  threshold: 10,
  filter: (req, res) => { 
    if (req.headers['x-no-compression']) {
      return false;
    }
    return compression.filter(req, res);
  }
}));
app.use(cors());
app.use(morgan('dev'));
app.use(
  myConnection(
    mysql,
    {
      host: process.env.MYSQL_HOST,
      user: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD,
      port: process.env.MYSQL_PORT,
      database: process.env.MYSQL_DB,
      dateStrings: true
    },
    'single'
  )
);
app.use(express.urlencoded({ extended: false }));

//static files
app.use('/public', express.static(path.join(__dirname, '/public')));

//importing routes
const usuariosRoutes = require('./routes/usuarios');
const generosRoutes = require('./routes/generos');
const peliculasRoutes = require('./routes/peliculas');
const actoresRoutes = require('./routes/actores');
const directoresRoutes = require('./routes/directores');
const estadisticasRoutes = require('./routes/estadisticas');

//routes
app.use('/Usuarios/', usuariosRoutes);
app.use('/Generos/', generosRoutes);
app.use('/Peliculas/', peliculasRoutes);
app.use('/Actores/', actoresRoutes);
app.use('/Directores/', directoresRoutes);
app.use('/Estadisticas/', estadisticasRoutes);

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/view/cinemaxAdmin.html'));
});
app.get('*', (req, res) => {
  const routesArr = {
    inicio: '/public/view/cinemaxAdmin.html',
    usuarios: '/Usuarios/',
    generos: '/Generos/',
    peliculas: '/Peliculas/',
    actores: '/Actores/',
    directores: '/Directores/',
    estadisticas: '/Estadisticas/',
  };

  res.render('index', {
    data: routesArr,
  });
});

// starting server
app.listen(app.get('port'), () => {
  console.log('-------------------------------------');
  console.log(`🚀Server runnig on PORT ${app.get('port')}🚀`);
});
