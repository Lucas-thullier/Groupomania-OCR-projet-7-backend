const { Sequelize, Model, DataTypes } = require("sequelize");
const User = require("./User");
const Conversation = require("./Conversation");

const sequelize = new Sequelize(
  `mysql://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`
);

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
  },
  { sequelize, modelName: "User_Conversation", tableName: "user_conversation" }
);

module.exports = User_Conversation;
