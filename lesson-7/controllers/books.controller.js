const { Book } = require('../dataBase');
const statusCode = require('../configs/statusCodes.enum');
const ErrorHandler = require('../errors/ErrorHandler');

module.exports = {
    getBookById: async (req, res, next) => {
        try {
            const { book_id } = req.params;

            const book = await Book.findById(book_id);

            res.json(book);
        } catch (e) {
            next(e);
        }
    },

    getAllBooks: async (req, res) => {
        try {
            const books = await Book.find({});

            res.json(books);
        } catch (e) {
            next(e);
        }
    },

    deleteBookById: async (req, res, next) => {
        try {
            const { book_id } = req.params;
            const userId = req.loggedUser._id.toString();
            const book = await Book.findById(book_id);

            if (!book) {
                throw new ErrorHandler(statusCode.NOT_FOUND, 'Not found')
            }

            const bookOwnerId = book.ownerId

            console.log(typeof userId, typeof bookOwnerId)

            if (userId !== bookOwnerId) {

                throw new ErrorHandler(statusCode.UNAUTHORIZED, 'Unauthorized')
            }

            await Book.findByIdAndDelete(book_id);

            res.json('deleted');

        } catch (e) {
            next(e);
        }
    },

    addBook: async (req, res, next) => {
        try {
            const book = req.body
            book.ownerId = req.loggedUser._id;

            const savedBook = await Book.create(book);

            res.status(statusCode.CREATED).json(savedBook);
        } catch (e) {
            next(e);
        }
    },
    updateBookInfo: async (req, res, next) => {
        try {
            const { book_id } = req.params;
            const updatedBook = await Book.findByIdAndUpdate(book_id, req.body);

            res.json(updatedBook);
        } catch (e) {
            next(e);
        }
    },
};
