import { renderCategoryBooks } from "./render-book.js";

const inputUser = document.getElementById("searchBookTitle");
const searchButton = document.getElementById("searchSubmit");

function searchBookTitle() {
    const keyword = inputUser.value.toLowerCase();

  const storedBooks = localStorage.getItem("books");
  if (!storedBooks) return;
  
  const books = JSON.parse(storedBooks);

  const bookByTittle = books.filter((book) => {
    return book.title.toLowerCase().includes(keyword);
  });

  renderCategoryBooks(bookByTittle);
}

searchButton.addEventListener("click", (event) => {
  event.preventDefault();
  searchBookTitle();
  console.log("Button dari search di click");
});
