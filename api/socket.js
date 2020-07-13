const socketIO = require('socket.io');
const socket = {};

// Funcion para conectar un server a la propiedad io del socket
function connect(server) {
	socket.io = socketIO(server);
}

module.exports = {
	connect,
	socket,
};
