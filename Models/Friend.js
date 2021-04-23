const { Model, DataTypes, Op } = require("sequelize");
const sequelize = require("@lib/SequelizeConnexion");
const User = require("@models/User");

class Friend extends Model {
  static async addFriend(userId, newFriendId) {
    await this.create({
      user_a: userId,
      user_b: newFriendId,
      is_pending: 0,
    });

    await this.create({
      user_a: newFriendId,
      user_b: userId,
      is_pending: 1,
    });
  }

  static async getRelation(userId, potentialFriendId) {
    const relation = await this.findAll({
      where: {
        [Op.or]: [
          {
            user_a: userId,
            user_b: potentialFriendId,
          },
          {
            user_b: userId,
            user_a: potentialFriendId,
          },
        ],
      },
    });

    return relation;
  }

  static async getAllByUserId(userId) {
    const allFriends = await User.findAll({
      attributes: {
        exclude: ["password"],
      },
      where: {
        user_a: userId,
      },
    });

    return allFriends;
  }

  // static async isFriendshipPending(userId, potentialFriendId) {
  //   Friend.findAll({
  //     where: {
  //       [Op.or]: {
  //         id: [userId, potentialFriendId]
  //       }
  //     }
  //   })
  // }
}

Friend.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    user_a: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: {
        model: User,
        key: "id",
      },
    },
    user_b: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: {
        model: User,
        key: "id",
      },
    },
    is_pending: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
  },
  { sequelize, modelName: "Friend", tableName: "friends" }
);

module.exports = Friend;
