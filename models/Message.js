'use strict'
const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class Message extends Model {
    static associate(models) {
      this.belongsTo(models.User, { foreignKey: 'userId' })
      this.belongsTo(models.Conversation, { foreignKey: 'conversationId' })
    }

    static async getAllFor(conversationId) {
      try {
        const messages = await this.findAll({
          where: {
            conversationId: conversationId,
          },
          include: {
            model: sequelize.models.User,
            attributes: {
              exclude: ['password'],
            },
          },
        })
        return messages
      } catch (error) {
        logger.error(error)
        logger.error('error during fetching messages by conversation id')
      }
    }

    static async new(userId, conversationId, messageContent) {
      try {
        await this.create({
          textContent: messageContent,
          userId: userId,
          conversationId: conversationId,
        })

        return true
      } catch (error) {
        logger.error(error)
        logger.error('error during new message creation')
      }
    }
  }

  Message.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      textContent: DataTypes.STRING,
      userId: DataTypes.INTEGER,
      conversationId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'Message',
    }
  )
  return Message
}
