const Joi = require('joi');

const createBookValidator = Joi.object({
    name: Joi.string().min(2).max(30).required(),
    author:Joi.string().min(2).max(30).required(),
    price: Joi.string().min(2).max(5).required(),
})

const updateBookValidator = Joi.object({
    name: Joi.string().min(2).max(30),
    author:Joi.string().min(2).max(30),
    price: Joi.string().min(2).max(5),
})

module.exports = {
    createBookValidator,
    updateBookValidator 
}