const { constants, statusCodesEnum } = require('../configs');
const { OAuth } = require('../dataBase');
const { passwordService, jwtService } = require('../services');
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
}