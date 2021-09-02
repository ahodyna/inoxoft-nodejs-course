const router = require('express').Router();

const userController = require('../controllers/user.controller');
const userRolesEnum = require('../configs/user-roler.enum')
const {checkUserRole,isIdValid, isUpdateUserValidator, isEmailExist, isValidUserData, isUserByIdExist } = require('../middlewares/user.middleware');

router.get('/:user_id', isIdValid, isUserByIdExist, checkUserRole([]), userController.getUserById);
router.delete('/:user_id',isIdValid, userController.deleteUserById);

router.get('/', userController.getAllUsers);
router.post('/', isValidUserData, isEmailExist, userController.createUser);

router.put('/:user_id', isUpdateUserValidator,isIdValid, isUserByIdExist, userController.updateUser);

module.exports = router;
