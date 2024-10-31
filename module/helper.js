/**
 * Creates and returns an option element.
 * @param {string} value - The option value.
 * @param {string} text - The text content for the option.
 * @returns {HTMLElement} The created option element.
 */
export const createOption = (value, text) => {
  const element = document.createElement("option");
  element.value = value;
  element.innerText = text;
  return element;
};

/**
 * Renders a list of books on the page.
 * @param {Array} bookList - List of books to render.
 */
export const renderBooks = (bookList) => {
  const fragment = document.createDocumentFragment();
  for (const book of bookList) {
    const element = document.createElement("button");
    element.classList = "preview";
    element.setAttribute("data-preview", book.id);

    element.innerHTML = `
          <img class="preview__image" src="${book.image}" />
          <div class="preview__info">
              <h3 class="preview__title">${book.title}</h3>
              <div class="preview__author">${book.getAuthorName()}</div>
          </div>`;

    fragment.appendChild(element);
  }
  document.querySelector("[data-list-items]").appendChild(fragment);
};

/**
 * Renders options in a select dropdown.
 * @param {Object} data - Object containing key-value pairs (id, name).
 * @param {HTMLElement} dropdown - Target select element.
 * @param {string} defaultText - Text for the default option.
 */
export const renderDropdownOptions = (data, dropdown, defaultText) => {
  dropdown.appendChild(createOption("any", defaultText));
  for (const [id, name] of Object.entries(data)) {
    dropdown.appendChild(createOption(id, name));
  }
};

/**
 * Updates the theme based on user settings.
 * @param {string} theme - 'day' or 'night'.
 */
export const applyTheme = (theme) => {
  const darkColor = theme === "night" ? "255, 255, 255" : "10, 10, 20";
  const lightColor = theme === "day" ? "255, 255, 255" : "10, 10, 20";

  document.documentElement.style.setProperty("--color-dark", darkColor);
  document.documentElement.style.setProperty("--color-light", lightColor);
  document.querySelector("[data-settings-theme]").value = theme;
};
