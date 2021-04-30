"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Conversation extends Model {
    static associate(models) {
      this.hasMany(models.Message, { foreignKey: "userId" });
      this.belongsToMany(models.User, {
        through: models.Users_Conversation,
        sourceKey: "id",
        foreignKey: "conversationId",
      });
      this.hasMany(models.Message, { foreignKey: "conversationId" });
    }

    static async getByIdWithUsers(conversationId) {
      try {
        const conversationWithUsers = await this.findOne({
          where: {
            id: conversationId,
          },
          include: {
            model: sequelize.models.User,
            attributes: ["username"],
            through: {
              attributes: [],
            },
          },
        });

        return conversationWithUsers;
      } catch (error) {
        logger.error(error);
        logger.error("error during fetching conversation by id");
      }
    }

    static async allByUser(userId) {
      try {
        const conversations = await this.findAll({
          include: {
            model: sequelize.models.User,
            attributes: ["username"],
            through: {
              attributes: [],
            },
            where: {
              id: userId,
            },
            required: true,
          },
        });

        return conversations;
      } catch (error) {
        logger.error(error);
        logger.error("error during fetching conversation by id");
      }
    }

    static async create() {
      try {
        const conversation = await Model.prototype.create();

        await sequelize.models.Users_Conversation.bulkCreate(
          {
            userId: userId,
            conversationId: conversation.getDataValue("id"),
          },
          {
            userId: friendId,
            conversationId: conversation.getDataValue("id"),
          }
        );
      } catch (error) {
        logger.error(error);
        logger.error("error during new conversation creation");
      }
    }

    static async changePicture(conversationId, imageUrl) {
      try {
        await this.update(
          {
            imageUrl: `${req.protocol}://${req.get("host")}/images/${req.file.filename}`,
          },
          {
            where: {
              id: conversationId,
            },
          }
        );
      } catch (error) {
        logger.error(error);
        logger.error("error during conversation leave");
      }
    }

    static async userLeave(userId, conversationId) {
      try {
        await sequelize.models.User_Conversation.update(
          { as_leave_conversation: 1 },
          {
            where: {
              [Op.and]: {
                conversation_id: conversationId,
                user_id: userId,
              },
            },
          }
        );
      } catch (error) {
        logger.error(error);
        logger.error("error during conversation leave");
      }
    }
  }

  Conversation.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      name: DataTypes.STRING,
      imageUrl: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Conversation",
    }
  );
  return Conversation;
};
