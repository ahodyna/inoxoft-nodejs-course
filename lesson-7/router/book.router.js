const router = require('express').Router();

const bookController = require('../controllers/books.controller');
const authMiddlewares = require('../middlewares/auth.middlewares');
const {
    getBookByDynamicParam,
    isIdBookValid,
    isUpdateBookValidator,
    isValidBookData,
    isBookExist,
    isBookByIdExist
} = require('../middlewares/book.middleware');


router.get('/', bookController.getAllBooks);

router.post('/', authMiddlewares.checkAccessToken, isValidBookData, isBookExist, bookController.addBook);

router.use('/:book_id', isIdBookValid, getBookByDynamicParam('book_id', 'params', '_id'), isBookByIdExist);

router.get('/:book_id', bookController.getBookById);

router.delete('/:book_id', authMiddlewares.checkAccessToken, bookController.deleteBookById);

router.put('/:book_id',  authMiddlewares.checkAccessToken, isUpdateBookValidator, bookController.updateBookInfo);

module.exports = router;
