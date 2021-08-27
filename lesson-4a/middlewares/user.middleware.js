const { User } = require('../dataBase');
const ErrorHandler = require('../errors/ErrorHandler');

module.exports = {
    isEmailExist: async (req, res, next) => {
        try {
            const { email = '' } = req.body;

            const userByEmail = await User.findOne({ email: email.trim() });

            if (userByEmail) {
                throw new ErrorHandler(409, 'Email is already exist');
            }

            next();
        } catch (e) {
            next(e);
        }
    },

    isUserByIdExist: async (req, res, next) => {
        try {
            const { user_id } = req.params;

            const user = await User.findById(user_id);

            if (!user) {
                throw new ErrorHandler(404, 'User not found');
            }

            next();
        } catch (e) {
            next(e);
        }
    }
};
