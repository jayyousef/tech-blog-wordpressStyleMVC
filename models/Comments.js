const {
  Model,
  DataTypes
} = require('sequelize');
const sequelize = require('../config/connection');

class Comments extends Model {}

Comments.init({
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  body: {
    type: DataTypes.STRING(250),
    allowNull: true,
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'User',
      key: 'id'
    }
  },
  post_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  }
}, {
  sequelize,
  freezeTableName: true,
  underscored: true,
  modelName: 'Comments',
});

module.exports = Comments;