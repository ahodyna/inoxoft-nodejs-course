const { User } = require('../dataBase');
const ErrorHandler = require('../errors/ErrorHandler');

module.exports = {
    isBookExist: async (req, res, next) => {
        try {
            const { name = '' } = req.body;

            const bookName = await User.findOne({ name: name.trim() });

            if (bookName) {
                throw new ErrorHandler(409, 'Book is already exist');
            }

            next();
        } catch (e) {
            next(e);
        }
    },

    isBookByIdExist: async (req, res, next) => {
        try {
            const { book_id } = req.params;

            const book = await User.findById(book_id);

            if (!book) {
                throw new ErrorHandler(404, 'Book not found');
            }

            next();
        } catch (e) {
            next(e);
        }
    }
};
