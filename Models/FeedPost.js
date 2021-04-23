const { Model, DataTypes } = require("sequelize");
const sequelize = require("@lib/SequelizeConnexion");
const User = require("@models/User");

class FeedPost extends Model {
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

FeedPost.init(
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
    },
    text_content: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    image_url: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  { sequelize, modelName: "FeedPost", tableName: "feedposts" }
);

module.exports = FeedPost;
