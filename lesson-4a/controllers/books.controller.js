const { Book } = require('../dataBase');

module.exports = {
    getBookById: async (req, res, next) => {
        try {
            const { book_id } = req.params;

            const book = await Book.findOne({ id: book_id });

            res.status(200).json(book);
        } catch (e) {
            next(e);
        }
    },

    getAllBooks: async (req, res) => {
        try {
            const books = await Book.find({});

            res.status(200).json(books);
        } catch (e) {
            next(e);
        }
    },

    deleteBookById: async (req, res) => {
        try {
            const { books_id } = req.params;
            await Book.findByIdAndDelete(books_id);

            res.status(201).json('deleted');
        } catch (e) {
            next(e);
        }
    },

    addBook: async (req, res, next) => {
        try {
            const book = await Book.create(req.body);

            res.status(201).json(book);
        } catch (e) {
            next(e);
        }
    },
    updateBookInfo: async (req, res, next) => {
        try {
            const { book_id } = req.params;
            const updatedBook = await Book.findByIdAndUpdate(book_id, req.body);

            res.status(204).json(updatedBook);
        } catch (e) {
            next(e);
        }
    },
};
