const { Book } = require('../dataBase');
const ErrorHandler = require('../errors/ErrorHandler');
const bookValidators = require('../validators/book.validator');
const statusCode = require('../configs/statusCodes.enum');

module.exports = {
    isBookExist: (req, res, next) => {
        try {
            const { book } = req;

            if (book) {
                throw new ErrorHandler(statusCode.EXIST, 'Book is already exist');
            }

            next();
        } catch (e) {
            next(e);
        }
    },
    isBookByIdExist: (req, res, next) => {
        try {
            const { book } = req;

            if (!book) {
                throw new ErrorHandler(statusCode.NOT_FOUND, 'Book not found');
            }
            next();
        } catch (e) {
            next(e);
        }
    },
    isIdBookValid: (req, res, next) => {
        try {
            const { error } = bookValidators.idValidator.validate(req.params);
            if (error) {
                throw new ErrorHandler(statusCode.BAD_REQUEST, error.details[0].message);
            }
            next();
        } catch (e) {
            next(e);
        }
    },
    getBookByDynamicParam: (paramName, searchIn = 'body', dbField = paramName) => async (req, res, next) => {
        try {
            const value = req[searchIn][paramName];
            const book = await Book.findOne({ [paramName]: value });

            req.book = book;
            next();
        } catch (e) {
            next(e);
        }
    },
    isValidBookData: (req, res, next) => {
        try {
            const { error, value } = bookValidators.createBookValidator.validate(req.body);
            if (error) {
                throw new ErrorHandler(statusCode.BAD_REQUEST, error.details[0].message);
            }
            next();
        } catch (e) {
            next(e);
        }
    },
    isUpdateBookValidator: (req, res, next) => {
        try {
            const { error, value } = bookValidators.updateBookValidator.validate(req.body);
            if (error) {
                throw new ErrorHandler(statusCode.BAD_REQUEST, error.details[0].message);
            }
            next();
        } catch (e) {
            next(e);
        }
    },
};
