const router = require('express').Router();

const userController = require('../controllers/user.controller');
const { isUpdateUserValidator, isEmailExist, isValidUserData, isUserByIdExist } = require('../middlewares/user.middleware');

router.get('/:user_id', isUserByIdExist, userController.getUserById);
router.delete('/:user_id', userController.deleteUserById);

router.get('/', userController.getAllUsers);
router.post('/', isValidUserData, isEmailExist, userController.createUser);

router.put('/:user_id', isUpdateUserValidator, isUserByIdExist, userController.updateUser);

module.exports = router;
