const { statusCodesEnum, constants, errors } = require('../configs');
const ErrorHandler = require('../errors/ErrorHandler');

module.exports = {

    checkUserAvatar: (req, res, next) => {
        try {


            if (!req.files || !req.files.avatar) {

                next();
                return;
            }
            const { avatar } = req.files;
            const { name, size, mimetype } = avatar
            if (!constants.PHOTOS_MIMETYPES.includes(mimetype)) {
                throw new ErrorHandler(statusCodesEnum.BAD_REQUEST, 
                    errors.BAD_REQUEST.WRONG_FILE_FORMAT.customCode, 
                    name,'Wrong file format');
            };

            if (size > constants.MAX_AVATAR_SIZE) {
                throw new ErrorHandler(statusCodesEnum.BAD_REQUEST, 
                    errors.BAD_REQUEST.FILE_IS_TOO_BIG.customCode,
                    name, `File ${name} is too big`)
            }

            next()

        } catch (e) {
            next(e)
        }
    }
};

