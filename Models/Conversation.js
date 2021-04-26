"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Conversation extends Model {
    static associate(models) {
      User.hasMany(models.Message, { foreignKey: "userId" });
    }
  }
  Conversation.init(
    {
      id: DataTypes.INTEGER,
      name: DataTypes.STRING,
      imageUrl: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Conversation",
    }
  );
  return Conversation;
};
