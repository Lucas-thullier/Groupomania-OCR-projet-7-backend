const { Sequelize, Model, DataTypes } = require("sequelize");
const Conversation = require("./Conversation");
const Message = require("./Message");
const Friend = require("./Friend");

const sequelize = new Sequelize(
  `mysql://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`
);

class User extends Model {}

User.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    last_connexion: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  { sequelize, modelName: "User", tableName: "users" }
);

User.hasMany(Message, { foreignKey: "user_id" });
Message.belongsTo(User, { foreignKey: "id" });

User.hasMany(Friend, { foreignKey: "user_a" });
Friend.belongsTo(User, { foreignKey: "user_b", targetKey: "id" });

module.exports = User;
