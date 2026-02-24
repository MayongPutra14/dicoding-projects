import { 
    renderCategoryBooks 
} from "./render-book.js";

// TOOGLE BUTTON TO CHANGE CATEGORY
function toogleBookStatus(bookId) {
  const storedBooks = localStorage.getItem("books");
  if (!storedBooks) {
    return;
  }

  const books = JSON.parse(storedBooks);
  const updateBook = books.map((book) => {
    if (book.id === bookId) {
      return {
        ...book,
        isComplete: !book.isComplete,
      };
    }
    return book;
  });
  console.log("Sebelum update:", books);
  console.log("Sesudah update:", updateBook);
  localStorage.setItem("books", JSON.stringify(updateBook));
  console.log("Update berhasil dilakukan");
  renderCategoryBooks();
}

document.addEventListener("click", (event) => {
  if (event.target.classList.contains("btn-complete")) {
    console.log(event.target.classList.contains("btn-complete"));
    const bookCard = event.target.closest(".book-card");
    const bookId = Number(bookCard.dataset.bookid);

    toogleBookStatus(bookId);
  }
});
