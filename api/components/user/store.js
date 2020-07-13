const Model = require('./model');

function addUser(user) {
  const myUser = new Model(user);
  return myUser.save();
}

async function getUsers(filterName) {
  let filter = {};
  if (filterName !== null) {
    filter = {
      name: filterName,
    };
  }
  const users = await Model.find(filter);
  return users;
}

async function updateUser(id, name) {
  const foundUser = await Model.findOne({
    _id: id,
  });
  foundUser.name = name;
  const newUser = await foundUser.save();
  return newUser;
}

function deleteUser(id) {
  return Model.deleteOne({ _id: id });
}

module.exports = {
  addUser,
  getUsers,
  updateUser,
  deleteUser,
};
