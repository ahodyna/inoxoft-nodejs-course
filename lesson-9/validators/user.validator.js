const Joi = require('joi');
const { ID_REGEXP, EMAIL_REGEXP, PASSWORD_REGEXP } = require('../configs/constants');

const createUserValidator = Joi.object({
    name: Joi.string().alphanum().min(2).max(30).required(),
    password: Joi.string().regex(PASSWORD_REGEXP).trim().required(),
    email: Joi.string().regex(EMAIL_REGEXP).trim().required()
});

const updateUserValidator = Joi.object({
    name: Joi.string().alphanum().min(2).max(30),
    email: Joi.string().regex(EMAIL_REGEXP).trim()
});

const idValidator = Joi.object({
    user_id: Joi.string().trim().regex(ID_REGEXP)
});

module.exports = {
    idValidator,
    createUserValidator,
    updateUserValidator
};
