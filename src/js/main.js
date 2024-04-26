const URL_BOOKS = "https://potterapi-fedeperin.vercel.app/es/books";

async function getBooks() {
  const response = await fetch(URL_BOOKS);
  const data = await response.json();
  return data;
}

function setLocalStorage(key, quantity) {
  if (window.localStorage) {
    localStorage.setItem(key, quantity);
  } else {
    console.log("LocalStorage is not available");
  }
}

function getLocalStorage(key) {
  if (window.localStorage) {
    return localStorage.getItem(key);
  } else {
    console.log("LocalStorage is not available");
  }
}

document.addEventListener("DOMContentLoaded", async function () {
  const ICON_SHOPPING = document.getElementById("shopping_cart");
  ICON_SHOPPING.setAttribute(
    "data-badge",
    getLocalStorage("app_books_quantity") || 0
  );
  const LIST_BOOKS = JSON.parse(getLocalStorage("app_books_quantity")) || [];
  const PAGE_CONTENT = document.querySelector(".page-content");
  const books = await getBooks();
  let htmlString = "";
  books.forEach((book) => {
    const bookElement = `
        <div class="demo-card-wide mdl-card mdl-shadow--2dp">
    <div class="mdl-card__title" style="background: url('${
      book.cover
    }') center / cover"> 
        <h2 class="mdl-card__title-text" data-title="${
          book.title
        }" data-description="${book.description}">${book.title}</h2>
        </div>
        <div class="mdl-card__supporting-text">
            ${book.description.substring(0, 100)}...
        </div>
        <div class="mdl-card__actions mdl-card--border">
            <a class="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect">
            Comprar este libro ${book.releaseDate}
            </a>
        </div>
        <div class="mdl-card__menu">
            <button class="mdl-button mdl-button--icon mdl-js-button mdl-js-ripple-effect" id="share_button">
            <i class="material-icons">share</i>
            </button>
        </div>
        </div>
        `;
    htmlString += bookElement;
  });
  PAGE_CONTENT.innerHTML = htmlString;
  const buttons = document.querySelectorAll(".mdl-button--colored");
  buttons.forEach((button) => {
    const title = button.parentElement.parentElement
      .querySelector(".mdl-card__title-text")
      .getAttribute("data-title");
    const description = button.parentElement.parentElement
      .querySelector(".mdl-card__title-text")
      .getAttribute("data-description");
    button.addEventListener("click", () => {
      const quantity = +ICON_SHOPPING.getAttribute("data-badge") || 0;
      ICON_SHOPPING.setAttribute("data-badge", quantity + 1);
      setLocalStorage("app_books_quantity", quantity + 1);
      const bookObject = {
        title: title,
        description: description,
        date: new Date().getTime(),
      };
      LIST_BOOKS.push(bookObject);
      setLocalStorage("app_books_details", JSON.stringify(LIST_BOOKS));
    });
    /* const buttons_share = document.querySelectorAll("share_button");
    console.log(buttons_share)
    buttons_share.forEach((share_button)=>{
        share_button.addEventListener("click",()=>{
            console.log(share_button)
        })
    }) */
  });
});
