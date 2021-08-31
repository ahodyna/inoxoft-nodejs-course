const { User } = require('../dataBase');
const ErrorHandler = require('../errors/ErrorHandler');
const userValidators = require('../validators/user.validator')
const statusCode = require('../configs/statusCodes.enum');

module.exports = {
    isEmailExist: async (req, res, next) => {
        try {
            const { email = '' } = req.body;

            const userByEmail = await User.findOne({ email: email.trim() });

            if (userByEmail) {
                throw new ErrorHandler(statusCode.EXIST, 'Email is already exist');
            }

            next();
        } catch (e) {
            next(e);
        }
    },

    isIdValid: async (req, res, next) => {
        try {
            const { user_id } = req.params;
            const { error} = userValidators.idValidator.validate({id: user_id})
            if (error) {
                throw new ErrorHandler(statusCode.BAD_REQUEST, error.details[0].message)
            }
            next();
        } catch (e) {
            next(e);
        }
    },
    isValidUserData: (req, res, next) => {
        try {
            const { error, value } = userValidators.createUserValidator.validate(req.body)
            if (error) {
                throw new ErrorHandler(statusCode.BAD_REQUEST, error.details[0].message)
            }
            next()
        } catch (e) {
            next(e)
        }
    },
    isUpdateUserValidator: (req, res, next) => {
        try {
            const { error, value } = userValidators.updateUserValidator.validate(req.body)
            if (error) {
                throw new ErrorHandler(statusCode.BAD_REQUEST, error.details[0].message)
            }
            next()
        } catch (e) {
            next(e)
        }
    },
    isUserByIdExist: async (req, res, next) => {
        try {
            const { user_id } = req.params;

            const user = await User.findById(user_id).select('+password');

            if (!user) {
                throw new ErrorHandler(statusCode.NOT_FOUND, 'User not found');
            }
            next();
        } catch (e) {
            next(e);
        }
    },
};
