import { books } from "./basic-config.js";

const inCompleteContainer = document.getElementById("incompleteBookList");
const completeContainer = document.getElementById("completeBookList");

function createBookCard(book) {
  const wrapperElement = document.createElement("div");
  wrapperElement.classList.add("book-card");
  wrapperElement.classList.bookid = book.id;
  wrapperElement.setAttribute("data-testid", "bookItem");

  wrapperElement.innerHTML = `
       <div class="book-info-wrapper">
            <img
                src="./assets/bumi-manusia-cover.svg"
                alt="Cover"
                class="book-cover"
            />
            <div class="book-detail-text">
                <div class="identity-book">
                    <h3 data-testid="bookItemTitle">${book.title}</h3>
                    <p data-testid="bookItemAuthor">${book.author}</p>
                    <p data-testid="bookItemYear">${book.year}</p>
                </div>
                <button
                    data-testid="bookItemIsCompleteButton"
                    class="btn-complete"
                >
                    ${book.isComplete ? "Complete" : "In Progress"}
                </button>
            </div>
        </div>
        <div class="book-actions">
            <button
                data-testid="bookItemEditButton"
                class="btn-icon"
                title="Edit Buku"
            >
                <img src="./assets/edit-icn.svg" alt="Edit" />
            </button>
            <button
                data-testid="bookItemDeleteButton"
                class="btn-icon btn-danger"
                title="Hapus Buku"
            >
                <img src="./assets/delete-icn.svg" alt="Delete" />
            </button>
    </div>
  `;

  return wrapperElement;
}

function renderBooks() {
  inCompleteContainer.innerHTML = "";
  completeContainer.innerHTML = "";

  for ( const book of books) {
    const card = createBookCard(book);

    if(book.isComple) {
        completeContainer.append(card)
    }else {
        inCompleteContainer.append(card)
    }
  }
}


export {
    renderBooks,
}