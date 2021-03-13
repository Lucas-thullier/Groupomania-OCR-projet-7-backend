const { Sequelize, Model, DataTypes } = require("sequelize");
const User = require("./User");

const sequelize = new Sequelize(
  `mysql://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`
);

class Friend extends Model {
  static getFriendsOf(id) {
    return this.findAll({
      where: {
        user_a: id,
      },
      // attributes: ["id", "text_content", "send_at"],
      include: "User",
    });
  }
}

Friend.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
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
  },
  { sequelize, modelName: "Friend", tableName: "friends" }
);

module.exports = Friend;
