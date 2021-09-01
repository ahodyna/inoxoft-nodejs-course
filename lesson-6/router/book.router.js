const router = require('express').Router();

const bookController = require('../controllers/books.controller');
const { isIdBookValid, isUpdateBookValidator, isValidBookData, isBookExist, isBookByIdExist } = require('../middlewares/book.middleware');

router.get('/:book_id', isIdBookValid, isBookByIdExist, bookController.getBookById);
router.delete('/:book_id',isIdBookValid, bookController.deleteBookById);

router.get('/', bookController.getAllBooks);
router.post('/', isValidBookData, isBookExist, bookController.addBook);

router.put('/:book_id',isIdBookValid, isUpdateBookValidator, isBookByIdExist, bookController.updateBookInfo);

module.exports = router;
