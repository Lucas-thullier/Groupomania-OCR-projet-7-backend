const sequelize = require("sequelize");
const { Op, where } = require("sequelize");
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
      attributes: ["username"],
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

exports.getConversationByUserAndFriendId = (req, res, next) => {
  const authToken = req.headers.authorization;
  const userId = Helper.getUserIdWithToken(authToken);
  const friendId = req.query.friendId;
  User_Conversation.findOne({
    attributes: ["conversation_id", [sequelize.fn("count", sequelize.col("user_id")), "user_count"]],
    where: {
      conversation_id: {
        [Op.in]: sequelize.literal(
          // TODO check si risque d'injection
          `(SELECT conversation_id 
            FROM user_conversation 
            WHERE conversation_id IN (
              SELECT 
              conversation_id 
              FROM user_conversation 
              WHERE user_id=${userId}
            )
            AND user_id=${friendId})`
        ),
      },
    },
    group: ["conversation_id"],
    having: {
      user_count: {
        [Op.eq]: 2,
      },
    },
  })
    .then((singleUserConversation) => {
      const conversationId = singleUserConversation.getDataValue("conversation_id");
      Conversation.findOne({
        where: {
          id: conversationId,
        },
        include: {
          model: User,
          attributes: {
            exclude: ["password"],
          },
        },
      })
        .then((conversation) => {
          res.send(conversation);
        })
        .catch((error) => {
          console.log(error);
        });
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
        through: {
          model: User_Conversation,
          attributes: [],
          where: {
            as_leave_conversation: 0,
          },
        },
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
        attributes: ["id", "as_leave_conversation"],
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
  let existantConversation = null;
  const conversationsWithUserId = UserWithConversationsAndFriends.Conversations;
  if (!isConversationExist(conversationsWithUserId)) {
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
    if (existantConversation.getDataValue("User_Conversation").as_leave_conversation == 1) {
      User_Conversation.update(
        { as_leave_conversation: 0 },
        { where: { id: existantConversation.getDataValue("User_Conversation").id } }
      )
        .then(() => {
          res.send("Conversation réouverte");
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      res.send("c'est mort");
    }
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
        existantConversation = singleConversation;
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

exports.leaveConversation = (req, res, next) => {
  const conversationId = req.body.conversationId;
  const authToken = req.headers.authorization;
  const userId = Helper.getUserIdWithToken(authToken);
  User_Conversation.update(
    { as_leave_conversation: 1 },
    {
      where: {
        [Op.and]: {
          conversation_id: conversationId,
          user_id: userId,
        },
      },
    }
  )
    .then((response) => {
      res.send("Conversation quittée");
    })
    .catch((error) => {
      console.log(error);
    });
};

exports.addUserToConversation = (req, res, next) => {
  const convId = 109;
  const friendId = 3;
  User_Conversation.create({ user_id: 3, conversation_id: convId })
    .then(() => {
      res.send("cc");
    })
    .catch((error) => {
      console.log(error);
    });
};
