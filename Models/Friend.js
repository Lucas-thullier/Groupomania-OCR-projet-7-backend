"use strict";
const { Model, Op } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Friend extends Model {
    static associate(models) {}

    static async add(userId, friendId) {
      try {
        await this.create({
          userA: userId,
          userB: friendId,
          isPending: 0,
        });

        await this.create({
          userA: friendId,
          userB: userId,
          isPending: 1,
        });

        return true;
      } catch (error) {}
      logger.error(error);
      logger.error("Friendship creation failed");
    }

    static async delete(userId, friendId) {
      try {
        await this.destroy({
          where: {
            [Op.and]: {
              userA: userId,
              userB: friendId,
            },
          },
        });

        await this.destroy({
          where: {
            [Op.and]: {
              userA: friendId,
              userB: userId,
            },
          },
        });

        return true;
      } catch (error) {
        logger.error(error);
        logger.error("error during friendship deletion");
      }
    }
  }

  Friend.init(
    {
      userA: DataTypes.INTEGER,
      userB: DataTypes.INTEGER,
      isPending: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Friend",
    }
  );
  return Friend;
};
