import { totalBooks,renderCategoryBooks } from "./render-book.js";

// DELETE BOOK BY ID
function deleteBook(bookId) {
  const storedBooks = localStorage.getItem("books");
  if (!storedBooks) return;
  const books = JSON.parse(storedBooks);

  const updateBooks = books.filter((book) => {
    return book.id !== bookId;
  });

  localStorage.setItem("books", JSON.stringify(updateBooks))

  renderCategoryBooks()
  totalBooks()
}

document.addEventListener("click", (event) => {
  if (event.target.closest(".btn-delete")) {

    const bookCard = event.target.closest(".book-card");
    const bookId = Number(bookCard.dataset.bookid);

    deleteBook(bookId);
  }
});