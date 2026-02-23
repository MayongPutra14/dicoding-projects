console.log("Main.js Berjalan");
import "./components/navigation.js";
import "./components/create-book.js";
import { renderInProgressBooks } from "./components/render-book.js";

document.addEventListener("DOMContentLoaded", () => {
  renderInProgressBooks();
});
