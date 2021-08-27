const { User } = require('../dataBase');

module.exports = {
    getUserById: async (req, res, next) => {
        try {
            const { user_id } = req.params;

            const user = await User.findOne({ id: user_id });

            res.status(200).json(user);
        } catch (e) {
            next(e);
        }
    },

    getAllUsers: async (req, res) => {
        try {
            const users = await User.find({});

            res.status(200).json(users);
        } catch (e) {
            next(e);
        }
    },

    deleteUserById: async (req, res) => {
        try {
            const { user_id } = req.params;
            await User.findByIdAndDelete(user_id);

            res.status(201).json('deleted');
        } catch (e) {
            next(e);
        }
    },

    createUser: async (req, res, next) => {
        try {
            const user = await User.create(req.body);

            res.status(201).json(user);
        } catch (e) {
            next(e);
        }
    },
    updateUser: async (req, res, next) => {
        try {
            const { user_id } = req.params;
            const user = await User.findByIdAndUpdate(user_id, req.body);

            res.status(204).json(user);
        } catch (e) {
            next(e);
        }
    },
};
