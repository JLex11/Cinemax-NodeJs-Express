require('dotenv').config();
const express = require('express');
const cors = require('cors');
/* const morgan = require('morgan'); */
const myConnection = require('express-myconnection');
const compression = require('compression');
const mysql = require('mysql');
const path = require('path');

//launch server tu global with ngrok
(async () => {
  const ngrok = require('ngrok');
  await ngrok.authtoken(process.env.NGROK_AUTHTOKEN);
  const url = await ngrok.connect(process.env.PORT);
  console.log(url);
})();

// create express instance
const app = express();

//importing routes
const usuariosRoutes = require('./routes/usuarios');
const generosRoutes = require('./routes/generos');
const peliculasRoutes = require('./routes/peliculas');
const actoresRoutes = require('./routes/actores');
const directoresRoutes = require('./routes/directores');
const estadisticasRoutes = require('./routes/estadisticas');

//express settings
app.set('port', process.env.PORT || 3000);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));

//middlewares
app.use(compression({
  level: 6, // compression level from 1 to 9
  filter: (req, res) => { 
    // filter function to decide if the response should be compressed
    if (req.headers['x-no-compression']) {
      return false;
    }
    return compression.filter(req, res);
  }
}));
app.use(cors());
/* app.use(morgan('dev')); */
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
//express.urlencoded() is used to parse the body of the request into a JavaScript object.
app.use(express.urlencoded({ extended: false }));

//static files
app.use('/public', express.static(path.join(__dirname, '/public')));

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
