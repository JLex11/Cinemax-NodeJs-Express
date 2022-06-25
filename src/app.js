const express = require('express');
const morgan = require('morgan');
const mysql = require('mysql');
const myConnection = require('express-myconnection');

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
app.set('views', __dirname + '/views');

//middlewares
app.use(morgan('dev'));
app.use(
    myConnection(
        mysql,
        {
            host: 'localhost',
            user: 'root',
            password: '',
            port: 3306,
            database: 'cinemax',
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

//static files
app.use('/public', express.static(__dirname + '/public'));

// starting server
app.listen(app.get('port'), () => {
    console.log(`Server runnig on PORT ${app.get('port')}`);
});
