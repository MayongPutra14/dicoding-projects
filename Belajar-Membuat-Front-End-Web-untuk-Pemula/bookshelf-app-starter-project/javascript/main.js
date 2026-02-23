import "./components/navigation.js";
import "./components/basic-config.js";
import { renderBooks } from "./components/render-books.js";
import "./components/create-books.js";
import "./components/toggle-complete.js";
import "./components/delete-books.js";

document.addEventListener("DOMContentLoaded", () => {
  renderBooks();
});
