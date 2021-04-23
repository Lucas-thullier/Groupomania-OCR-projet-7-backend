const { Model, DataTypes } = require("sequelize");
const sequelize = require("@lib/SequelizeConnexion");
const Conversation = require("./Conversation");
const Message = require("./Message");
const Friend = require("./Friend");
const User_Conversation = require("./User_Conversation");
const FeedPost = require("./FeedPost");
const FeedPostComments = require("./FeedPostComment");
const RedditComment = require("./RedditComment");

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
    imageUrl: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  { sequelize, modelName: "User", tableName: "users" }
);

User.belongsToMany(Conversation, {
  through: User_Conversation,
  sourceKey: "id",
  foreignKey: "user_id",
});
Conversation.belongsToMany(User, {
  through: User_Conversation,
  sourceKey: "id",
  foreignKey: "conversation_id",
});

User.belongsToMany(User, {
  through: Friend,
  as: "friend",
  sourceKey: "id",
  foreignKey: "user_a",
  otherKey: "user_b",
});

User.hasMany(Message, { foreignKey: "user_id" });
Message.belongsTo(User, { foreignKey: "user_id" });

Conversation.hasMany(Message, { foreignKey: "conversation_id" });
Message.belongsTo(Conversation, { foreignKey: "conversation_id" });

User.hasMany(FeedPost, { foreignKey: "user_id" });
FeedPost.belongsTo(User, { foreignKey: "user_id" });

FeedPost.hasMany(FeedPostComments, { foreignKey: "feedpost_id" });
FeedPostComments.belongsTo(FeedPost, { foreignKey: "feedpost_id" });

User.hasMany(FeedPostComments, { foreignKey: "user_id" });
FeedPostComments.belongsTo(User, { foreignKey: "user_id" });

User.hasMany(RedditComment, { foreignKey: "user_id" });
RedditComment.belongsTo(User, { foreignKey: "user_id" });

module.exports = User;
