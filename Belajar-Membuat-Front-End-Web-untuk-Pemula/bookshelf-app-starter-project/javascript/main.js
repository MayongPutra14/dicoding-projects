console.log("Main.js Berjalan");
import "./components/navigation.js";
import "./components/create-book.js";
import {
  renderAllBooks,
  renderInProgressBooks,
} from "./components/render-book.js";

document.addEventListener("DOMContentLoaded", () => {
  renderInProgressBooks();
  renderAllBooks();
});

document.addEventListener("DOMContentLoaded", () => {
  const defaultTab = document.querySelector(".selected[data-tab-target]");
  if (defaultTab) {
    defaultTab.click(); // Memicu event click secara otomatis
  }
});
