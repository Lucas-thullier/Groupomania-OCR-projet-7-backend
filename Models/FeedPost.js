const { Sequelize, Model, DataTypes } = require("sequelize");
const User = require("./User");
const sequelize = new Sequelize(`mysql://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`);

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
