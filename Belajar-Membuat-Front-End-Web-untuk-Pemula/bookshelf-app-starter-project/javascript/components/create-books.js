import { books, saveBooks } from "./basic-config.js";
import { renderBooks } from "./render-books.js";

const formElement = document.getElementById("bookForm");

// CREATE NEW OBJECT BOOK
function createBookObject() {
  const titleBook = document.getElementById("bookFormTitle");
  const authorBook = document.getElementById("bookFormAuthor");
  const yearBook = document.getElementById("bookFormYear");
  const isComplete = document.getElementById("bookFormIsComplete");

  return {
    id: Date.now(),
    title: titleBook.value.trim(),
    author: authorBook.value.trim(),
    year: Number(yearBook.value),
    isComplete: isComplete.checked,
  };
}

// PUSH BOOK INTO books VARIABEL IN BASIC-CONFIG.JS
function pushBookIntoArray(bookData) {
    books.push(bookData);
    saveBooks();
}

// RESET FORM AFTER SUBMIT
function resetFormAddNewBook() {
    formElement.reset()
}

// LISTEN THE BUTTON: IF BUTTON CLICKED, DO ALL STEP BELLOW
function setupFromListener() {
    formElement.addEventListener('submit', (event) => {
        event.preventDefault();

        const newBook = createBookObject()

        pushBookIntoArray(newBook);
        renderBooks();
        resetFormAddNewBook();
    })
}

setupFromListener()
