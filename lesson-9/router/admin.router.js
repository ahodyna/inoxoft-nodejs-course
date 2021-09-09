const router = require('express').Router();

const {createAdmin} = require('../controllers/admin.controller');
const authMiddlewares = require('../middlewares/auth.middlewares');
const {
  
    getUserByDynamicParam,
    checkUserRole,
    isIdValid,
    isUpdateUserValidator,
    isEmailExist,
    isValidUserData,
    isUserByIdExist
} = require('../middlewares/user.middleware');


router.post('/admins', authMiddlewares.checkAccessToken, authMiddlewares.isAdmin, isValidUserData, getUserByDynamicParam('email'), isEmailExist, createAdmin);


module.exports = router;