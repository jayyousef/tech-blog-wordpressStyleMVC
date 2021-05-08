const router = require('express').Router();
const BlogPost = require('../../models/blogPosts');

// route to create/add a dish using async/await
router.post('/', async (req, res) => {
  try { 
    const dishData = await BlogPost.create({
    title: req.body.title,
    body: req.body.body,
    user_id: req.body.user_id,
  });
  // if the dish is successfully created, the new response will be returned as json
  res.status(200).json(dishData)
} catch (err) {
  res.status(400).json(err);
}
});


module.exports = router;
