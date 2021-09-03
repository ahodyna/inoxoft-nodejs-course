const jwt = require('jsonwebtoken');

const statusCodesEnum = require('../configs/statusCodes.enum');
const config = require('../configs/config');
const ErrorHandler = require('../errors/ErrorHandler');


module.exports = {
    generateTokenPair: () => {
        const access_token = jwt.sign({}, config.ACCESS_TOKEN_SECRET, { expiresIn: '15m' });
        const refresh_token = jwt.sign({}, config.REFRESH_TOKEN_SECRET, { expiresIn: '31' });
        return {
            access_token,
            refresh_token
        }
    },
    verifyToken: (token, tokenType = 'access') => {
        try {
            const secret = tokenType === 'access' ? config.ACCESS_TOKEN_SECRET : config.REFRESH_TOKEN_SECRET;

            jwt.verify(token, secret)
        } catch (e) {
            throw new ErrorHandler(statusCodesEnum.UNAUTHORIZED, 'Invalid token')
        }

    }

};

