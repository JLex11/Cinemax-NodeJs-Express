require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const myConnection = require('express-myconnection');
const mysql = require('mysql');
const path = require('path');

const app = express();

//express settings
app.set('port', process.env.PORT || 3000);
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
//static files
app.use('/public', express.static(path.join(__dirname, '/public')));

//importing routes
const usuariosRoutes = require('./routes/usuarios');
const generosRoutes = require('./routes/generos');
const peliculasRoutes = require('./routes/peliculas');
const actoresRoutes = require('./routes/actores');
const directoresRoutes = require('./routes/directores');
const estadisticasRoutes = require('./routes/estadisticas');

//middlewares
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
        },
        'single'
    )
);
app.use(express.urlencoded({ extended: false }));

//routes
app.use('/Usuarios/', usuariosRoutes);
app.use('/Generos/', generosRoutes);
app.use('/Peliculas/', peliculasRoutes);
app.use('/Actores/', actoresRoutes);
app.use('/Directores/', directoresRoutes);
app.use('/Estadisticas/', estadisticasRoutes);
app.use('*', (req, res) => {
    const routesArr = {
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
    console.log(`Server runnig on PORT ${app.get('port')}`);
});
