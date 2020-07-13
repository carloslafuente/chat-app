const store = require('./store');

function addUser(name) {
  if (!name) {
    console.error('[UserController] No hay nombre de usuario');
    return Promise.reject('Los datos son incorrectos');
  }
  const newUser = {
    name,
  };
  return store.addUser(newUser);
}

function getUsers(filterName) {
  return store.getUsers(filterName);
}

function updateUser(id, name) {
  if (!id || !name) {
    return Promise.reject('Los datos son invalidos');
  }
  return store.updateUser(id, name);
}

function deleteUser(id) {
  if (!id) {
    console.log('[UserController] no hay id de usuario');
    return Promise.reject('Los datos son incorrectos');
  }
  return store.deleteUser(id);
}

module.exports = {
  addUser,
  getUsers,
  updateUser,
  deleteUser,
};
