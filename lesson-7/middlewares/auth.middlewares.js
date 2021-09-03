const { constants } = require('../configs');
const ErrorHandler = require('../errors/ErrorHandler');
const statusCode = require('../configs/statusCodes.enum');
const { jwtService } = require('../services');
const { OAuth } = require('../dataBase');

module.exports = {
    checkAccessToken: async (req, res, next) => {
        try {
            const token = req.get(constants.AUTHORIZATION);

            if (!token) {
                throw new ErrorHandler(statusCode.UNAUTHORIZED, 'No token');
            }
            await jwtService.verifyToken(token)

            const tokenFromDB = await OAuth.findOne({ access_token: token });

            if(!tokenFromDB){
                throw new ErrorHandler(statusCode.UNAUTHORIZED, 'Invalid token');
            }
        } catch (e) {
            next(e)
        }
    }
}