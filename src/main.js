import "./style.css";
import { products } from "./products.js";

const CART_KEY = "shopboard-cart";

const grid = document.querySelector("#product-grid");
const searchInput = document.querySelector("#search");
const categorySelect = document.querySelector("#category");
const sortSelect = document.querySelector("#sort");
const cartCount = document.querySelector("#cart-count");

const state = {
  search: "",
  category: "all",
  sort: "default",
};

function loadCart() {
  try {
    const saved = JSON.parse(localStorage.getItem(CART_KEY));
    if (!Array.isArray(saved)) return [];
    return saved.filter(
      (item) =>
        products.some((product) => product.id === item.id) &&
        Number.isInteger(item.quantity) &&
        item.quantity > 0,
    );
  } catch {
    return [];
  }
}

const cart = loadCart();

function saveCart() {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
}

function addToCart(id) {
  const existing = cart.find((item) => item.id === id);
  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ id, quantity: 1 });
  }
  saveCart();
  renderCartCount();
}

function getCartCount() {
  return cart.reduce((sum, item) => sum + item.quantity, 0);
}

function renderCartCount() {
  cartCount.textContent = getCartCount();
}

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

  const result = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(query);
    const matchesCategory = state.category === "all" || product.category === state.category;
    return matchesSearch && matchesCategory;
  });

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

grid.addEventListener("click", (event) => {
  const button = event.target.closest("button[data-id]");
  if (!button) return;
  addToCart(Number(button.dataset.id));
});

renderCategoryOptions();
render();
renderCartCount();
