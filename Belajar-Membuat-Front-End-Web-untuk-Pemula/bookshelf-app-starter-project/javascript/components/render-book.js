// RENDER THE CARDS TO EACH CATEGORY
function renderCategoryBooks() {
  const containerInProgressBook = document.getElementById("incompleteBookList");
  const containerCompleteBook = document.getElementById("completeBookList");
  const allBookContainer = document.getElementById("all-book-container");

  allBookContainer.innerHTML = "";
  containerInProgressBook.innerHTML = "";
  containerCompleteBook.innerHTML = "";

  const storedBooks = localStorage.getItem("books");
  if (!storedBooks) return;

  const books = JSON.parse(storedBooks);

  books.forEach((book) => {
    const bookCard = document.createElement("div");
    bookCard.classList.add("book-card");
    bookCard.setAttribute("data-bookid", book.id);
    bookCard.setAttribute("data-testid", "bookItem");

    bookCard.innerHTML = `
                <div class="book-info-wrapper">
                    <img src="./assets/Cover-book-template.webp" alt="Cover" class="book-cover" />
                    <div class="book-detail-text">
                        <div class="identity-book">
                            <h3 data-testid="bookItemTitle">${book.title}</h3>
                            <p data-testid="bookItemAuthor">${book.author}</p>
                            <p data-testid="bookItemYear">${book.year}</p>
                        </div>
                        <button data-testid="bookItemIsCompleteButton" class="btn-complete">
                            ${book.isComplete ? "Complete" : "In Progress"}
                        </button>
                    </div>
                </div>
                 <div class="book-actions">
                    <button data-testid="bookItemEditButton" class="btn-icon">
                        <img src="./assets/edit-icn.svg" alt="Edit" />
                    </button>
                    <button data-testid="bookItemDeleteButton" class="btn-icon btn-delete">
                        <img src="./assets/delete-icn.svg" alt="Delete" />
                    </button>
                </div>
            `;

    // MENU: Reading || In Complete
    if (book.isComplete === false) {
      containerInProgressBook.appendChild(bookCard);
    }

    // MENU: Complete
    if (book.isComplete === true) {
      containerCompleteBook.appendChild(bookCard);
    }

    // MENU: All Books
    const cloneCard = bookCard.cloneNode(true);
    allBookContainer.appendChild(cloneCard);
  });
}

// TOTAL BOOK
function totalBooks() {
  const saveBooks = localStorage.getItem("books");
  const totalBooks = document.querySelector(".total-books");
  if (saveBooks) {
    const bookParse = JSON.parse(saveBooks);
    totalBooks.innerText = bookParse.length;
  } else totalBooks.innerText = "0";
}

export {
  renderCategoryBooks,
  totalBooks,
};
