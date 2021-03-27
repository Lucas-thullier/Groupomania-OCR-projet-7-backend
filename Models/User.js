const { Sequelize, Model, DataTypes } = require("sequelize");
const Conversation = require("./Conversation");
const Message = require("./Message");
const Friend = require("./Friend");
const User_Conversation = require("./User_Conversation");

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

User.belongsToMany(Conversation, {
  through: User_Conversation,
  sourceKey: "id",
  foreignKey: "user_id",
  // otherKey: "id",
});
Conversation.belongsToMany(User, {
  through: User_Conversation,
  sourceKey: "id",
  foreignKey: "conversation_id",
  // otherKey: "id",
});

User.belongsToMany(User, {
  through: Friend,
  as: "friend",
  sourceKey: "id",
  foreignKey: "user_a",
  otherKey: "user_b",
});

// User.hasMany(User, { foreignKey: "user_a" });
// Friend.belongsTo(User, { foreignKey: "user_a", targetKey: "id" });

User.hasMany(Message, { foreignKey: "user_id" });
Message.belongsTo(User, { foreignKey: "user_id" });

Conversation.hasMany(Message, { foreignKey: "conversation_id" });
Message.belongsTo(Conversation, { foreignKey: "conversation_id" });

module.exports = User;
