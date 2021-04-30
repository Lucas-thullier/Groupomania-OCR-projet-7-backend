const { Conversation, User_Conversation } = require("@models/index");
const { getUserIdWithToken } = require("@libs/Helper");

exports.getByIdWithUsers = (req, res, next) => {
  const conversationId = req.query.id;

  Conversation.getByIdWithUsers(conversationId)
    .then((conversation) => {
      res.send(conversation);
      logger.info("fetching conversation by id with users success");
    })
    .catch((error) => {
      logger.error(error);
      logger.error("error during fetching conversation by id with users");
    });
};

exports.getAllByUserId = (req, res, next) => {
  const authToken = req.headers.authorization;
  const userId = getUserIdWithToken(authToken);

  Conversation.allByUser(userId)
    .then((conversations) => {
      res.send(conversations);
      logger.info("fetching conversation by id with users success");
    })
    .catch((error) => {
      logger.error(error);
      logger.error("error during fetching conversation by id with users");
    });
};

exports.createConversation = async (req, res, next) => {
  const authToken = req.headers.authorization;
  const userId = getUserIdWithToken(authToken);
  const friendId = req.body.friendId;

  Conversation.create(userId, friendId)
    .then(() => {
      res.send(true);
      logger.info("new conversation creation success");
    })
    .catch((error) => {
      logger.error(error);
      logger.error("error during new conversation creation");
    });
};

exports.changeConversationPicture = (req, res, next) => {
  const conversationId = req.body.convId;
  const imageUrl = `${req.protocol}://${req.get("host")}/images/${req.file.filename}`;

  Conversation.changePicture(conversationId, imageUrl)
    .then(() => {
      res.send("update effectue");
      logger.info("picture update done");
    })
    .catch((error) => {
      logger.error(error);
      logger.error("error during picture update");
    });
};

exports.leaveConversation = (req, res, next) => {
  const conversationId = req.body.conversationId;
  const authToken = req.headers.authorization;
  const userId = getUserIdWithToken(authToken);

  User_Conversation.userLeave(userId, conversationId)
    .then(() => {
      res.send("Conversation quittée");
      logger.info("leaving conversation success");
    })
    .catch((error) => {
      logger.info(error);
      logger.info("error during conversation leave");
    });
};
