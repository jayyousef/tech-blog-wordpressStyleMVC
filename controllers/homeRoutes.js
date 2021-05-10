const router = require('express').Router();
const {
  template
} = require('handlebars');
const {
  BlogPost,
  User,
  Comments
} = require("../models/");
const withAuth = require('../utils/auth');

// homepage route to get all posts
router.get('/', async (req, res) => {
  try {
    const blogPosts = await BlogPost.findAll({
      include: [{
        model: User,
        attributes: ['user_name'],
      }, ],
    })

    const blogs = blogPosts.map((BlogPost) => BlogPost.get({
      plain: true
    }));


    res.render('homepage', {
      // title: "home",
      blogs,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }

});

// route to get single post when you click on one 
router.get('/posts/:id', async (req, res) => {
  try {
    const blogPostData = await BlogPost.findByPk(req.params.id, {
      include: [{
          model: User,
          attributes: ['user_name'],

        },
        {
          model: Comments,
          include: [{
            model: User
          }]
        }
      ],
    });

    if (!blogPostData) {
      res.status(404).json({
        message: 'No Post Found!'
      });
      return;
    }
    const post = blogPostData.get({
      plain: true
    });
    res.render('post', {
      // title: post.title,
      ...post,
      logged_in: req.session.logged_in
    });

  } catch (err) {
    res.status(500).json(err);
  };
});


//when you click on a user you see all their posts
router.get('/users/:user_name', async (req, res) => {
  try {
    const userName = await User.findAll({
      where: {
        user_name: req.params.user_name
      }
    })
    if (!userName) {
      res.status(404).json({
        message: 'No user with this id!'
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

// get posts associated with the logged in user and display on the dashboard
router.get('/dashboard', withAuth, async (req, res) => {
  try {
    const userData = await User.findByPk(req.session.user_id, {
      attributes: {
        exclude: ['password']
      },
      include: [{
        model: BlogPost,
        attributes: ['id', 'title', 'body', 'createdAt'],
      }],
    });
    const user = userData.get({
      plain: true
    });

    res.render('dashboard', {
      ...user,
      logged_in: true
    });

  } catch (err) {
    res.status(500).json(err);
  }
});

// edit page from dashboard upon click edit button
router.get('/edit-post/:id', withAuth, async (req, res) => {
  try {
    const postData = await BlogPost.findByPk(req.params.id)
    if (!postData) {
      res.render('404', {layout: 'other'})
      // .json({
        // message: "No post found! Try again"
      // })
      return;
    }

    const post = postData.get({
      plain: true
    });
    res.render('edit-post', {
      ...post,
      logged_in: req.session.logged_in
    })
  } catch (err) {
    res.status(500).json(err)
  }
});

// render logout page
router.get('/logout', (req, res) => res.render('logout', {
  logged_in: req.session.logged_in
}));

router.get('/login', async (req, res) => {
  res.render('login', {
    title: "Login Page",
    loggedIn: req.session.loggedIn
  });

});

module.exports = router;