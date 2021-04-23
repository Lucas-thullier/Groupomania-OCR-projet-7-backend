const Conversation = require("@models/Conversation");
const Message = require("@models/Message");
const User = require("@models/User");
const { getUserIdWithToken } = require(`@lib/Helper`);

exports.postMessage = (req, res, next) => {
  const messageContent = req.body.messageContent;
  const authToken = req.headers.authorization;
  const userId = getUserIdWithToken(authToken);
  const conversationId = req.body.convId;

  Message.postMessage(messageContent, userId, conversationId)
    .then(() => {
      res.status(201).json({ message: "true" });
    })
    .catch((error) => {
      res.status(400).json({ error });
      logger.error("error during posting message");
      logger.error(error);
    });
};
