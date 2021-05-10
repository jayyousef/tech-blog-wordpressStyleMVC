const {
    Model,
    DataTypes
} = require('sequelize');
const sequelize = require('../config/connection');

class BlogPost extends Model {}

BlogPost.init({
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    title: {
        type: DataTypes.STRING(50),
        allowNull: false,
    },
    body: {
        type: DataTypes.STRING(3000),
        allowNull: false,
    },
    edited: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: "user",
            key: "id"
        }
    }
}, {
    sequelize,
    timestamps: true,
    freezeTableName: true,
    underscored: true,
    modelName: 'blog_post',
})

module.exports = BlogPost;