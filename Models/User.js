"use strict";
const { Model, Op } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      this.hasMany(models.Message, { foreignKey: "userId" });
      this.hasMany(models.FeedPost, { foreignKey: "user_id" });
      this.hasMany(models.FeedPostComment, { foreignKey: "userId" });
      this.belongsToMany(this, {
        through: sequelize.models.Friend,
        as: "friend",
        sourceKey: "id",
        foreignKey: "userA",
        otherKey: "userB",
      });
      this.belongsToMany(models.Conversation, {
        through: models.Users_Conversation,
        sourceKey: "id",
        foreignKey: "userId",
      });
    }

    static async new(username, email, hash) {
      try {
        await this.create({
          username: username,
          email: email,
          password: hash,
        });
      } catch (error) {
        logger.error(error);
      }
    }

    static async findByMail(email) {
      try {
        const user = await this.findOne({
          where: {
            email: email,
          },
        });

        return user;
      } catch (error) {
        logger.error(error);
      }
    }

    static async searchByUsername(searchContent) {
      try {
        const user = await this.findAll({
          where: {
            username: {
              [Op.like]: `%${searchContent}%`,
            },
          },
          attributes: {
            exclude: ["password"],
          },
        });

        return user;
      } catch (error) {
        logger.error("searching user by name failed");
      }
    }

    static async getById(userId) {
      try {
        const user = await this.findOne({
          where: {
            id: userId,
          },
          exclude: ["password"],
        });

        return user;
      } catch (error) {
        logger.error("Error during fetch by id");
      }
    }

    static async getFriends(userId) {
      try {
        const userWithFriends = await this.findOne({
          where: {
            id: userId,
          },
          attributes: {
            exclude: ["password"],
          },
          include: {
            model: this,
            as: "friend",
            attributes: {
              exclude: ["password", "friend"],
            },
            through: {
              attributes: [],
            },
          },
        });

        return userWithFriends.getDataValue("friend");
      } catch (error) {
        logger.error(error);
        logger.error("Error during fetching friends");
      }
    }

    static async updateProfilPicture(userId, imageUrl) {
      try {
        // await this.update(
        //   {
        //     imageUrl: imageUrl,
        //   },
        //   {
        //     where: {
        //       id: userId,
        //     },
        //   }
        // );
        const user = await this.findOne({
          attributes: ["imageUrl", "id"],
          where: {
            id: userId,
          },
        });

        const oldImage = user.getDataValue("imageUrl");

        await user.update({ imageUrl: imageUrl });

        return oldImage;
      } catch (error) {
        logger.error(error);
        logger.error("error during profilPicture update");
      }
    }

    static async updateUsername(userId, newUsername) {
      try {
        await this.update(
          {
            username: newUsername,
          },
          {
            where: {
              id: userId,
            },
          }
        );

        return newUsername;
      } catch (error) {
        logger.error(error);
        logger.error("error during profilPicture update");
      }
    }
  }

  User.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      username: DataTypes.STRING,
      password: DataTypes.STRING,
      email: DataTypes.STRING,
      lastConnexion: DataTypes.DATE,
      imageUrl: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
