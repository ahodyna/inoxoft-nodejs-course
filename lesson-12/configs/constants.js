module.exports = {
    ID_REGEXP: new RegExp(/^[a-f\d]{24}$/i),
    PASSWORD_REGEXP: new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\\$%\\^&\\*])(?=.{8,128})/),
    EMAIL_REGEXP: new RegExp('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\\.[a-zA-Z0-9-.]+$'),
    AUTHORIZATION:'Authorization',

    MAX_AVATAR_SIZE: 5 * 1024 * 1024,
    PHOTOS_MIMETYPES: ['image/gif','image/jpeg']
};
