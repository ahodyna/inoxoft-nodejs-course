const router = require('express').Router();

const authController = require('../controllers/auth.controller');

router.get('/register', authController.getRegisterPage);

router.get('/login', authController.getLoginPage);

module.exports = router;
