const { User } = require('../dataBase');
const statusCode = require('../configs/statusCodes.enum');

module.exports = {
    getUserById: async (req, res, next) => {
        try {
            const { user_id } = req.params;

            const user = await User.findById(user_id)

            res.status(statusCode.OK).json(user);
        } catch (e) {
            next(e);
        }
    },

    getAllUsers: async (req, res) => {
        try {
            const users = await User.find({});

            res.status(statusCode.OK).json(users);
        } catch (e) {
            next(e);
        }
    },

    deleteUserById: async (req, res) => {
        try {
            const { user_id } = req.params;
            await User.findByIdAndDelete(user_id);

            res.status(statusCode.OK).json('deleted');
        } catch (e) {
            next(e);
        }
    },

    createUser: async (req, res, next) => {
        try {
            const user = await User.create(req.body);

            res.status(statusCode.CREATED).json(user);
        } catch (e) {
            next(e);
        }
    },
    updateUser: async (req, res, next) => {
        try {
            const { user_id } = req.params;
            const user = await User.findByIdAndUpdate(user_id, req.body);

            res.status(statusCode.OK).json(user);
        } catch (e) {
            next(e);
        }
    },
};
