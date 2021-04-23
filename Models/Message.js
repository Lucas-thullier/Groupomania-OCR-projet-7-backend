const { Model, DataTypes } = require("sequelize");
const sequelize = require("@lib/SequelizeConnexion");
const User = require("@models/User");
const Conversation = require("@models/Conversation");

class Message extends Model {
  static getConversationFor(id) {
    return this.findAll({
      where: {
        conversation_id: id,
      },
      attributes: ["id", "text_content", "send_at"],
      include: "User",
    });
  }

  static async postMessage(messageContent, userId, conversationId) {
    await Message.create({
      text_content: messageContent,
      user_id: userId,
      conversation_id: conversationId,
    });
  }
}

Message.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    text_content: {
      type: DataTypes.STRING(2000),
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: {
        model: User,
        key: "id",
      },
    },

    conversation_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: {
        model: Conversation,
        key: "id",
      },
    },
  },
  { sequelize, modelName: "Message", tableName: "messages" }
);

module.exports = Message;
