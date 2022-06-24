const express = require('express');
const path = require('path');
const morgan = require('morgan');
const mysql = require('mysql');
const myConnection = require('express-myconnection');

const app = express();

//importing routes
const usuariosRoutes = require("./routes/usuarios");
const generosRoutes = require("./routes/generos");
const peliculasRoutes = require("./routes/peliculas");

//express settings
app.set("port", process.env.PORT || 3000);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
/* app.set("images", path.join(__dirname, "images")); */

//middlewares
app.use(morgan("dev"));
app.use(
    myConnection(
        mysql,
        {
            host: "localhost",
            user: "root",
            password: "",
            port: 3306,
            database: "cinemax",
        },
        "single"
    )
);
app.use(express.urlencoded({ extended: false }));

//routes
app.use("/Usuarios/", usuariosRoutes);
app.use("/Generos/", generosRoutes);
app.use("/Peliculas/", peliculasRoutes);

//static files
app.use(express.static(path.join(__dirname, 'public')));


// starting server
app.listen(app.get('port'), () => {
    console.log(`Server runnig on PORT ${app.get('port')}`);
});