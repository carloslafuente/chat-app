const store = require('./store');

function addChat(users) {
  if (!users || !Array.isArray(users) || users.length < 1) {
    console.error('[ChatController] No hay usuarios');
    return Promise.reject('Los datos son incorrectos');
  }
  const newChat = {
    users,
  };
  return store.addChat(newChat);
}

function getChats(userId) {
  if (!userId) {
    console.error('[ChatController] No hay hay chats');
    return Promise.reject('No hay chats para este usuario');
  }
  return store.getChats(userId);
}

module.exports = {
  addChat,
  getChats,
};
