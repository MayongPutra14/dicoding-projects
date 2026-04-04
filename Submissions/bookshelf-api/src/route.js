import express from 'express';
import {
  createBook,
  getBooks,
  getBookById,
  updateBookById,
  deletBookById,
} from './controllers.js';

const router = express.Router();

router.post('/books', createBook);

router.get('/books', getBooks);

router.get('/books/:bookId', getBookById);

router.put('/books/:bookId', updateBookById);

router.delete('/books/:bookId', deletBookById);
export default router;
