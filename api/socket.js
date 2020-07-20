const socketIO = require('socket.io');
const socket = {};
const userModel = require('./components/user/model');
const messageModel = require('./components/message/model');

// Funcion para conectar un server a la propiedad io del socket
function connect(server) {
	socket.io = socketIO(server);
	initializate();
}

function initializate() {
	socket.io.on('connection', (client) => {
		console.log(`Un cliente se ha conectado: ${client.id}`);

		client.on('getMessages', async (filter, callback) => {
			let messages = await getMessages(filter);
			callback(messages);
			client.broadcast.emit('messages', messages);
			client.emit('messages', messages);
		});

		client.on('postMessage', async (data) => {
			console.log('Alguien creo un mensaje');
			let newMessage = await createMessage(data.message);
			let messages = await getMessages(data.filter);
			client.emit('messages', JSON.stringify(messages));
			socket.io.emit('messages', JSON.stringify(messages));
		});

		client.on('disconnect', () => {
			console.log(`Un cliente se ha desconectado: ${client.id}`);
		});
	});
}

async function createMessage(message) {
	const myMessage = new messageModel(message);
	myMessage.save();
}

async function getMessages(filterChat) {
	let response;
	let messages;
	let filter = {};
	if (filterChat !== null) {
		filter = {
			chat: filterChat,
		};
	}
	try {
		messages = await messageModel.find(filter).populate('user').exec();
		if (messages) {
			response = successResponse(messages, 200);
		}
	} catch (error) {
		response = errorResponse('Fallo al obtener mensajes', 500, error);
	}
	return response;
}

const statusMessages = {
	200: 'Done',
	201: 'Created',
	400: 'Invalid format',
	500: 'Internal error',
};

function successResponse(message, status) {
	let statusCode = status;
	let statusMessage = message;
	if (!status) {
		status = 200;
	}
	if (!message) {
		statusMessage = statusMessages[status];
	}
	return {
		status,
		body: statusMessage,
		error: '',
	};
}

function errorResponse(message, status, details) {
	console.error(details);
	return {
		status,
		body: '',
		error: message,
	};
}

module.exports = {
	connect,
	socket,
};
