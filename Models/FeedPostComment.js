"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class FeedPostComment extends Model {
    static associate(models) {
      this.belongsTo(models.FeedPost, { foreignKey: "feedpostId" });
      this.belongsTo(models.User, { foreignKey: "userId" });
    }

    static async getByPostId(postId) {
      try {
        const comments = await this.findAll({
          where: {
            feedpostId: postId,
          },
          include: {
            model: sequelize.models.User,
            attributes: ["username", "imageUrl", "id"],
          },
          order: [["createdAt", "ASC"]],
        });

        return comments;
      } catch (error) {
        logger.error(error);
        logger.error("error during fetching post comments");
      }
    }

    static async new(userId, postId, messageContent) {
      try {
        await this.create({
          feedpostId: postId,
          textContent: messageContent,
          userId: userId,
        });

        return true;
      } catch (error) {
        logger.error(error);
        logger.error("error during new comment creation");
      }
    }

    static async deleteOne(commentId) {
      try {
        await this.destroy({
          where: {
            id: commentId,
          },
        });

        return true;
      } catch (error) {
        logger.error(error);
        logger.error("error during comment deletion");
      }
    }
  }

  FeedPostComment.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      feedpostId: DataTypes.INTEGER,
      userId: DataTypes.INTEGER,
      textContent: DataTypes.STRING,
      imageUrl: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "FeedPostComment",
    }
  );

  return FeedPostComment;
};
