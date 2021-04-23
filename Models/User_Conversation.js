const { Model, DataTypes } = require("sequelize");
const sequelize = require("@lib/SequelizeConnexion");
const User = require("@models/User");
const Conversation = require("@models/Conversation");

class User_Conversation extends Model {}

User_Conversation.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
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
    as_leave_conversation: {
      type: DataTypes.TINYINT.UNSIGNED,
      allowNull: false,
      defaultValue: 0,
    },
  },
  { sequelize, modelName: "User_Conversation", tableName: "user_conversation" }
);

module.exports = User_Conversation;
