const Conversation = require("../Models/Conversation");
const Message = require("../Models/Message");
const User = require("../Models/User");
const Helper = require(`${process.cwd()}/libs/Helper`);

exports.postMessage = (req, res, next) => {
  const messageContent = req.body.messageContent;
  const convId = req.body.convId;
  const userId = req.body.userId;
  Message.create({
    text_content: messageContent,
    user_id: parseInt(userId),
    conversation_id: convId,
    send_at: Helper.getActualDate(),
  })
    .then((tets) => {
      console.log(tets);
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
