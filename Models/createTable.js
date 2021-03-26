const { Sequelize, Model, DataTypes } = require("sequelize");
const Conversation = require("./Conversation");
const User = require("./User");
const Message = require("./Message");
const Friend = require("./Conversation");

async function createAllTables() {
  const sequelize = new Sequelize(
    `mysql://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`
  );
  await User.sync({ force: true });
  await Conversation.sync({ force: true });
  await Message.sync({ force: true });
  await Friend.sync({ force: true });
  User.belongsToMany(Conversation, { through: "user_conversation" });
  Conversation.belongsToMany(User, { through: "user_conversation" });

  User.hasMany(Message, { foreignKey: "user_id" });
  Message.belongsTo(User, { foreignKey: "id" });

  User.hasMany(Friend, { foreignKey: "user_a" });
  Friend.belongsTo(User, { foreignKey: "user_b", targetKey: "id" });
}

createAllTables();
