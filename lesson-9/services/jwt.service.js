const jwt = require('jsonwebtoken');
const { actionTypesEnum, configs, statusCodesEnum } = require('../configs');
const ErrorHandler = require('../errors/ErrorHandler');


module.exports = {
    generateTokenPair: () => {
        const access_token = jwt.sign({}, configs.ACCESS_TOKEN_SECRET, { expiresIn: '15m' });
        const refresh_token = jwt.sign({}, configs.REFRESH_TOKEN_SECRET, { expiresIn: '31' });
        return {
            access_token,
            refresh_token
        }
    },
    verifyToken: (token, tokenType = 'access') => {
        try {
            const secret = tokenType === 'access' ? configs.ACCESS_TOKEN_SECRET : config.REFRESH_TOKEN_SECRET;

            jwt.verify(token, secret);
        } catch (e) {
            throw new ErrorHandler(statusCodesEnum.UNAUTHORIZED, 'Invalid token')
        }

    },
    generateActionToken: (actionType) => {
        let word = '';

        switch (actionType) {
            case actionTypesEnum.FORGOT_PASS:
                word = configs.FORGOT_PASS_TOKEN_SECRET;
                break;
            default:
                throw new ErrorHandler(statusCodesEnum.BAD_REQUEST, 'Wrong action type');
        }

        return jwt.sign({ actionType }, word, { expiresIn: '7d' });
    },
    verifyActionToken: (actionType, token) => {
        let word = '';

        switch (actionType) {
            case actionTypesEnum.FORGOT_PASS:
                word = configs.FORGOT_PASS_TOKEN_SECRET;
                break;
            default:
                throw new ErrorHandler(statusCodesEnum.BAD_REQUEST, 'Wrong action type');
        }

        return jwt.verify(token, word);
    }
};

