const { Model, DataTypes } = require("sequelize");
const sequelize = require("@lib/SequelizeConnexion");

class FeedPostComments extends Model {}

FeedPostComments.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    feedpost_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
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
  { sequelize, modelName: "FeedPostComment", tableName: "feedposts_comments" }
);

module.exports = FeedPostComments;
