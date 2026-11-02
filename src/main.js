import "./style.css";
import { products } from "./products.js";

const grid = document.querySelector("#product-grid");
const searchInput = document.querySelector("#search");
const categorySelect = document.querySelector("#category");
const sortSelect = document.querySelector("#sort");

const state = {
  search: "",
  category: "all",
  sort: "default",
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

  // filter() returns a NEW array, so `products` is never changed
  const result = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(query);
    const matchesCategory = state.category === "all" || product.category === state.category;
    return matchesSearch && matchesCategory;
  });

  // sort() changes the array it is called on. That is safe here because
  // `result` is our own copy. "default" skips the sort, so the original order stays.
  if (state.sort === "asc") {
    result.sort((a, b) => a.price - b.price);
  } else if (state.sort === "desc") {
    result.sort((a, b) => b.price - a.price);
  }

  return result;
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

sortSelect.addEventListener("change", (event) => {
  state.sort = event.target.value;
  render();
});

renderCategoryOptions();
render();
