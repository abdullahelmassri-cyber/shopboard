import { products } from "./products";
import type { Cart, CartItem, CartLine, Product } from "./types";

const CART_KEY = "shopboard-cart";

function isCartItem(value: unknown): value is CartItem {
  if (typeof value !== "object" || value === null) return false;
  if (!("id" in value) || !("quantity" in value)) return false;

  const { id, quantity } = value;
  if (typeof id !== "number" || typeof quantity !== "number") return false;

  return (
    products.some((product) => product.id === id) && Number.isInteger(quantity) && quantity > 0
  );
}

function loadCart(): Cart {
  try {
    const saved: unknown = JSON.parse(localStorage.getItem(CART_KEY) ?? "null");
    if (!Array.isArray(saved)) return [];
    return saved.filter(isCartItem);
  } catch {
    return [];
  }
}

let cart: Cart = loadCart();

function saveCart(): void {
  try {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
  } catch {
    // storage may be full or blocked; the cart still works until refresh
  }
}

function getProduct(id: number): Product {
  const product = products.find((item) => item.id === id);
  if (!product) throw new Error(`Unknown product id: ${id}`);
  return product;
}

export function addToCart(id: number): void {
  const existing = cart.find((item) => item.id === id);
  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ id, quantity: 1 });
  }
  saveCart();
}

export function changeQuantity(id: number, change: number): void {
  const item = cart.find((line) => line.id === id);
  if (!item) return;
  item.quantity += change;
  if (item.quantity <= 0) {
    cart = cart.filter((line) => line.id !== id);
  }
  saveCart();
}

export function removeFromCart(id: number): void {
  cart = cart.filter((item) => item.id !== id);
  saveCart();
}

export function clearCart(): void {
  cart = [];
  saveCart();
}

export function getCartLines(): CartLine[] {
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

export function getCartCount(): number {
  return cart.reduce((sum, item) => sum + item.quantity, 0);
}

export function getCartTotal(): number {
  return cart.reduce((sum, item) => sum + getProduct(item.id).price * item.quantity, 0);
}
