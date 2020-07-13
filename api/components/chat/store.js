const Model = require('./model');

function addChat(users) {
  const myChat = new Model(users);
  console.log(myChat);
  return myChat.save();
}

async function getChats(userId) {
  return new Promise((resolve, reject) => {
    let filter = {};
    if (userId) {
      filter = {
        users: userId,
      };
    }
    Model.find(filter)
      .populate('users')
      .exec((error, populated) => {
        if (error) {
          reject(error);
          return false;
        }
        resolve(populated);
      });
  });
}

module.exports = {
  addChat,
  getChats,
};
