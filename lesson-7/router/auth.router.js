const router = require('express').Router();

const {authContoller} = require('../controllers');
const authController = require('../controllers/auth.controller');
const {authMiddlewares, userMiddlewares} = require('../middlewares');

router.post('/', userMiddlewares.getUserByDynamicParam('email'), userMiddlewares.isUserByIdExist, authContoller.login);

router.post('/logout', authMiddlewares.checkAccessToken, authController.logout);


module.exports  = router;