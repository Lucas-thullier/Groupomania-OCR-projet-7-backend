const { Model, DataTypes } = require("sequelize");
const sequelize = require("@lib/SequelizeConnexion");
const User = require("@models/User");
const FeedPostComment = require("@models/FeedPostComment");

class FeedPost extends Model {
  static async getFeedPost(userId) {
    const feedPost = await FeedPost.findAll({
      where: {
        user_id: {
          [Op.or]: [
            userId,
            {
              [Op.in]: sequelize.literal(
                // TODO check si risque d'injection
                `(SELECT friend.id 
                  FROM users AS User 
                  LEFT OUTER JOIN (
                    friends AS friendFriend 
                      INNER JOIN users AS friend 
                      ON friend.id = friendFriend.user_b) 
                  ON User.id = friendFriend.user_a 
                  WHERE User.id = '${userId}')`
              ),
            },
          ],
        },
      },
      include: {
        model: User,
        attributes: {
          exclude: ["password"],
        },
      },
      order: [["createdAt", "DESC"]],
    });

    return feedPost;
  }

  static async createFeedPost(userId, textContent, imageUrl) {
    FeedPost.create({
      user_id: userId,
      text_content: textContent,
      image_url: imageUrl ? imageUrl : null,
    });
  }

  static async delete(feedPostId) {
    await FeedPost.destroy({
      where: {
        id: feedPostId,
      },
    });
  }
}

FeedPost.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    text_content: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    image_url: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  { sequelize, modelName: "FeedPost", tableName: "feedposts" }
);

FeedPost.hasMany(FeedPostComment, { foreignKey: "feedpost_id" });
FeedPostComment.belongsTo(FeedPost, { foreignKey: "feedpost_id" });

module.exports = FeedPost;
