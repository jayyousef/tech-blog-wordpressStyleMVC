const router = require('express').Router();
const {BlogPost} = require('../../models/');

// route to create/add a dish using async/await
router.post('/', async (req, res) => {
  try { 
    const dishData = await BlogPost.create({
    dish_name: req.body.dish_name,
    description: req.body.description,
    guest_name: req.body.guest_name,
    has_nuts: req.body.has_nuts,
  });
  // if the dish is successfully created, the new response will be returned as json
  res.status(200).json(dishData)
} catch (err) {
  res.status(400).json(err);
}
});


module.exports = router;
