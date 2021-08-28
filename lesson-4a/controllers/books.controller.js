const { Book } = require('../dataBase');
const statusCode = require('../configs/statusCodes.enum');

module.exports = {
    getBookById: async (req, res, next) => {
        try {
            const { book_id } = req.params;

            const book = await User.findById(book_id)

            res.status(statusCode.OK).json(book);
        } catch (e) {
            next(e);
        }
    },

    getAllBooks: async (req, res) => {
        try {
            const books = await Book.find({});

            res.status(statusCode.OK).json(books);
        } catch (e) {
            next(e);
        }
    },

    deleteBookById: async (req, res) => {
        try {
            const { books_id } = req.params;
            await Book.findByIdAndDelete(books_id);

            res.status(statusCode.OK).json('deleted');
        } catch (e) {
            next(e);
        }
    },

    addBook: async (req, res, next) => {
        try {
            const book = await Book.create(req.body);

            res.status(statusCode.CREATED).json(book);
        } catch (e) {
            next(e);
        }
    },
    updateBookInfo: async (req, res, next) => {
        try {
            const { book_id } = req.params;
            const updatedBook = await Book.findByIdAndUpdate(book_id, req.body);

            res.status(statusCode.OK).json(updatedBook);
        } catch (e) {
            next(e);
        }
    },
};
