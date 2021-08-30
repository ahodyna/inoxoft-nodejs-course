const Joi = require('Joi');
const { EMAIL_REGEX, PASSWORD_REGEX } = require('../configs/constants');

const createUserValidator = Joi.object({
    name: Joi.string().alphanum().min(2).max(30).required(),
    password: Joi.string().regex(PASSWORD_REGEX).trim().required(),
    email: Joi.string().regex(EMAIL_REGEX).trim().required()

})

const updateUserValidator = Joi.object({
    name: Joi.string().alphanum().min(2).max(30),
    email: Joi.string().regex(EMAIL_REGEX).trim()
})

module.exports = {
    createUserValidator,
    updateUserValidator 
}