const router = require('express').Router();

const userController = require('../controllers/user.controller');

router.get('/:user_id', userController.getUserById);

router.post('/', userController.loginUser);

router.post('/create', userController.registerUser);

module.exports = router;
