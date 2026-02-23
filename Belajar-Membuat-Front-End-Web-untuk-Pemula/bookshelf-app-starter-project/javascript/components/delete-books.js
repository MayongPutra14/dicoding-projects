import { books, saveBooks } from './basic-config.js';
import { renderBooks } from './render-books.js';

const unfinishedShelfRoot = document.getElementById('incompleteBookList');
const finishedShelfRoot   = document.getElementById('completeBookList');

function pullBookIdentifierFromDeleteTrigger(triggerNode) {
  const bookCardNode = triggerNode.closest('[data-bookid]');
  if (!bookCardNode) return null;

  return bookCardNode.dataset.bookid;
}

function removeBookEntityFromStateById(bookId) {
  const remainingBooks = books.filter(
    (book) => String(book.id) !== String(bookId)
  );

  books.length = 0;
  books.push(...remainingBooks);
}

function processDeleteIntent(event) {
  const deleteButtonNode = event.target.closest(
    '[data-testid="bookItemDeleteButton"]'
  );

  if (!deleteButtonNode) return;

  const bookId = pullBookIdentifierFromDeleteTrigger(deleteButtonNode);
  if (!bookId) return;

  const userConfirmed = window.confirm(
    'Apakah kamu yakin ingin menghapus buku ini?'
  );

  if (!userConfirmed) return;

  removeBookEntityFromStateById(bookId);
  saveBooks();
  renderBooks();
}

function attachDeleteDelegationHandler() {
  unfinishedShelfRoot.addEventListener('click', processDeleteIntent);
  finishedShelfRoot.addEventListener('click', processDeleteIntent);
}

attachDeleteDelegationHandler();