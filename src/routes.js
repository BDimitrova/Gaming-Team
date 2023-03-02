const router = require('express').Router();

const homeController = require('./controller/homeController');

router.use(homeController);

module.exports = router;