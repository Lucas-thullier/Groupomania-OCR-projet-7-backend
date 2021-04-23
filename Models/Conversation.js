const { Model, DataTypes } = require("sequelize");
const sequelize = require("@lib/SequelizeConnexion");
const User = require("@models/User");
const Message = require("@models/Message");

class Conversation extends Model {
  static async getConversationById(conversationId) {
    const conversation = await Conversation.findOne({
      where: {
        id: conversationId,
      },
      include: {
        model: User,
        attributes: ["username"],
        through: {
          attributes: [],
        },
      },
    });

    return conversation;
  }

  static async getConversationByUserAndFriendId() {
    const singleUserConversation = await User_Conversation.findOne({
      attributes: ["conversation_id", [sequelize.fn("count", sequelize.col("user_id")), "user_count"]],
      where: {
        conversation_id: {
          [Op.in]: sequelize.literal(
            // TODO check si risque d'injection
            `(SELECT conversation_id 
              FROM user_conversation 
              WHERE conversation_id IN (
                SELECT 
                conversation_id 
                FROM user_conversation 
                WHERE user_id=${userId}
              )
              AND user_id=${friendId})`
          ),
        },
      },
      group: ["conversation_id"],
      having: {
        user_count: {
          [Op.eq]: 2,
        },
      },
    });

    const conversationId = singleUserConversation.getDataValue("conversation_id");
    const conversation = await Conversation.findOne({
      where: {
        id: conversationId,
      },
      include: {
        model: User,
        attributes: {
          exclude: ["password"],
        },
      },
    });

    return conversation;
  }

  static async getAllConversationsByUserId(userId) {
    const userWithConversations = await User.findOne({
      where: {
        id: userId,
      },
      include: [
        {
          model: Conversation,
          include: [
            {
              model: User,
              attributes: {
                exclude: ["password"],
              },
              where: {
                id: {
                  [Op.not]: userId,
                },
              },
            },
          ],
          through: {
            model: User_Conversation,
            attributes: [],
            where: {
              as_leave_conversation: 0,
            },
          },
        },
      ],
    });
    const conversations = userWithConversations.getDataValue("Conversations");

    return conversations;
  }

  static async create(userId, friendId) {
    await User_Conversation.create({
      user_id: userId,
      conversation_id: conversation.getDataValue("id"),
    });
    await User_Conversation.create({
      user_id: friendId,
      conversation_id: conversation.getDataValue("id"),
    });
  }

  static async changeConversationPicture(convId) {
    await Conversation.update(
      {
        imageUrl: `${req.protocol}://${req.get("host")}/images/${req.file.filename}`,
      },
      {
        where: {
          id: convId,
        },
      }
    );
  }

  static async leaveConversation(conversationId, userId) {
    await User_Conversation.update(
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
  }

  static async addUserToConversation(conversationId, userId) {
    await User_Conversation.create({ user_id: userId, conversation_id: conversationId });
  }
}

Conversation.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    imageUrl: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  { sequelize, modelName: "Conversation", tableName: "conversations" }
);
Conversation.hasMany(Message, { foreignKey: "conversation_id" });
Message.belongsTo(Conversation, { foreignKey: "conversation_id" });
module.exports = Conversation;
