const STORAGE_KEY = "BOOKSHELF_APPS";
let books = [];

function loadBooks() {
  const data = localStorage.getItem(STORAGE_KEY); // Take data from local storage taht match with "BOOKSHELF_APPS"

  if (!data) {
    books = [];
    return;
  }

  books = JSON.parse(data); // Convert into JSON and read the data
}

function saveBooks() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(books)); // Convert into string and save teh data to local storage
}

loadBooks()

export {
    books,
    saveBooks
}
