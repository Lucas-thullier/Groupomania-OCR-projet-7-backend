const { Op } = require("sequelize");
const Conversation = require("../Models/Conversation");
const User = require("../Models/User");
const Message = require("../Models/Message");

exports.getConversation = (req, res, next) => {
  Message.getConversationFor(req.query.convId).then((messageData) => {
    return res.send(messageData);
  });
};

exports.getAllConvByUserId = (req, res, next) => {
  const userId = req.query.userId;
  User.findOne({
    where: {
      id: userId,
    },
    include: [
      {
        model: Conversation,
        include: [
          {
            model: User,
            attributes: {
              exclude: ["password"],
            },
            where: {
              id: {
                [Op.not]: userId,
              },
            },
          },
        ],
      },
    ],
  }).then((userWithConv) => {
    const conversations = userWithConv.getDataValue("Conversations");
    res.send(conversations);
  });
};

// exports.getConversationByUserAndFriendId = (req, res, next) => {
//   const userId = req.query.userId;
//   const friendId = req.query.friendId;

//   Conversation.getConvId(userId, friendId).then((convData) => {
//     const convId = convData.dataValues.id;
//     Message.getConversationFor(convId).then((messagesData) => {
//       messagesData = { convId: convId, messagesData: messagesData };
//       res.send(messagesData);
//     });
//   });
