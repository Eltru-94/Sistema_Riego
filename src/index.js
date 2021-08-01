//Modulos
const express = require("express"); //Framework
const morgan = require("morgan");
const exphbs = require("express-handlebars");
const path = require("path");
const flash = require("connect-flash");
const session = require("express-session");
const MySQLStore = require("express-mysql-session");
const { database } = require("./keys");
const passport = require("passport");


//Inicialización Modulos
const app = express();
require("./lib/passport");
//Globales
global.config = require('./lib/Sensores');



app.set("port", process.env.PORT || 80); //Port Servidor
//app.set("host", "192.168.1.145");
app.set("views", path.join(__dirname, "views"));
app.engine(
  ".hbs",
  exphbs({
    defaultLayout: "main",
    layoutsDir: path.join(app.get("views"), "layouts"),
    partialsDir: path.join(app.get("views"), "partials"),
    extname: ".hbs",
    helpers: require("./lib/handlebars"),
  })
);
app.locals = global.config;
//Inicialización plantilla
app.set("view engine", ".hbs");
//Middlewares
app.use(
  session({
    secret: "faztmysqlnodesession",
    resave: false,
    saveUninitialized: false,
    store: new MySQLStore(database),
  })
);
app.use(flash());
app.use(morgan("dev")); //Inicialiacion y nos muestra un mensaje por consola, dev
app.use(express.urlencoded({ extended: false })); // metodo para restringir los datos que me envia el usuario
app.use(express.json());
app.use(passport.initialize());
app.use(passport.session());
//Variables Globales toma la informacion del usuario
app.use((req, res, next) => {
  app.locals.success = req.flash("success");
  app.locals.mensage = req.flash("mensage");
  app.locals.user = req.user; // es para poder aceder a los datos del usuario desde cualquier vistas cuando login
  next();
});
//Rutas
app.use(require("./routes"));
app.use("/login", require("./routes/login"));
app.use("/Administrativo", require("./routes/admin"));
/*Modulo 1*/
app.use("/cliente", require("./routes/admin/cliente"));
app.use("/usuario", require("./routes/admin/user"));
app.use("/rol", require("./routes/admin/roles"));
app.use("/modulo", require("./routes/admin/modulo"));
/*Modulo 2*/
app.use("/CalculosRiego", require("./routes/riego/CalculosRiego"));
app.use("/ActivacionRiego", require("./routes/riego"));

/*Modulo 3*/
app.use("/Temperatura", require("./routes/GestionDatosClima"));
app.use("/HumedadSuelo", require("./routes/GestionDatosClima/humedadSuelo"));
app.use("/HumedadRelativa", require("./routes/GestionDatosClima/humedad_relativa"));

/*Modulo Cultivo */
app.use("/GestionCultivo", require("./routes/Cultivo"));
app.use("/RiegoCultivo", require("./routes/Cultivo/RiegoCultivo"));
app.use("/Formula",require("./routes/Formula"));
/*Modulo Visualizacion Graficos */
app.use("/VisualizacionSensores", require("./routes/Graficos/Sensores"));
app.use("/GraficoTemperatura", require("./routes/Graficos/temperatura"));
app.use("/GraficoHR", require("./routes/Graficos/humedadr"));
//Carpeta publica
app.use(express.static(path.join(__dirname, "public")));

//Inicialización Servidor
app.listen(app.get("port"), app.get("host"), () => {
  console.log("Servidor Puerto", app.get("port"));

  //console.log(`Servidor corriendo en http://${app.get("host")}:${app.get("port")}`);
});


