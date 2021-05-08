const router = require('express').Router();
const dishRoutes = require('./dish-routes.js');
const postRoutes = require('./blogPostRoutes');
const userRoutes = require('./userRoutes')
router.use('/dish', dishRoutes);
router.use('/posts', postRoutes);
router.use('/users', userRoutes);

module.exports = router;