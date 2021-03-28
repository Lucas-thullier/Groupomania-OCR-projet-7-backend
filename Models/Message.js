const { Sequelize, Model, DataTypes } = require("sequelize");
const User = require("./User");
const Conversation = require("./Conversation");

const sequelize = new Sequelize(
  `mysql://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`
);

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

  static createNewMessage() {}
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
