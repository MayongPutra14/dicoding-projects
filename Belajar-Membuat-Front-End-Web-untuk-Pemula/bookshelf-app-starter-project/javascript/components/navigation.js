// TAB CONTENT
const tabs = document.querySelectorAll("[data-tab-target]");
const tabContents = document.querySelectorAll("[data-tab-content]");

function activateTab(targetSelector) {
  if (!targetSelector) return;

  tabContents.forEach((content) => content.classList.remove("active"));
  tabs.forEach((tab) => tab.classList.remove("selected"));

  const targetContent = document.querySelector(targetSelector);
  const targetTab = document.querySelector(
    `[data-tab-target="${targetSelector}"]`,
  );

  if (targetContent && targetTab) {
    targetContent.classList.add("active");
    targetTab.classList.add("selected");

    localStorage.setItem("lastOpenedTab", targetSelector);
  }
}

tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    activateTab(tab.dataset.tabTarget);
  });
});

const savedTab = localStorage.getItem("lastOpenedTab");
if (savedTab) {
  activateTab(savedTab);
} else {
  activateTab("#all-book");
}

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
const btnAddNewBook = document.querySelector(".btn-add-new-book");
const closeButton = document.querySelector(".btn-close");
const formAddNewBook = document.getElementById("bookForm");
const overlayBackground = document.querySelector(".overlay");

btnAddNewBook.addEventListener("click", () => {
  formAddNewBook.classList.add("open");
  overlayBackground.classList.add("open");
});

closeButton.addEventListener("click", () => {
  formAddNewBook.classList.remove("open");
  overlayBackground.classList.remove("open");
});
