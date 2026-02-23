// TAB CONTENT
const tabs = document.querySelectorAll("[data-tab-target]");
const tabContents = document.querySelectorAll("[data-tab-content]");

tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    const targetSelector = tab.dataset.tabTarget;
    tabContents.forEach((tabContent) => {
      tabContent.classList.remove("active");
    });

    if (!targetSelector) {
      tabContents.forEach((tabContents) => {
        tabContents.classList.add("active");
      });
      return;
    }

    const target = document.querySelector(targetSelector);
    if (!target) {
      return;
    }
    target.classList.add("active");
  });
});

// COLOR ACTIVE WHEN SELECTED
const menuList = document.querySelectorAll("nav ul li");

function menuSelected(event) {
  // Remove class .selected from all <li> in <nav>
  menuList.forEach((menu) => {
    menu.classList.remove("selected");
  });

  // Add class .selected to menu that just clicked
  event.currentTarget.classList.add("selected");
}

menuList.forEach((menu) => {
  menu.addEventListener("click", menuSelected);
});


// CLOSE BUTTON ON FORM ADD NEW BOOK
const btnAddNewBook = document.querySelector(".btn-add-new-book")
const closeButton = document.querySelector(".btn-close")
const formAddNewBook = document.getElementById("bookForm")

btnAddNewBook.addEventListener('click', () => {
  formAddNewBook.classList.add("open")
})



closeButton.addEventListener('click', () => {
  formAddNewBook.classList.remove("open")
})

