const router = require('express').Router();
const {BlogPost} = require('../../models');
const withAuth = require('../../utils/auth');


// create a new post
router.post('/', withAuth, async (req, res) => {
  try {
     const postData = await BlogPost.create({
      title: req.body.title,
      body: req.body.body,
      user_id: req.session.user_id, 
    })
    res.status(200).json(postData)
  } catch (err) {
    res.status(400).json(err);
  }
})

router.put('/:id', withAuth, async (req, res) => {
  const id = req.params.id;
  try {
    const postData = await BlogPost.update({
      title: req.body.title,
      body: req.body.body,
      edited: true,
    }, {
      where: {
        id: id
      }
    });
    if (!postData) {
      res.status(404).json({
        message: 'No posts with this ID. Try again.'
      });
      return;
    }
    res.status(200).json(postData)
  } catch (err) {
    res.status(500).json(err);
  }
})

router.delete('/:id', withAuth, async (req, res) => {
  try {
    const postData = await blogPosts.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!postData) {
      res.status(404).json({
        message: 'No project found with this id!'
      });
      return;
    }

    res.status(200).json(postData);
  } catch (err) {
    res.status(500).json(err);
  }
});


router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;