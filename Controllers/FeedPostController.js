const Conversation = require("../Models/Conversation");
const User = require("../Models/User");
const Message = require("../Models/Message");

exports.allFeed = async (req, res, next) => {
  Message.findAll({
    where: {
      conversation_id: 1,
    },
    attributes: ["id", "text_content", "send_at"],
  }).then((messageData) => {
    // console.log(messageData);
    return res.send(messageData);
  });
  // console.log(All);
  // return res.send(AllConversationMessages);
  // AllConversationMessages.then((messages) => {
  //   messages.forEach((message) => {
  //     // console.log(message);
  //     console.log(message.getDataValue("id"));
  //   });
  //   // console.log(messages);
  // });
  // //   console.log(User);
  // const user = await User.findOne({
  //   where: {
  //     id: 1,
  //   },
  //   include: Message,
  // });
  // console.log(test);
};
