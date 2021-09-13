const {statusCodesEnum, constants} = require('../configs');
const ErrorHandler = require('../errors/ErrorHandler');

module.exports = {

    checkUserAvatar: (req, res, next) => {
        try {
       

            if (!req.files) {
                
                next();
                return;
            }
            const { avatar } = req.files;
            const {name, size, mimetype} = avatar
            if (!constants.PHOTOS_MIMETYPES.includes(mimetype)) {
                throw new ErrorHandler(statusCodesEnum.BAD_REQUEST, `Wrong file format ${name}`);
            };

            if(size > constants.MAX_AVATAR_SIZE){
                throw new ErrorHandler(statusCodesEnum.BAD_REQUEST, `File ${name} is too big`)
            }

            next()

        } catch (e) {
            next(e)
        }
    }
};

