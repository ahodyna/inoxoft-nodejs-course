const router = require('express').Router();

const bookController = require('../controllers/books.controller');
const {
    getBookByDynamicParam,
    isIdBookValid,
    isUpdateBookValidator,
    isValidBookData,
    isBookExist,
    isBookByIdExist
} = require('../middlewares/book.middleware');

router.get('/', bookController.getAllBooks);

router.post('/', isValidBookData, isBookExist, bookController.addBook);

router.use('/:book_id', isIdBookValid, getBookByDynamicParam('book_id', 'params', '_id'), isBookByIdExist);

router.get('/:book_id', bookController.getBookById);

router.delete('/:book_id', bookController.deleteBookById);

router.put('/:book_id', isUpdateBookValidator, bookController.updateBookInfo);

module.exports = router;
