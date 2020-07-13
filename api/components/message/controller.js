const store = require('./store');
const socket = require('../../socket').socket;
const config = require('../../config');

function getMessages(filterChat) {
	return new Promise((resolve, reject) => {
		resolve(store.getMessages(filterChat));
	});
}

function addMessage(chat, user, message, file) {
	return new Promise((resolve, reject) => {
		if (!user || !message || !chat) {
			reject('Los datos son incorrectos');
			return false;
		}

		let fileUrl = '';
		if (file) {
			fileUrl = `${config.host}:${config.port}${config.publicRoute}/files/${file.filename}`;
		}

		const newMessage = {
			chat,
			user,
			message,
			date: new Date(),
			file: fileUrl,
		};
		store.addMessage(newMessage);

		socket.io.emit('message', newMessage);

		resolve(newMessage);
	});
}

function updateMessage(id, message) {
	return new Promise(async (resolve, reject) => {
		if (!id || !message) {
			reject('Los datos son invalidos');
		}
		const result = await store.updateMessage(id, message);
		resolve(result);
	});
}

function deleteMessage(id) {
	return new Promise((resolve, reject) => {
		if (!id) {
			reject('Los datos son invalidos');
		}
		store
			.deleteMessage(id)
			.then((result) => {
				resolve(result);
			})
			.catch((err) => reject(err));
	});
}

module.exports = {
	addMessage,
	getMessages,
	updateMessage,
	deleteMessage,
};
