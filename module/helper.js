import { books, authors, genres, BOOKS_PER_PAGE } from "../data.js";

export const createOption = (value, text) => {
  const element = document.createElement("option");
  element.value = value;
  element.innerText = text;
  return element;
};
export const renderBooks = (bookList) => {
  const fragment = document.createDocumentFragment();
  for (const { author, id, image, title } of bookList) {
    const element = document.createElement("button");
    element.classList = "preview";
    element.setAttribute("data-preview", id);

    element.innerHTML = `
              <img class="preview__image" src="${image}" />
              <div class="preview__info">
                  <h3 class="preview__title">${title}</h3>
                  <div class="preview__author">${authors[author]}</div>
              </div>`;

    fragment.appendChild(element);
  }
  document.querySelector("[data-list-items]").appendChild(fragment);
};

export const renderDropdownOptions = (data, dropdown, defaultText) => {
  dropdown.appendChild(createOption("any", defaultText));
  for (const [id, name] of Object.entries(data)) {
    dropdown.appendChild(createOption(id, name));
  }
};

export const applyTheme = (theme) => {
  const darkColor = theme === "night" ? "255, 255, 255" : "10, 10, 20";
  const lightColor = theme === "day" ? "255, 255, 255" : "10, 10, 20";

  document.documentElement.style.setProperty("--color-dark", darkColor);
  document.documentElement.style.setProperty("--color-light", lightColor);
  document.querySelector("[data-settings-theme]").value = theme;
};
