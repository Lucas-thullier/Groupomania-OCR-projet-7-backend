const { Model, DataTypes } = require("sequelize");
const sequelize = require("@lib/SequelizeConnexion");
const User = require("./User");

class Conversation extends Model {
  static getConvId(userId, friendId) {
    console.log(Conversation);
    User.findOne({
      where: {
        id: 1,
      },
    }).then((user) => {
      user.addConversation();
    });
  }
}

Conversation.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    imageUrl: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  { sequelize, modelName: "Conversation", tableName: "conversations" }
);

module.exports = Conversation;
