import { authors } from "../data";
/**
 *
 * @param {string} tag
 * @param {object} attributes
 * @param {string} innerHTML
 * @returns {HTMLElement}
 */
export function createHTMLElement(tag, attributes = {}, innerHTML = "") {
  const newElement = document.createElement(tag);
  Object.entries(attributes).forEach(([key, value]) =>
    newElement.setAttribute(key, value)
  );
  if (innerHTML) {
    newElement.innerHTML = innerHTML;
  }
  return newElement;
}

export function renderPrevew() {
  const previewList = document.createDocumentFragment();

  for (const { author, id, image, title } of matches.slice(0, BOOKS_PER_PAGE)) {
    const element = createHTMLElement(
      "button",
      {
        class: "preview",
        "data-preview": id,
      },
      `
    <img class="preview__image" src="${image}" />
    <div class="preview__info">
        <h3 class="preview__title">${title}</h3>
        <div class="preview__author">${authors[author]}</div>
    </div>
`
    );
    previewList.appendChild(element);
  }

  document.querySelector("[data-list-items]").appendChild(previewList);
}
