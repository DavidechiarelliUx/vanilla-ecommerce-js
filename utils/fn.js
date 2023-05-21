import {
  cartItems,
  cartEl,
  rootEl,
  productList,
  productListTitle,
  productListData,
  heroEl,
  navbarEl,
  searchProductEl,
  footerEl,
  containerEl,
  filtersectionEl,
  filterButtonsContainer,
} from "../script.js";

import { usersList } from "./credentials.js";

export const cE = (el) => document.createElement(el);

export const qS = (el) => document.querySelector(el);

export const qSA = (els) => document.querySelectorAll(els);

export const formatDescriptionText = (str) =>
  str.split(" ").splice(0, 5).join(" ") + " ...";

// Sezione singolo prodotto (card)
export const createProduct = (data) => {
  const wrapperEl = cE("div");
  const textWrapperEl = cE("div");
  const imageEl = cE("img");
  const titleEl = cE("h3");
  const descriptionEl = cE("p");
  const ratingEl = cE("p");
  const priceEl = cE("h4");
  const buttonEl = cE("button");

  wrapperEl.className = "productCard";
  wrapperEl.setAttribute("id", data.id);
  textWrapperEl.className = "productCard__text";
  imageEl.src = data.thumbnail;
  imageEl.alt = data.title;
  titleEl.textContent = data.title;
  descriptionEl.textContent = formatDescriptionText(data.description);
  ratingEl.textContent = data.rating;
  priceEl.textContent = data.price + " $";
  // buttonEl.textContent = "Add to Cart";

  textWrapperEl.append(titleEl, descriptionEl, ratingEl, priceEl); //buttonEl);

  wrapperEl.append(imageEl, textWrapperEl);

  return wrapperEl;
};

// Sezione singolo prodotto (modale)
export const createProductModal = (productData, parent = null) => {
  const wrapperEl = cE("div");
  const overlayEl = cE("div");
  const galleryEl = cE("div");
  const mainImgEl = cE("img");

  const textEl = cE("div");
  const mainTextEl = cE("div");
  const mainTextTitleEl = cE("h1");
  const mainTextDescEl = cE("p");
  const mainTextRateEl = cE("p");
  const buyTextEl = cE("div");
  const buyTextFirstBtnEl = cE("button");
  const buyTextSecondBtnEl = cE("button");

  wrapperEl.className = "modalProduct";
  overlayEl.className = "modalOverlay";
  galleryEl.className = "modalProduct__gallery";
  mainImgEl.src = productData.thumbnail;
  mainImgEl.alt = productData.title;

  textEl.className = "modalProduct__text";
  mainTextEl.className = "modalMainText";
  mainTextTitleEl.textContent = productData.title;
  mainTextDescEl.textContent = productData.description;
  mainTextRateEl.textContent = productData.rating;

  buyTextEl.className = "modalMainBuy";
  buyTextFirstBtnEl.textContent = "Compra adesso";
  buyTextSecondBtnEl.textContent = "Torna indietro";

  mainTextEl.append(mainTextTitleEl, mainTextDescEl, mainTextRateEl);
  buyTextEl.append(buyTextFirstBtnEl, buyTextSecondBtnEl);
  galleryEl.append(mainImgEl);
  textEl.append(mainTextEl, buyTextEl);
  wrapperEl.append(overlayEl, galleryEl, textEl);

  if (parent) {
    overlayEl.addEventListener("click", () => parent.removeChild(wrapperEl));
    buyTextSecondBtnEl.addEventListener("click", () =>
      parent.removeChild(wrapperEl)
    );

    buyTextFirstBtnEl.addEventListener("click", () => {
      alert("HAI AGGIUNTO UN PRODOTTO AL CARRELLO");
      cartItems.push(productData);
      if (cartItems.length >= 1) {
        cartEl.classList.add("itemsInCart");
      }
    });
  }

  return wrapperEl;
};

// carrello

export const createCartModal = (cartItems) => {
  const wrapperEl = cE("div");
  const totalItemsEl = cE("h2");
  const priceEl = cE("h2");
  const cartItemsEl = cE("div");

  wrapperEl.className = "cartModal";
  cartItemsEl.className = "cartItems";

  totalItemsEl.textContent = `Prodotti che hai aggiunto nel carrello: ${cartItems.length}`;
  totalItemsEl.classList.add("total-items");

  priceEl.textContent = `Il Totale: ${cartItems.reduce(
    (acc, item) => acc + item.price,
    0
  )} €`;
  priceEl.classList.add("total-price");

  cartItems.forEach((item) => {
    const cartItemEl = cE("div");
    cartItemEl.className = "cartItem";

    const imgEl = cE("img");
    const titleEl = cE("h4");
    const descriptionEl = cE("p");

    imgEl.src = item.thumbnail;
    titleEl.textContent = item.title;
    descriptionEl.textContent = item.description;

    cartItemEl.append(imgEl, titleEl, descriptionEl);
    cartItemsEl.append(cartItemEl);
  });

  wrapperEl.append(totalItemsEl, priceEl, cartItemsEl);

  cartItemsEl.addEventListener("scroll", () => {
    if (cartItemsEl.scrollTop > 0) {
      cartItemsEl.classList.add("scrolling");
    } else {
      cartItemsEl.classList.remove("scrolling");
    }
  });

  return wrapperEl;
};

// Login
export const createLogIn = () => {
  const wrapperEl = cE("form");
  const usernameInputEl = cE("input");
  const passwordInputEl = cE("input");
  const submitBtnEl = cE("input");

  wrapperEl.className = "login";
  usernameInputEl.type = "text";
  usernameInputEl.placeholder = "Username";
  passwordInputEl.type = "password";
  passwordInputEl.placeholder = "Password";
  submitBtnEl.type = "submit";

  wrapperEl.addEventListener("submit", (event) => {
    event.preventDefault();

    const isAuth = !!usersList.find(
      (user) =>
        user.username === event.srcElement[0].value &&
        user.password === event.srcElement[1].value
    );

    if (isAuth) {
      navbarEl.style.display = "flex";
      heroEl.style.display = "flex";
      productList.style.display = "flex";
      footerEl.style.display = "block";
      containerEl.style.display = "block";
      filtersectionEl.style.display = "flex";
      filterButtonsContainer.style.display = "block";

      rootEl.append(productListTitle, productList);
      rootEl.removeChild(wrapperEl);
    } else {
      alert("Username e/o password non corretta");
    }
  });

  wrapperEl.append(usernameInputEl, passwordInputEl, submitBtnEl);
  return wrapperEl;
};
