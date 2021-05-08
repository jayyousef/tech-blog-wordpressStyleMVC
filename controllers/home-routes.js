const router = require('express').Router();
const { template } = require('handlebars');
//const { regexp } = require('sequelize/types/lib/operators');
const {BlogPost, User, Comments} = require("../models/");


// route to get all dishes
router.get('/', async (req, res) => {
  const blogPosts = await BlogPost.findAll({
    include:[User]
  })
console.log(blogPosts)
  const blogs = blogPosts.map((BlogPost) => BlogPost.get({
    plain: true
  }));
  console.log('this is blogs >>>>>>>>>>',blogs)
  console.log('this is blogPosts >>>>>>>>>>',blogPosts)

  req.session.save(() => {
    if (req.session.countVisits) {
      req.session.countVisit++;
    }
    // else {
    //  req.sessions.countVisit = 1;
    //}
  })
  res.render('home', {
    title: 'TechBlog',
    blogs, 
    loggedIn: req.session.loggedIn
  });

});

// userPosts shown based on user id
router.get('/login', async (req, res) => {
  
  res.render('login', {
    title: "Login Page",
    loggedIn: req.session.loggedIn
  });

});

// route to get one post
router.get('/posts/:id', async (req, res) => {
  try {
    const blogPostData = await BlogPost.findByPk(req.params.id);
    if (!blogPostData) {
      res.status(404).json({
        message: 'No dish with this id!'
      });
      return;
    }
    const post = blogPostData.get({
      plain: true
    });
    res.render('post', posts);
  } catch (err) {
    res.status(500).json(err);
  };
});

//route to get all those users blogs
router.get('/users/:user_name', async (req, res) => {
  try {
    const userName = await User.findAll({
      where: {
        user_name: req.params.user_name
      }
    })
    if (!userName) {
      res.status(404).json({
        message: 'No dish with this id!'
      });
      return;
    }
    const userPosts = userName.get({
      plain: true
    });
    res.render('userPosts', userPosts);
  } catch (err) {
    res.status(500).json(err);
  };
});


module.exports = router;