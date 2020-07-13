const db = require('mongoose');

// Seteamos la propiedad de promesas global a las promesas de mongoose
db.Promise = global.Promise;

// Funcion asincrona que conecta a la base de datos
async function connect(uri) {
  await db.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  console.log('[Database] conectada con exito');
}

module.exports = connect;
