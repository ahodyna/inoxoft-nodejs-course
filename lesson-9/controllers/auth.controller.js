const { actionTypesEnum, configs, constants, statusCodesEnum, emailActionsEnum } = require('../configs');
const { OAuth, ActionToken } = require('../dataBase');
const { passwordService, jwtService, emailService } = require('../services');
const { userNormalizator } = require('../utils/user.util');

module.exports = {
    login: async (req, res, next) => {
        try {
            const { user, body: { password } } = req;

            await passwordService.compare(password, user.password);

            const tokenPair = jwtService.generateTokenPair();

            await OAuth.create({ ...tokenPair, user: user._id });
            
            res.json({
                ...tokenPair,
                user: userNormalizator(user)
            });
        } catch (e) {
            next(e);
        }
    },
    logout: async (req, res, next) => {
        try {
            const token = req.get(constants.AUTHORIZATION);

            await OAuth.deleteOne({ access_token: token });

            res.status(statusCodesEnum.NO_CONTENT).json('Ok');
        } catch (e) {
            next(e);
        }
    },
    refreshToken: async (req, res, next) => {
        try {
            const token = req.get(constants.AUTHORIZATION);
            const { currentUser } = req;

            const tokenPair = jwtService.generateTokenPair();
            await OAuth.findOneAndUpdate({ token }, tokenPair);

            res.json({
                ...tokenPair,
                user: userUtil.userNormalizator(currentUser)
            });
        } catch (e) {
            next(e);
        }
    },
    sendMailForgotPassword: async (req, res, next) => {
        try {  
            const { user } = req;
            const actionToken = jwtService.generateActionToken(actionTypesEnum.FORGOT_PASS);

            await ActionToken.create({ token: actionToken, user: user._id });
            console.log(user._id)
            await emailService.sendMail('olena.bondarenko023@gmail.com', emailActionsEnum.FORGOT_PASSWORD, { forgotPasswordUrl: `${configs.FRONTED_URL}/forgot?token=${actionToken}` })

            res.json('Email was sent');
        } catch (e) {
            next(e);
        }
    },
}