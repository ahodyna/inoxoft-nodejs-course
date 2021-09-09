const { constants } = require('../configs');
const ErrorHandler = require('../errors/ErrorHandler');
const statusCode = require('../configs/statusCodes.enum');
const { jwtService } = require('../services');
const { OAuth } = require('../dataBase');
const dataBaseTablesEnum = require('../configs/dataBaseTables.enum');

module.exports = {
    isAdmin: (req, res, next) => {
        try {
            const { loggedUser } = req;
            console.log('loggedUser', loggedUser)

            if (loggedUser.role !== 'admin') {
                throw new ErrorHandler(statusCode.FORBIDDEN, ' FORBIDDEN');
            }

            next();
        } catch (e) {
            next(e);
        }

    },
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
    },
    checkActionToken: (actionType) => async (req, res, next) => {
        try {
            const token = req.get(constants.AUTHORIZATION);

            if (!token) {
                throw new ErrorHandler(statusCode.UNAUTHORIZED, 'No token');
            }

            await jwtService.verifyActionToken(actionType, token);

            const tokenFromDB = await ActionToken.findOne({ token });

            await tokenFromDB.testMethod();

            if (!tokenFromDB) {
                throw new ErrorHandler(statusCode.UNAUTHORIZED, 'Invalid token');
            }

            req.currentUser = tokenFromDB.user;

            next();
        } catch (e) {
            next(e);
        }
    },
}