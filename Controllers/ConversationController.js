const sequelize = require("sequelize");
const { Op } = require("sequelize");
const Conversation = require("../Models/Conversation");
const User = require("../Models/User");
const Message = require("../Models/Message");
const User_Conversation = require("../Models/User_Conversation");
const Helper = require("../libs/Helper");

exports.getConversation = (req, res, next) => {
  Message.getConversationFor(req.query.convId).then((messageData) => {
    return res.send(messageData);
  });
};

exports.getAllConvByUserId = (req, res, next) => {
  const authToken = req.headers.authorization;
  const userId = Helper.getUserIdWithToken(authToken);
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
  const authToken = req.headers.authorization;
  const userId = Helper.getUserIdWithToken(authToken);
  const friendId = req.body.friendId;
  // const isAlreadyConversation = await User_Conversation.count({
  //   where: {
  //     user_id: {
  //       [Op.or]: [userId, friendId],
  //     },
  //   },
  // });
  const test = await User.findOne({
    where: {
      id: userId,
    },
    attributes: ["id"],
    include: {
      model: Conversation,
      attributes: ["id"],
      through: {
        attributes: [],
      },
      include: {
        model: User,
        attributes: ["id"],
        through: {
          attributes: [],
        },
        where: {
          id: friendId,
        },
        attributes: ["id"],
        through: {
          attributes: [],
        },
      },
    },
  });
  console.log(test.Conversations[0].getDataValue("Users"));
  res.send("tg");
  // if (!isAlreadyConversation) {
  //   const conversation = await Conversation.create();

  //   await User_Conversation.create({
  //     user_id: userId,
  //     conversation_id: conversation.getDataValue("id"),
  //   });
  //   await User_Conversation.create({
  //     user_id: friendId,
  //     conversation_id: conversation.getDataValue("id"),
  //   });
  //   res.send(true);
  // } else {
  //   res.send(false);
  // }
};

exports.changeConversationPicture = (req, res, next) => {
  const convId = req.body.convId;
  Conversation.update(
    {
      imageUrl: `${req.protocol}://${req.get("host")}/images/${req.file.filename}`,
    },
    {
      where: {
        id: convId,
      },
    }
  )
    .then((updatedUser) => {
      res.send("update effectue");
    })
    .catch((error) => {
      console.log(error);
    });
};
