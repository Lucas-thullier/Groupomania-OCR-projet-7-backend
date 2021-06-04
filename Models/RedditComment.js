'use strict'
const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class RedditComment extends Model {
    static associate(models) {
      // define association here
    }
  }
  RedditComment.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      submissionId: DataTypes.STRING,
      userId: DataTypes.INTEGER,
      textContent: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'RedditComment',
    }
  )
  return RedditComment
}
