const Model = require('./model');

async function getMessages(filterChat) {
  return new Promise((resolve, reject) => {
    let filter = {};
    if (filterChat !== null) {
      filter = {
        chat: filterChat,
      };
    }
    Model.find(filter)
      .populate('user')
      .exec((error, populated) => {
        if (error) {
          reject(error);
          return false;
        }
        resolve(populated);
      });
  });
}

function addMessage(message) {
  const myMessage = new Model(message);
  myMessage.save();
}

async function updateMessage(id, message) {
  const foundMessage = await Model.findOne({
    _id: id,
  });
  foundMessage.message = message;
  const newMessage = await foundMessage.save();
  return newMessage;
}

function deleteMessage(id) {
  return Model.deleteOne({ _id: id });
}

module.exports = {
  addMessage,
  getMessages,
  updateMessage,
  deleteMessage,
};
