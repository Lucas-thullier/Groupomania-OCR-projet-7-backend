const Conversation = require("../Models/Conversation");
const User = require("../Models/User");
const Message = require("../Models/Message");

exports.getConversation = (req, res, next) => {
  Message.getConversationFor(1).then((messageData) => {
    return res.send(messageData);
  });
};
