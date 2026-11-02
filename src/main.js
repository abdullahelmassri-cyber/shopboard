import "./style.css";
import { products } from "./products.js";

const grid = document.querySelector("#product-grid");
const searchInput = document.querySelector("#search");
const categorySelect = document.querySelector("#category");

const state = {
  search: "",
  category: "all",
};

function renderCategoryOptions() {
  const categories = [...new Set(products.map((product) => product.category))];
  categorySelect.innerHTML = [
    `<option value="all">All categories</option>`,
    ...categories.map((category) => `<option value="${category}">${category}</option>`),
  ].join("");
}

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
  return products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(query);
    const matchesCategory = state.category === "all" || product.category === state.category;
    return matchesSearch && matchesCategory;
  });
}

function render() {
  renderProducts(getVisibleProducts());
}

searchInput.addEventListener("input", (event) => {
  state.search = event.target.value;
  render();
});

categorySelect.addEventListener("change", (event) => {
  state.category = event.target.value;
  render();
});

renderCategoryOptions();
render();
