const { Model, DataTypes } = require("sequelize");
const sequelize = require("@lib/SequelizeConnexion");

class FeedPostComments extends Model {
  static async getComments(postId) {
    const feedPostComments = await FeedPostComments.findAll({
      where: {
        feedpost_id: postId,
      },
      include: {
        model: User,
        attributes: ["username", "imageUrl", "id"],
      },
      order: [["createdAt", "ASC"]],
    });

    return feedPostComments;
  }

  static async newComment(postId, messageContent, userId) {
    await FeedPostComments.create({
      feedpost_id: postId,
      text_content: messageContent,
      user_id: userId,
    });
  }

  static async deleteComment(commentId, userId) {
    const commentOfUser = await FeedPostComments.findOne({
      attributes: ["id", "user_id"],
      where: {
        id: commentId,
        user_id: userId,
      },
    });
    //TODO a tester avec un autre compte voir si securite OK
    if (commentOfUser != null) {
      await FeedPostComments.destroy({
        where: {
          id: commentId,
        },
      });
    }
  }
}

FeedPostComments.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    feedpost_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
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
  { sequelize, modelName: "FeedPostComment", tableName: "feedposts_comments" }
);

module.exports = FeedPostComments;
