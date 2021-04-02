const sequelize = require("sequelize");
const { Op } = require("sequelize");
const Conversation = require("../Models/Conversation");
const User = require("../Models/User");
const Message = require("../Models/Message");
const User_Conversation = require("../Models/User_Conversation");
const Helper = require("../libs/Helper");

exports.getConversationById = (req, res, next) => {
  Conversation.findOne({
    where: {
      id: req.query.id,
    },
    include: {
      model: User,
      attributes: ["name"],
      through: {
        attributes: [],
      },
    },
  })
    .then((conversation) => {
      res.send(conversation);
    })
    .catch((error) => {
      console.log(error);
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
  const UserWithConversationsAndFriends = await User.findOne({
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
      },
    },
  });

  const conversationsWithUserId = UserWithConversationsAndFriends.Conversations;
  if (isConversationExist(conversationsWithUserId) == false) {
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
    res.send("c'est mort");
  }

  function isConversationExist(conversationsWithUserId) {
    let countOfConvWithFriend = 0;
    for (const singleConversation of conversationsWithUserId) {
      if (singleConversation.getDataValue("Users").length == 2) {
        const idUserA = singleConversation.getDataValue("Users")[0].getDataValue("id");
        const idUserB = singleConversation.getDataValue("Users")[1].getDataValue("id");
        if (friendId == idUserA) {
          countOfConvWithFriend++;
        }
        if (friendId == idUserB) {
          countOfConvWithFriend++;
        }
      }
      if (countOfConvWithFriend >= 1) {
        return true;
      }
    }
    return false;
  }
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
