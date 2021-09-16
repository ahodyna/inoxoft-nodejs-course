const { User } = require('../dataBase');
const { statusCodesEnum, emailActionsEnum } = require('../configs')
const { emailService, passwordService, s3Service, userService } = require('../services');
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
            const response = await userService.findAll(req.query)

            res.json(response);
        } catch (e) {
            res.json({ message: e.message });
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

            let user = await User.createWithHashPassword(req.body);

            if (req.files && req.files.avatar) {
                const { _id } = user;
                const uploadFile = await s3Service.uploadImage(req.files.avatar, 'organization', _id);

                user = await User.findByIdAndUpdate(_id, { avatar: uploadFile.Location }, { new: true });
            }

            // const { password, name, email } = req.body;

            // await emailService.sendMail(email, emailActionsEnum.WELCOME, {userName: name})


            const normalizedUser = userUtil.userNormalizator(user);

            res.status(statusCodesEnum.CREATED).json(normalizedUser);
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
