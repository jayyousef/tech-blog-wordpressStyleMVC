const {
  BlogPost,
  User,
  Comments
} = require('../models/');

User.hasMany(BlogPost,{
  foreignKey: 'user_id'
})

User.hasMany(Comments,{
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
})

BlogPost.hasMany(Comments,{
  foreignKey: 'post_id',
  onDelete: 'CASCADE'
})


BlogPost.belongsTo(User, {
  foreignKey: 'user_id',
});

Comments.belongsTo(User, {
  foreignKey: 'user_id'
})


Comments.belongsTo(BlogPost, {
  foreignKey: 'blog_post_id',
  onDelete: 'CASCADE'
});



module.exports = {
  BlogPost,
  User,
  Comments
};