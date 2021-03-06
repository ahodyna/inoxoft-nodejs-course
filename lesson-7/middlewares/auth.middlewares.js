const { constants } = require('../configs');
const ErrorHandler = require('../errors/ErrorHandler');
const statusCode = require('../configs/statusCodes.enum');
const { jwtService } = require('../services');
const { OAuth } = require('../dataBase');
const dataBaseTablesEnum = require('../configs/dataBaseTables.enum');

module.exports = {
    checkAccessToken: async (req, res, next) => {
        try {
            const token = req.get(constants.AUTHORIZATION);

            if (!token) {
                throw new ErrorHandler(statusCode.UNAUTHORIZED, 'No token');
            }
            await jwtService.verifyToken(token)

            const tokenFromDB = await OAuth.findOne({ access_token: token }).populate(dataBaseTablesEnum.USER);

            if (!tokenFromDB) {
                throw new ErrorHandler(statusCode.UNAUTHORIZED, 'Invalid token');
            }
            req.loggedUser = tokenFromDB.user;

            next()
        } catch (e) {
            next(e)
        }
    },
    checkRefreshToken: async (req, res, next) => {
        try {
            const token = req.get(constants.AUTHORIZATION);

            if (!token) {
                throw new ErrorHandler(statusCode.UNAUTHORIZED, 'No token');
            }
            await jwtService.verifyToken(token, 'refresh')

            const tokenFromDB = await OAuth.findOne({ refresh_token: token }).populate(dataBaseTablesEnum.USER);

            if (!tokenFromDB) {
                throw new ErrorHandler(statusCode.UNAUTHORIZED, 'Invalid token');
            }
            req.loggedUser = tokenFromDB.user;

            next()
        } catch (e) {
            next(e)
        }
    }
}