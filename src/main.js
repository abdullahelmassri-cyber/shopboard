import "./style.css";
import { products } from "./products.js";

const CART_KEY = "shopboard-cart";

const grid = document.querySelector("#product-grid");
const searchInput = document.querySelector("#search");
const categorySelect = document.querySelector("#category");
const sortSelect = document.querySelector("#sort");
const cartCount = document.querySelector("#cart-count");
const cartItems = document.querySelector("#cart-items");
const cartTotal = document.querySelector("#cart-total");
const clearCartButton = document.querySelector("#clear-cart");

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

let cart = loadCart();

function saveCart() {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
}

function getProduct(id) {
  return products.find((product) => product.id === id);
}

function getCartCount() {
  return cart.reduce((sum, item) => sum + item.quantity, 0);
}

function getCartTotal() {
  return cart.reduce((sum, item) => sum + getProduct(item.id).price * item.quantity, 0);
}

function addToCart(id) {
  const existing = cart.find((item) => item.id === id);
  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ id, quantity: 1 });
  }
  updateCart();
}

function changeQuantity(id, change) {
  const item = cart.find((line) => line.id === id);
  if (!item) return;
  item.quantity += change;
  if (item.quantity <= 0) {
    cart = cart.filter((line) => line.id !== id);
  }
  updateCart();
}

function removeFromCart(id) {
  cart = cart.filter((item) => item.id !== id);
  updateCart();
}

function clearCart() {
  cart = [];
  updateCart();
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

function renderCart() {
  if (cart.length === 0) {
    cartItems.innerHTML = `<p>Your cart is empty.</p>`;
  } else {
    cartItems.innerHTML = `<ul class="cart-list">${cart
      .map((item) => {
        const product = getProduct(item.id);
        return `
          <li class="cart-item">
            <span class="cart-item-name">${product.name}</span>
            <span>$${product.price} each</span>
            <span class="cart-qty">
              <button type="button" data-action="decrease" data-id="${item.id}" aria-label="Decrease quantity of ${product.name}">−</button>
              <span>${item.quantity}</span>
              <button type="button" data-action="increase" data-id="${item.id}" aria-label="Increase quantity of ${product.name}">+</button>
            </span>
            <span>$${product.price * item.quantity}</span>
            <button type="button" data-action="remove" data-id="${item.id}" aria-label="Remove ${product.name} from cart">Remove</button>
          </li>`;
      })
      .join("")}</ul>`;
  }
  cartTotal.textContent = getCartTotal();
  clearCartButton.disabled = cart.length === 0;
}

function renderCartCount() {
  cartCount.textContent = getCartCount();
}

function updateCart() {
  saveCart();
  renderCartCount();
  renderCart();
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

cartItems.addEventListener("click", (event) => {
  const button = event.target.closest("button[data-action]");
  if (!button) return;
  const id = Number(button.dataset.id);
  const action = button.dataset.action;

  if (action === "increase") changeQuantity(id, 1);
  if (action === "decrease") changeQuantity(id, -1);
  if (action === "remove") removeFromCart(id);
});

clearCartButton.addEventListener("click", clearCart);

renderCategoryOptions();
render();
updateCart();
