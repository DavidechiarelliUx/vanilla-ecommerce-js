import {
  cE,
  qS,
  qSA,
  createProduct,
  createProductModal,
  createCartModal,
  createLogIn,
} from "./utils/fn.js";

export const rootEl = qS("#root");
export const productList = cE("div");
export const productListTitle = cE("h2");
export const searchProductEl = qS(".searchInput");
export const cartEl = qS(".cart");
export let productListData = [];
export let cartItems = [];
export const heroEl = qS(".hero");
export const navbarEl = qS(".navbar");
export const footerEl = qS (".footer");
export const containerEl = qS (".container");
export const filtersectionEl = qS (".filter-section")
export const productEl= qS (".product")
export const filterButtonsContainer = cE("div");
productList.className = "productList";
navbarEl.style.display = "none";
heroEl.style.display = "none";
footerEl.style.display = "none";
containerEl.style.display = "none";
filtersectionEl.style.display = "none";
productList.style.display="none";
filterButtonsContainer.style.display="none";



rootEl.append(createLogIn());

rootEl.append(productListTitle, filterButtonsContainer, productList);

// pulsanti categorie


function createFilterButtons() {
  const categories = [
    "All",
    "smartphones",
    "laptops",
    "fragrances",
    "skincare",
    "groceries",
    "home-decoration",
  ] ;

  categories.forEach((category) => {
const categoryButton = cE("button");
    categoryButton.textContent = category;
    categoryButton.classList.add(category.class);
    categoryButton.className = "categoryButton";
    categoryButton.addEventListener("click", () => {
      filterProducts(category);
    });
    filterButtonsContainer.appendChild(categoryButton);
  });
}
function filterProducts(category) {
  productList.textContent = "";

  if (category === "All") {
    productListData.forEach((obj) => {
      const product = createProduct(obj, rootEl);
      productList.appendChild(product);
    });
  } else {
    productListData
      .filter((product) => product.category === category)
      .forEach((obj) => {
        const product = createProduct(obj, rootEl);
        productList.appendChild(product);
      });
  }


  //  product card 
 const productCardEls = qSA(".productCard");
 
  productCardEls.forEach((product) =>
    product.addEventListener("click", () =>
      fetch(`https://dummyjson.com/products/${product.id}`)
        .then((res) => res.json())
        .then((data) => rootEl.appendChild(createProductModal(data, rootEl)))
    )
  );
}

fetch("https://dummyjson.com/products")
  .then((res) => res.json())
  .then((data) => {
    productListData = data.products;
    productListData.forEach((product) =>
      productList.append(createProduct(product))
    );
    createFilterButtons();
  })
  .then(() => {
    const productCardEls = qSA(".productCard");

    productCardEls.forEach((product) =>
      product.addEventListener("click", () =>
        fetch(`https://dummyjson.com/products/${product.id}`)
          .then((res) => res.json())
          .then((data) => rootEl.append(createProductModal(data, rootEl)))
      )
    );
  });

  // search product
searchProductEl.addEventListener("input", (evt) => {
  productList.textContent = "";

  productListData
    .filter((product) =>
      product.description.toLowerCase().includes(evt.target.value.toLowerCase())
    )
    .forEach((obj) => productList.append(createProduct(obj)));
});

// eventi carrello.

cartEl.addEventListener("click", () => {
  rootEl.append(createCartModal(cartItems));
  const cartModal = qS(".cartModal");
  cartEl.disabled = true;
  cartModal.classList.add("cartModal__active");

  const closeBtn = cE("button");
  closeBtn.textContent = "X";
  closeBtn.className = "cartModal__X";
  cartModal.appendChild(closeBtn);

  closeBtn.addEventListener("click", () => {
    cartModal.parentNode.removeChild(cartModal);
    cartEl.disabled = false;
  });
});
