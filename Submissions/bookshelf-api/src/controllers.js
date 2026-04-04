import { nanoid } from 'nanoid';
import books from './books.js';

const createBook = (request, response) => {
  const {
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
  } = request.body;

  if (!name) {
    return response.status(400).json({
      status: 'fail',
      message: 'Gagal menambahkan buku. Mohon isi nama buku',
    });
  }

  if (typeof reading !== 'boolean') {
    return response.status(400).json({
      status: 'fail',
      message: 'Gagal menambahkan buku. reading harus bertipe boolean',
    });
  }
  const yearNum = Number(year);
  const pageCountNum = Number(pageCount);
  const readPageNum = Number(readPage);
  const finished = pageCountNum === readPageNum;

  if (readPageNum > pageCountNum) {
    return response.status(400).json({
      status: 'fail',
      message:
        'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount',
    });
  }

  const bookId = nanoid(16);
  const insertedAt = new Date().toISOString();
  const updatedAt = insertedAt;

  const newBook = {
    id: bookId,
    name,
    year: yearNum,
    author,
    summary,
    publisher,
    pageCount: pageCountNum,
    readPage: readPageNum,
    finished,
    reading,
    insertedAt,
    updatedAt,
  };

  books.push(newBook);

  return response.status(201).json({
    status: 'success',
    message: 'Buku berhasil ditambahkan',
    data: {
      bookId: bookId,
    },
  });
};

const getBooks = (request, response) => {
  const { reading, finished, name } = request.query;

  let filteredBook = [...books];

  if (reading !== undefined) {
    const isReading = reading === '1';

    filteredBook = books.filter((book) => book.reading === isReading);
  }

  if (finished !== undefined) {
    const isFinish = finished === '1';

    filteredBook = books.filter((book) => book.reading === isFinish);
  }

  if (name !== undefined) {
    filteredBook = books.filter((book) => {
      const bookName = book.name.toLowerCase();
      const keyword = name.toLowerCase();

      return bookName.includes(keyword);
    });
  }

  const dataBooks = filteredBook.map((book) => ({
    id: book.id,
    name: book.name,
    publisher: book.publisher,
  }));

  if (!dataBooks) {
    return response.status(200).json({
      status: 'success',
      data: {
        books: [],
      },
    });
  }

  return response.status(200).json({
    status: 'success',
    data: {
      books: dataBooks,
    },
  });
};

const getBookById = (request, response) => {
  const { bookId } = request.params;
  const book = books.find((book) => book.id === bookId);

  if (book) {
    return response.status(200).json({
      status: 'success',
      data: {
        book,
      },
    });
  }

  return response.status(404).json({
    status: 'fail',
    message: 'Buku tidak ditemukan',
    data: [],
  });
};

const updateBookById = (request, response) => {
  const { bookId } = request.params;
  const {
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
  } = request.body;

  if (!name) {
    return response.status(400).json({
      status: 'fail',
      message: 'Gagal memperbarui buku. Mohon isi nama buku',
    });
  }

  if (readPage > pageCount) {
    return response.status(400).json({
      status: 'fail',
      message:
        'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount',
    });
  }

  if (typeof reading !== 'boolean') {
    return response.status(400).json({
      status: 'fail',
      message: 'Gagal memperbarui buku. reading harus bertipe boolean',
    });
  }

  const updatedAt = new Date().toISOString();
  const index = books.findIndex((book) => book.id === bookId);

  if (index !== -1) {
    const finished = pageCount === readPage;

    books[index] = {
      ...books[index],
      name,
      year,
      author,
      summary,
      publisher,
      pageCount,
      readPage,
      reading,
      finished,
      updatedAt,
    };
    return response.status(200).json({
      status: 'success',
      message: 'Buku berhasil diperbarui',
    });
  }

  return response.status(404).json({
    status: 'fail',
    message: 'Gagal memperbarui buku. Id tidak ditemukan',
  });
};

const deletBookById = (request, response) => {
  const { bookId } = request.params;
  const index = books.findIndex((book) => book.id === bookId);

  if (index === -1) {
    return response.status(404).json({
      status: 'fail',
      message: 'Buku gagal dihapus. Id tidak ditemukan',
    });
  }

  books.splice(index, 1);

  return response.status(200).json({
    status: 'success',
    message: 'Buku berhasil dihapus',
  });
};

export { createBook, getBooks, getBookById, updateBookById, deletBookById };
