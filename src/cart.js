import { products } from "./products.js";

const CART_KEY = "shopboard-cart";

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
  try {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
  } catch {
    // storage may be full or blocked; the cart still works until refresh
  }
}

function getProduct(id) {
  return products.find((product) => product.id === id);
}

export function addToCart(id) {
  const existing = cart.find((item) => item.id === id);
  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ id, quantity: 1 });
  }
  saveCart();
}

export function changeQuantity(id, change) {
  const item = cart.find((line) => line.id === id);
  if (!item) return;
  item.quantity += change;
  if (item.quantity <= 0) {
    cart = cart.filter((line) => line.id !== id);
  }
  saveCart();
}

export function removeFromCart(id) {
  cart = cart.filter((item) => item.id !== id);
  saveCart();
}

export function clearCart() {
  cart = [];
  saveCart();
}

export function getCartLines() {
  return cart.map((item) => {
    const product = getProduct(item.id);
    return {
      id: item.id,
      name: product.name,
      price: product.price,
      quantity: item.quantity,
      lineTotal: product.price * item.quantity,
    };
  });
}

export function getCartCount() {
  return cart.reduce((sum, item) => sum + item.quantity, 0);
}

export function getCartTotal() {
  return cart.reduce((sum, item) => sum + getProduct(item.id).price * item.quantity, 0);
}
