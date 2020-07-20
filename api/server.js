const express = require('express');
// Creamos y declaramos app como la aplicacion de express
const app = express();
// Creamos el servidor http y le pasamos la aplicacion express
const server = require('http').Server(app);

const cors = require('cors');
const bodyParser = require('body-parser');
const socket = require('./socket');

const db = require('./bd');
const config = require('./config');
const router = require('./network/routes');

db(config.uri);

// Le decimos a la aplicacion express que configure los headers de CORS
app.use(cors());

// Le decimos a la aplicacion express que use los bodyParser definidos
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Conectamos el socket al server
socket.connect(server);

// Configuramos las rutas del servidor
router(app);

// Le decimos a la aplicacion de express cual es la ruta publica por defecto
// y que carpetas de archivos va a renderizar en la vista
app.use(config.publicRoute, express.static('public'));

// Iniciamos el servidor http
app.listen(config.port, () => {
  console.log(
    `La aplicacion esta escuchando en: ${config.host}:${config.port}`
  );
});
