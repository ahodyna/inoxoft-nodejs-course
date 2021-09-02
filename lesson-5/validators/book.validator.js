const Joi = require('joi');
const { ID_REGEXP } = require('../configs/constants');

const createBookValidator = Joi.object({
    name: Joi.string().min(2).max(30).required(),
    author:Joi.string().min(2).max(30).required(),
    price: Joi.string().min(2).max(5).required(),
});

const updateBookValidator = Joi.object({
    name: Joi.string().min(2).max(30),
    author:Joi.string().min(2).max(30),
    price: Joi.string().min(2).max(5),
});

const idValidator = oidJoi.object({
    book_id: Joi.string().trim().regex(ID_REGEXP)
});

module.exports = {
    idValidator,
    createBookValidator,
    updateBookValidator 
}