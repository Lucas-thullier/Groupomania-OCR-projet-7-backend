const { Model, DataTypes } = require("sequelize");
const sequelize = require("@lib/SequelizeConnexion");

class RedditComment extends Model {}

RedditComment.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    submission_id: {
      type: DataTypes.STRING,
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
  },
  { sequelize, modelName: "RedditComment", tableName: "reddit_comments" }
);

module.exports = RedditComment;
