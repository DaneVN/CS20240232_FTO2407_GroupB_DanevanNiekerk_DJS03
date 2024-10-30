import { books, authors, genres, BOOKS_PER_PAGE } from "./data.js";
import {
  createOption,
  renderBooks,
  renderDropdownOptions,
  applyTheme,
} from "./module/helper.js";
let page = 1;
let matches = books;

// Render initial set of books
renderBooks(matches.slice(0, BOOKS_PER_PAGE));

// Populate genres and authors dropdowns
renderDropdownOptions(
  genres,
  document.querySelector("[data-search-genres]"),
  "All Genres"
);
renderDropdownOptions(
  authors,
  document.querySelector("[data-search-authors]"),
  "All Authors"
);

const prefersDark =
  window.matchMedia &&
  window.matchMedia("(prefers-color-scheme: dark)").matches;
applyTheme(prefersDark ? "night" : "day");

// Update the 'Show more' button text
const updateShowMoreButton = () => {
  const remaining = Math.max(matches.length - page * BOOKS_PER_PAGE, 0);
  document.querySelector("[data-list-button]").innerHTML = `
        <span>Show more</span>
        <span class="list__remaining">(${remaining})</span>`;
  document.querySelector("[data-list-button]").disabled = remaining <= 0;
};
updateShowMoreButton();

/** ========== Event Handlers ========== */

document.querySelector("[data-list-button]").addEventListener("click", () => {
  const nextBooks = matches.slice(
    page * BOOKS_PER_PAGE,
    (page + 1) * BOOKS_PER_PAGE
  );
  renderBooks(nextBooks);
  page += 1;
  updateShowMoreButton();
});

document.querySelector("[data-list-close]").addEventListener("click", () => {
  document.querySelector("[data-list-active]").open = false;
});

document.querySelector("[data-search-cancel]").addEventListener("click", () => {
  document.querySelector("[data-search-overlay]").open = false;
});

document.querySelector("[data-header-search]").addEventListener("click", () => {
  document.querySelector("[data-search-overlay]").open = true;
  document.querySelector("[data-search-title]").focus();
});

document
  .querySelector("[data-settings-cancel]")
  .addEventListener("click", () => {
    document.querySelector("[data-settings-overlay]").open = false;
  });

document
  .querySelector("[data-settings-form]")
  .addEventListener("submit", (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    applyTheme(formData.get("theme"));
    document.querySelector("[data-settings-overlay]").open = false;
  });

document
  .querySelector("[data-search-form]")
  .addEventListener("submit", (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const filters = Object.fromEntries(formData);

    matches = books.filter((book) => {
      const genreMatch =
        filters.genre === "any" || book.genres.includes(filters.genre);
      const titleMatch =
        filters.title.trim() === "" ||
        book.title.toLowerCase().includes(filters.title.toLowerCase());
      const authorMatch =
        filters.author === "any" || book.author === filters.author;
      return genreMatch && titleMatch && authorMatch;
    });

    page = 1;
    document.querySelector("[data-list-items]").innerHTML = "";
    if (matches.length > 0) {
      renderBooks(matches.slice(0, BOOKS_PER_PAGE));
      document
        .querySelector("[data-list-message]")
        .classList.remove("list__message_show");
    } else {
      document
        .querySelector("[data-list-message]")
        .classList.add("list__message_show");
    }
    updateShowMoreButton();
    document.querySelector("[data-search-overlay]").open = false;
  });

document
  .querySelector("[data-list-items]")
  .addEventListener("click", (event) => {
    const pathArray = Array.from(event.composedPath());
    const previewElement = pathArray.find((node) => node?.dataset?.preview);

    if (previewElement) {
      const activeBook = books.find(
        (book) => book.id === previewElement.dataset.preview
      );
      if (activeBook) {
        document.querySelector("[data-list-active]").open = true;
        document.querySelector("[data-list-blur]").src = activeBook.image;
        document.querySelector("[data-list-image]").src = activeBook.image;
        document.querySelector("[data-list-title]").innerText =
          activeBook.title;
        document.querySelector("[data-list-subtitle]").innerText = `${
          authors[activeBook.author]
        } (${new Date(activeBook.published).getFullYear()})`;
        document.querySelector("[data-list-description]").innerText =
          activeBook.description;
      }
    }
  });
