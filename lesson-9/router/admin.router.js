const router = require('express').Router();

const { createAdmin } = require('../controllers/admin.controller');
const { authMiddlewares, userMiddlewares } = require('../middlewares');

router.post('/admins',
    authMiddlewares.checkAccessToken,
    authMiddlewares.isAdmin,
    userMiddlewares.isValidUserData,
    userMiddlewares.getUserByDynamicParam('email'),
    userMiddlewares.isEmailExist,
    createAdmin);

module.exports = router;