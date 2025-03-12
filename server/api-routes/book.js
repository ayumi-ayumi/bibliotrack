import express from 'express';
import {
  getAllBooks,
  saveNewBook,
  deleteBook,
  updateBook,
  searchBook,
} from '../controller/books.js';

const router = express.Router();

router.get('/', getAllBooks);
router.post('/add', saveNewBook);
router.delete('/:id', deleteBook);
router.patch('/:id', updateBook);
router.post('/search', searchBook);

export default router;
