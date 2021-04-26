"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class FeedPostComment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  FeedPostComment.init(
    {
      id: DataTypes.INTEGER,
      feedpostId: DataTypes.INTEGER,
      userId: DataTypes.INTEGER,
      textContent: DataTypes.STRING,
      imageUrl: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "FeedPostComment",
    }
  );
  return FeedPostComment;
};
