const Conversation = require("../models/Conversation");
const Message = require("../models/Message");
const User = require("../models/User");
const Helper = require(`${process.cwd()}/libs/Helper`);

exports.postMessage = (req, res, next) => {
  const messageContent = req.body.messageContent;
  const convId = req.body.convId;
  const authToken = req.headers.authorization;
  const userId = Helper.getUserIdWithToken(authToken);
  Message.create({
    text_content: messageContent,
    user_id: userId,
    conversation_id: convId,
  })
    .then((test) => {
      console.log(test);
      res.status(201).json({ message: "true" });
    })
    .catch((error) => res.status(400).json({ error }));
};

exports.getMessagesByConvId = (req, res, next) => {
  const convId = req.query.convId;
  Conversation.findOne({
    where: {
      id: convId,
    },
    include: {
      model: Message,
      include: {
        model: User,
        attributes: {
          exclude: ["password"],
        },
      },
    },
  }).then((conversation) => {
    const allMessages = conversation.getDataValue("Messages");
    res.send(allMessages);
  });
};
