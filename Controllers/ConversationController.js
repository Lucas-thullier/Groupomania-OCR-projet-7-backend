const sequelize = require("sequelize");
const { Op } = require("sequelize");
const Conversation = require("@models/Conversation");
const User = require("@models/User");
const User_Conversation = require("@models/User_Conversation");
const { getUserIdWithToken } = require("@lib/Helper");

exports.getConversationById = (req, res, next) => {
  const conversationId = req.query.id;
  Conversation.getConversationById(conversationId)
    .then((conversation) => {
      res.send(conversation);
      logger.info("Get conversation by id OK");
    })
    .catch((error) => {
      logger.error("Get conversation by id failed");
      logger.error(error);
    });
};

exports.getConversationByUserAndFriendId = (req, res, next) => {
  const authToken = req.headers.authorization;
  const userId = getUserIdWithToken(authToken);
  const friendId = req.query.friendId;
  User_Conversation.getConversationByUserAndFriendId(userId, friendId)
    .then((conversation) => {
      res.send(conversation);
      logger.info("fetching conversation by user and friend id success");
    })
    .catch((error) => {
      logger.error("fetching conversation by user and friend id failed");
      logger.error(error);
    });
};

exports.getAllConvByUserId = (req, res, next) => {
  const authToken = req.headers.authorization;
  const userId = getUserIdWithToken(authToken);
  User.getAllConversationsByUserId(userId)
    .then((conversations) => {
      res.send(conversations);
      logger.info("fetching all conversations with userId OK");
    })
    .catch((error) => {
      logger.error("fetching all conversations with userId failed");
      logger.error(error);
    });
};

exports.createConversation = async (req, res, next) => {
  const authToken = req.headers.authorization;
  const userId = getUserIdWithToken(authToken);
  const friendId = req.body.friendId;

  Conversation.create(userId, friendId)
    .then(() => {
      res.send(true);
      logger.info("conversation creation OK");
    })
    .catch((error) => {
      logger.error("conversation creation failed");
      logger.error(error);
    });
};

exports.changeConversationPicture = (req, res, next) => {
  const conversationId = req.body.convId;
  Conversation.changeConversationPicture(conversationId)
    .then(() => {
      res.send(true);
      logger.info("changing conversation picture OK");
    })
    .catch((error) => {
      logger.error("changing conversation picture failed");
      logger.error(error);
    });
};

exports.leaveConversation = (req, res, next) => {
  const conversationId = req.body.conversationId;
  const authToken = req.headers.authorization;
  const userId = getUserIdWithToken(authToken);
  User_Conversation.leaveConversation(conversationId, userId)
    .then(() => {
      res.send(true);
      logger.info("leave conversation success");
    })
    .catch((error) => {
      console.log(error);
      logger.error("leave conversation failed");
      logger.error(error);
    });
};

exports.addUserToConversation = (req, res, next) => {
  const convId = 109;
  const userId = 3;
  User_Conversation.create({ user_id: userId, conversation_id: convId })
    .then(() => {
      res.send(true);
      logger.info("adding user to conversation OK");
    })
    .catch((error) => {
      logger.error("adding user to conversation failed");
      logger.error(error);
    });
};
