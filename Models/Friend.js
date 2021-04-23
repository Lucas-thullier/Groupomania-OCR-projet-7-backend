const { Model, DataTypes } = require("sequelize");
const sequelize = require("@lib/SequelizeConnexion");
const User = require("./User");

class Friend extends Model {
  static getFriendsOf(id) {
    return this.findAll({
      where: {
        user_a: id,
      },
      include: "User",
    });
  }
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
