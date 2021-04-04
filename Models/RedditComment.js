const { Sequelize, Model, DataTypes } = require("sequelize");
const sequelize = new Sequelize(
  `mysql://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`
);

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
