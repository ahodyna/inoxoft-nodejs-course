const { User } = require('../dataBase');
const { statusCodesEnum, emailActionsEnum } = require('../configs')
const { emailService, passwordService } = require('../services');
const userUtil = require('../utils/user.util');


module.exports = {
    createAdmin: async (req, res, next) => {
        try {
            const { password, name } = req.body;

            const hashPassword = await passwordService.hash(password);
            const user = await User.create({ ...req.body, password: hashPassword, role: 'admin' });

            await emailService.sendMail('olena.bondarenko023@gmail.com', emailActionsEnum.ADMIN_WELCOME, {adminLogin: name, adminPassword: password})

            const normalizedUser = userUtil.userNormalizator(user);
            res.status(statusCodesEnum.CREATED).json(normalizedUser);
        } catch (e) {
            next(e);
        }
    },
}