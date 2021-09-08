const router = require('express').Router();

const { authContoller } = require('../controllers');
const { authMiddlewares, userMiddlewares } = require('../middlewares');

router.post('/', userMiddlewares.getUserByDynamicParam('email'), userMiddlewares.isUserByIdExist, authContoller.login);

router.post('/logout', authMiddlewares.checkAccessToken, authContoller.logout);

router.post('/refresh', authMiddlewares.checkRefreshToken, authContoller.refreshToken)

router.post('/password/forgot/send', userMiddlewares.getUserByDynamicParam('email'), authContoller.sendMailForgotPassword)
router.post('/password/forgot/set', userMiddlewares.getUserByDynamicParam('email'), authContoller.sendMailForgotPassword)

module.exports = router;
