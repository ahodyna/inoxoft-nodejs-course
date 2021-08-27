const router = require('express').Router();

const bookController = require('../controllers/books.controller');
const { isBookExist, isBookByIdExist } = require('../middlewares/book.middleware');

router.get('/:book_id', isBookByIdExist, bookController.getBookById);
router.delete('/:book_id', bookController.deleteBookById);

router.get('/', bookController.getAllBooks);
router.post('/', isBookExist, bookController.addBook);

router.put('/:book_id', isBookByIdExist, bookController.updateBookInfo);

module.exports = router;
