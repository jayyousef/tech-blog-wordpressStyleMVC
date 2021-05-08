const BlogPost = require('./blogPosts')
const User = require('./User');
const Comments = require('./Comments');


// BlogPost.hasOne(User, {
//   foreignKey: 'user_id',
//   onDelete: 'CASCADE'
// });

BlogPost.belongsTo(User, {
  foreignKey: 'user_id',
});

// Comments.belongsTo(User, {
//   foreignKey: 'user_id'
// })

// Comments.hasOne(User, {
//   foreignKey: 'user_id',
//   onDelete: 'CASCADE'
// });


Comments.belongsTo(BlogPost, {
  foreignKey: 'blog_post_id',
  onDelete: 'CASCADE'
});

BlogPost.hasMany(Comments,{
  foreignKey: 'blog_post_id',
  onDelete: 'CASCADE'
})

// User.hasMany(BlogPost,{
//   foreignKey: 'user_id'
// })

module.exports = {
  BlogPost,
  User,
  Comments
};