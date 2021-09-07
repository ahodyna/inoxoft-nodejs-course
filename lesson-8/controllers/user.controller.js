const { User } = require('../dataBase');
const statusCode = require('../configs/statusCodes.enum');
const { emailService, passwordService } = require('../services');
const userUtil = require('../utils/user.util');

module.exports = {
    getUserById: async (req, res, next) => {
        try {
            const { user_id } = req.params;

            let user = await User.findById(user_id);

            user = userUtil.userNormalizator(user)
            res.json(user);
        } catch (e) {
            next(e);
        }
    },

    getAllUsers: async (req, res) => {
        try {
            const users = await User.find({});

            res.json(users);
        } catch (e) {
            next(e);
        }
    },

    deleteUserById: async (req, res) => {
        try {
            const { user_id } = req.params;
            await User.findByIdAndDelete(user_id);

            res.json('deleted');
        } catch (e) {
            next(e);
        }
    },

    createUser: async (req, res, next) => {
        try {
            const { password, name } = req.body;

            const hashPassword = await passwordService.hash(password);
            const user = await User.create({ ...req.body, password: hashPassword });

            await emailService.sendMail('olena.bondarenko023@gmail.com', name )

            const normalizedUser = userUtil.userNormalizator(user);
            res.status(statusCode.CREATED).json(normalizedUser);
        } catch (e) {
            next(e);
        }
    },
    updateUser: async (req, res, next) => {
        try {
            const { user_id } = req.params;
            let user = await User.findByIdAndUpdate(user_id, req.body);

            user = userUtil.userNormalizator(user)
            res.json(user);
        } catch (e) {
            next(e);
        }
    },
};
