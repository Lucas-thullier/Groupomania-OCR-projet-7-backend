"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class RedditComment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  RedditComment.init(
    {
      id: DataTypes.INTEGER,
      submissionId: DataTypes.STRING,
      userId: DataTypes.INTEGER,
      textContent: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "RedditComment",
    }
  );
  return RedditComment;
};
