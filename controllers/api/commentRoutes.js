const router = require('express').Router();
const {Comments} = require('../../models');


router.post('/', async (req, res) => {
  try {
    const commentData = await Comments.create({
    post_id: req.body.id,
    body: req.body.body,
    user_id: req.session.user_id,
    })
    console.log(commentData)
    res.status(200).json(commentData) 
  } catch (err) {
    res.status(400).json(err);
  }
})


module.exports = router;