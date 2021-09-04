const router = require('express').Router();

const userController = require('../controllers/user.controller');
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

router.get('/', userController.getAllUsers);

router.post('/', isValidUserData, getUserByDynamicParam('email'), isEmailExist, userController.createUser);

router.use('/:user_id', isIdValid, getUserByDynamicParam('user_id', 'params', '_id'), isUserByIdExist);

router.get('/:user_id', checkUserRole(), userController.getUserById);

router.delete('/:user_id', authMiddlewares.checkAccessToken,  userController.deleteUserById);

router.put('/:user_id', isUpdateUserValidator, userController.updateUser);

module.exports = router;
