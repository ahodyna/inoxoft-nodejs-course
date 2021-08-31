const { User } = require('../dataBase');
const ErrorHandler = require('../errors/ErrorHandler');
const userValidators = require('../validators/user.validator')

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

            const user = await User.findById(user_id).select('+password');

            if (!user) {
                throw new ErrorHandler(404, 'User not found');
            }

            next();
        } catch (e) {
            next(e);
        }
    },

    isValidUserData: (req, res, next) => {
        try{
            console.log('req.body', req.body)
            const {error, value} = userValidators.createUserValidator.validate(req.body)
          console.log('value', value)

            if(error){
                throw new ErrorHandler(400, error.details[0].message)
            }
            next()
        }catch(e){
            next(e)
        }
    }
};
