import { products } from "../products/products.data";
import {
  addProductToCart,
  buildCartLines,
  calculateCartTotal,
  changeCartQuantity,
  countCartItems,
  removeProductFromCart,
  validateCartData,
} from "./cart.logic";
import type { Cart, CartLine } from "./cart.types";

const CART_STORAGE_KEY = "shopboard-cart";
const EMPTY_CART: Cart = [];

function loadCartFromStorage(): Cart {
  try {
    const savedCart = localStorage.getItem(CART_STORAGE_KEY);
    if (savedCart === null) return EMPTY_CART;
    return validateCartData(JSON.parse(savedCart), products);
  } catch (error) {
    console.warn("Unable to load the saved cart; starting with an empty cart.", error);
    return EMPTY_CART;
  }
}

let cart: Cart = loadCartFromStorage();

function saveCart(): void {
  try {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
  } catch (error) {
    console.warn("Unable to save the cart; it will not persist after refresh.", error);
  }
}

export function addToCart(productId: number): void {
  cart = addProductToCart(cart, productId);
  saveCart();
}

export function changeQuantity(productId: number, change: number): void {
  const updatedCart = changeCartQuantity(cart, productId, change);
  if (updatedCart === cart) return;
  cart = updatedCart;
  saveCart();
}

export function removeFromCart(productId: number): void {
  cart = removeProductFromCart(cart, productId);
  saveCart();
}

export function clearCart(): void {
  cart = [];
  saveCart();
}

export function getCartLines(): CartLine[] {
  return buildCartLines(cart, products);
}

export function getCartCount(): number {
  return countCartItems(cart);
}

export function getCartTotal(): number {
  return calculateCartTotal(cart, products);
}
