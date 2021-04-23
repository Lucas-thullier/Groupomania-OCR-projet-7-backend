const { Model, DataTypes, Op } = require("sequelize");
const sequelize = require("@lib/SequelizeConnexion");
const Conversation = require("@models/Conversation");
const Message = require("@models/Message");
const Friend = require("@models/Friend");
const User_Conversation = require("@models/User_Conversation");
const FeedPost = require("@models/FeedPost");
const FeedPostComments = require("@models/FeedPostComment");
const RedditComment = require("@models/RedditComment");

class User extends Model {
  static async getOne(id) {
    const singleUser = await this.findOne({
      where: {
        id: id,
      },
      exclude: ["password"],
    });
    return singleUser;
  }

  static async searchByName(searchContent, userId) {
    const searchedUsers = await User.findAll({
      where: {
        username: {
          [Op.like]: `%${searchContent}%`,
        },
        id: {
          [Op.ne]: userId,
        },
      },
      attributes: {
        exclude: ["password"],
      },
    });

    return searchedUsers;
  }

  static async changeProfilPicture(userId, imagePath) {
    await User.update(
      {
        imageUrl: imagePath,
      },
      {
        where: {
          id: userId,
        },
      }
    );
  }
}

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

User.hasMany(FeedPost, { foreignKey: "user_id" });
FeedPost.belongsTo(User, { foreignKey: "user_id" });

User.hasMany(FeedPostComments, { foreignKey: "user_id" });
FeedPostComments.belongsTo(User, { foreignKey: "user_id" });

User.hasMany(RedditComment, { foreignKey: "user_id" });
RedditComment.belongsTo(User, { foreignKey: "user_id" });

module.exports = User;
