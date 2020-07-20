// Prueba de como funcionan los sockets
const express = require('express');
const app = express();
const server = require('http').Server(app);
// Socket io recibe como parametro un servidor y conecta un socket al mismo
const io = require('socket.io')(server);

// Le decimos que use public como la ruta para renderizar las vistas
app.use(express.static('public'));

io.on('connection', (socket) => {
  console.log('Nuevo cliente conectado');
  socket.emit('mensaje', 'Bienvenido');
});

setInterval(() => {
  io.emit('mensaje', 'Hola, les escribo a todos');
}, 3000);

server.listen(8080, () => {
  console.log('Servidor iniciado en http://localhost:8080');
});
