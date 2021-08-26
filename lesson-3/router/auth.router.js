const authController = require("../controllers/auth.controller");

const router = require('express').Router();

router.get('/register', authController.getRegisterPage);

router.get('/login', authController.getLoginPage);


module.exports = router;