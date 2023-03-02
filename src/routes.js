const router = require('express').Router();

const homeController = require('./controller/homeController');
const authController = require('./controller/authController');
const gameController = require('./controller/gameController');

router.use('/', homeController);
router.use('/auth', authController);
router.use('/games', gameController);

module.exports = router;