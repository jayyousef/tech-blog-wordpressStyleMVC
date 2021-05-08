const router = require('express').Router();
const bcrypt = require('bcrypt');
const User = require('../../models/User');
const session = require('express-session')

//create new user function
router.post('/login', async (req, res) => {
  router.post('/', async (req, res) => {
    try {
      const dbUserData = await User.create({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
      });
  
//Set up sessions with the 'loggedIn' variable
      req.session.save(() => {
        req.session.loggedIn=true;
        
        res.status(200).json(dbUserData);
      });
    } catch (err) {
      res.status(400).json(err);
    }
  })
})

//login function
router.post('/login', async (req, res) => {
  try {
    // we search the DB for a user with the provided email
    const userData = await User.findOne({
      where: {
        email: req.body.email
      }
    });
    if (!userData) {
      // the error message shouldn't specify if the login failed because of wrong email or password
      res.status(404).json({
        message: 'Login failed. Please try again!'
      });
      return;
    }
    // use `bcrypt.compare()` to compare the provided password and the hashed password
    const validPassword = await bcrypt.compare(
      req.body.password,
      userData.password
    );
    // if they do not match, return error message
    if (!validPassword) {
      res.status(400).json({
        message: 'Login failed. Please try again!'
      });
      return;
    }
    // if they do match, return success message
    res.status(200).json({
      message: 'You are now logged in!'
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// PUT update a user
router.put('/:id', async (req, res) => {
  try {
    //need to format the user data in a way that can be read by sequelize
    /* req.body should look like this...
    {
password:
    }
  */
    const userData = await User.update(req.body, {
      where: {
        id: req.params.id,
      },
      individualHooks: true
    });
    if (!userData[0]) {
      res.status(400).json({
        message: 'Sorry, there was an error! Please try again'
      });
      return;
    }
    res.status(200).json(userData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;