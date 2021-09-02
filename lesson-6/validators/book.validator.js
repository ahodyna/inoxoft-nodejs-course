const Joi = require('joi');
const oidJoi = require('joi-oid');

const createBookValidator = Joi.object({
    name: Joi.string().min(2).max(30).required(),
    author: Joi.string().min(2).max(30).required(),
    price: Joi.string().min(2).max(5).required(),
});

const updateBookValidator = Joi.object({
    name: Joi.string().min(2).max(30),
    author: Joi.string().min(2).max(30),
    price: Joi.string().min(2).max(5),
});

const idValidator = oidJoi.object({
    id: oidJoi.objectId(),
});

module.exports = {
    idValidator,
    createBookValidator,
    updateBookValidator
};
