import "./components/navigation.js";
import "./components/create-book.js";
import {
  renderCategoryBooks,
  totalBooks,
} from "./components/render-book.js";
import './components/update-book.js'
import "./components/delete-book.js"
document.addEventListener("DOMContentLoaded", () => {
  renderCategoryBooks();
  totalBooks();
});

document.addEventListener("DOMContentLoaded", () => {
  const defaultTab = document.querySelector(".selected[data-tab-target]");
  if (defaultTab) {
    defaultTab.click();
  }
});
