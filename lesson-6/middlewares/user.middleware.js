const { User } = require('../dataBase');
const ErrorHandler = require('../errors/ErrorHandler');
const userValidators = require('../validators/user.validator');
const statusCode = require('../configs/statusCodes.enum');

module.exports = {
    isEmailExist: (req, res, next) => {
        try {
            const { user } = req;

            if (user) {
                throw new ErrorHandler(statusCode.EXIST, 'Email is already exist');
            }

            next();
        } catch (e) {
            next(e);
        }
    },
    isUserByIdExist: (req, res, next) => {
        try {
            const { user } = req;

            if (!user) {
                throw new ErrorHandler(statusCode.NOT_FOUND, 'User not found');
            }
            next();
        } catch (e) {
            next(e);
        }
    },
    checkUserRole: (roleArr = []) => (req, res, next) => {
        try {
            if (!roleArr.length) {
                return next();
            }
            next();
        } catch (e) {
            next(e);
        }
    },
    getUserByDynamicParam: (paramName, searchIn = 'body', dbField = paramName) => async (req, res, next) => {
        try {
            const value = req[searchIn][paramName];
            const user = await User.findOne({ [paramName]: value });

            req.user = user;
            next();
        } catch (e) {
            next(e);
        }
    },
    isIdValid: (req, res, next) => {
        try {
            const { user_id } = req.params;
            const { error } = userValidators.idValidator.validate({ id: user_id });
            if (error) {
                throw new ErrorHandler(statusCode.BAD_REQUEST, error.details[0].message);
            }
            next();
        } catch (e) {
            next(e);
        }
    },
    isValidUserData: (req, res, next) => {
        try {
            const { error, value } = userValidators.createUserValidator.validate(req.body);
            if (error) {
                throw new ErrorHandler(statusCode.BAD_REQUEST, error.details[0].message);
            }
            next();
        } catch (e) {
            next(e);
        }
    },
    isUpdateUserValidator: (req, res, next) => {
        try {
            const { error, value } = userValidators.updateUserValidator.validate(req.body);
            if (error) {
                throw new ErrorHandler(statusCode.BAD_REQUEST, error.details[0].message);
            }
            next();
        } catch (e) {
            next(e);
        }
    },
};
