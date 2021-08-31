const router = require('express').Router();

const bookController = require('../controllers/books.controller');
const { isUpdateBookValidator, isValidBookData, isBookExist, isBookByIdExist } = require('../middlewares/book.middleware');

router.get('/:book_id', isBookByIdExist, bookController.getBookById);
router.delete('/:book_id', bookController.deleteBookById);

router.get('/', bookController.getAllBooks);
router.post('/',isValidBookData, isBookExist, bookController.addBook);

router.put('/:book_id', isUpdateBookValidator, isBookByIdExist, bookController.updateBookInfo);

module.exports = router;
