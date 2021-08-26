const userController = require("../controllers/user.controller");

const router = require('express').Router();

router.get('/:user_id', userController.getUserById);

router.post('/', userController.loginUser);

router.post('/create', userController.registerUser);

module.exports = router;