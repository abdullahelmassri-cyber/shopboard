import "./style.css";
import { products } from "./products.js";

const grid = document.querySelector("#product-grid");
const searchInput = document.querySelector("#search");

const state = {
  search: "",
};

function renderProducts(list) {
  grid.innerHTML = list
    .map(
      (product) => `
        <article class="card">
          <h3>${product.name}</h3>
          <p class="category">${product.category}</p>
          <p class="price">$${product.price}</p>
          <button type="button" data-id="${product.id}">Add to cart</button>
        </article>`,
    )
    .join("");
}

function getVisibleProducts() {
  const query = state.search.trim().toLowerCase();
  return products.filter((product) => product.name.toLowerCase().includes(query));
}

function render() {
  renderProducts(getVisibleProducts());
}

searchInput.addEventListener("input", (event) => {
  state.search = event.target.value;
  render();
});

render();
