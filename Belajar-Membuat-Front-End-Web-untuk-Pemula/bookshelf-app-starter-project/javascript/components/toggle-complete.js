import { books, saveBooks } from "./basic-config";
import { renderBooks } from "./render-books";

const inProgressShelfList = document.getElementById("incompleteBookList");
const completeShelfList = document.getElementById("completeBookList");

// FIND BOOK BY ID
function findBookId(bookId) {
  return books.find((item) => {
    String(item.id) === String(bookId);
  });
}

// CHANGE STATUS WHEN TOOGLE CLICKED
function changeBookStatus(book) {
  book.isComplete = !book.isComplete;
}

// GET BOOK ID
function getBookId(data) {
  const card = data.closest(["data-bookid"]);
  if (!card) {
    return;
  }

  return card.dataset.bookid;
}

// CHANGE BUTTON COMPLETE
function toggleBookStatus(event) {
  const isClicked = event.target.closest(
    '[data-testid="bookItemIsCompleteButton"]',
  );

  if (!isClicked) {
    return;
  }

  const bookId = getBookId(isClicked);
  if (!bookId) {
    return;
  }

  const targetBook = findBookId(bookId);
  if (!targetBook) {
    return;
  }

  changeBookStatus(targetBook);
  saveBooks();
  renderBooks();
}

// GET WHAT USER DO
function actionToggleComplete() {
  inProgressShelfList.addEventListener("click", toggleBookStatus);

  completeShelfList.addEventListener("click", toggleBookStatus);
}

actionToggleComplete()
