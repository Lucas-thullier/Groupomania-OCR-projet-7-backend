"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class FeedPost extends Model {
    static associate(models) {
      this.belongsTo(models.User, { foreignKey: "user_id" });
      this.hasMany(models.FeedPostComment, { foreignKey: "feedpostId" });
    }

    static async getByUserId(userId) {
      try {
        const feedpost = await this.findAll({
          where: {
            user_id: userId,
          },
          include: {
            model: sequelize.models.User,
            attributes: {
              exclude: ["password"],
            },
          },
          order: [["createdAt", "DESC"]],
        });

        return feedpost;
      } catch (error) {
        logger.error(error);
        logger.error("error during fetching feedpost by userId");
      }
    }

    static async new(userId, textContent, imageUrl = null) {
      try {
        await this.create({
          user_id: userId,
          text_content: textContent,
          image_url: imageUrl,
        });

        return true;
      } catch (error) {
        logger.error(error);
        logger.error("error during feedpost creation");
      }
    }

    static async delete(feedPostId) {
      try {
        await this.destroy({
          where: {
            id: feedPostId,
          },
        });
      } catch (error) {
        logger.error(error);
        logger.error("error during feedpost deletion");
      }
    }
  }
  FeedPost.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      user_id: DataTypes.INTEGER,
      textContent: DataTypes.STRING,
      imageUrl: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "FeedPost",
    }
  );
  return FeedPost;
};
