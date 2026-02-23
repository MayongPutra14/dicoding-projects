function renderInProgressBooks() {
  console.log("Render In Progress function dipanggil");
  const containerInProgressBook = document.getElementById("incompleteBookList");
  const containerCompleteBook = document.getElementById("completeBookList");

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
                    <img src="./assets/bumi-manusia-cover.webp" alt="Cover" class="book-cover" />
                    <div class="book-detail-text">
                        <div class="identity-book">
                            <h3 data-testid="bookItemTitle">${book.title}</h3>
                            <p data-testid="bookItemAuthor">${book.author}</p>
                            <p data-testid="bookItemYear">${book.year}</p>
                        </div>
                        <button data-testid="bookItemIsCompleteButton" class="btn-complete">
                            In Progress
                        </button>
                    </div>
                </div>
                 <div class="book-actions">
                    <button data-testid="bookItemEditButton" class="btn-icon">
                        <img src="./assets/edit-icn.svg" alt="Edit" />
                    </button>
                    <button data-testid="bookItemDeleteButton" class="btn-icon btn-danger">
                        <img src="./assets/delete-icn.svg" alt="Delete" />
                    </button>
                </div>
            `;
    if (book.isComplete === false) {
      containerInProgressBook.appendChild(bookCard);
    }

    if(book.isComplete === true) {
        containerCompleteBook.appendChild(bookCard)
    }

  });
}



export { renderInProgressBooks };
