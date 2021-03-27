const { Op } = require("sequelize");
const Conversation = require("../Models/Conversation");
const User = require("../Models/User");
const Message = require("../Models/Message");
const User_Conversation = require("../Models/User_Conversation");

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

exports.createConversation = async (req, res, next) => {
  const userId = req.body.userId;
  const friendId = req.body.friendId;
  const isAlreadyConversation = await User_Conversation.count({
    where: {
      id: {
        [Op.or]: [userId, friendId],
      },
    },
  });
  if (!isAlreadyConversation) {
    const conversation = await Conversation.create();

    await User_Conversation.create({
      user_id: userId,
      conversation_id: conversation.getDataValue("id"),
    });
    await User_Conversation.create({
      user_id: friendId,
      conversation_id: conversation.getDataValue("id"),
    });
    res.send(true);
  } else {
    res.send(false);
  }
};
