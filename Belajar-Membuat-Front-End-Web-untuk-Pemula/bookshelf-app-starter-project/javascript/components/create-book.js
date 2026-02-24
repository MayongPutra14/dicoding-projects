import { totalBooks, renderCategoryBooks } from "./render-book.js";
const bookForm = document.getElementById("bookForm");

bookForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const title = document.getElementById("bookFormTitle").value;
  const author = document.getElementById("bookFormAuthor").value;
  const year = document.getElementById("bookFormYear").value;
  const isComplete = document.getElementById("bookFormIsComplete").checked;

  const newBook = {
    id: Date.now(),
    title: title,
    author: author,
    year: Number(year),
    isComplete: isComplete,
  };

  const storedBook = localStorage.getItem("books");

  let booksArray = [];

  if (storedBook !== null) {
    booksArray = JSON.parse(storedBook);
  }

  booksArray.push(newBook);
  localStorage.setItem("books", JSON.stringify(booksArray));
  console.log(JSON.parse(localStorage.getItem("books")));
  bookForm.reset();
  renderCategoryBooks()
  totalBooks()

  console.log("Data Berhasil Ditambah");
});
