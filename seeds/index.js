const sequelize = require('../config/connection');
const {BlogPost, User, Comments} = require('../models/');
const userData = require('./user-seeds.json');
const blogPostData = require('./blog_post-seeds.json');

const seedDatabase = async () => {
  await sequelize.sync({
    force: true
  });

  await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,


  })
  await BlogPost.bulkCreate(blogPostData, {
    individualHooks: true,
    returning: true,
  });

  process.exit(0);
};

seedDatabase();