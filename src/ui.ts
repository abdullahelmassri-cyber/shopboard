import type { CartLine, Product, SortOption } from "./types";

const TOAST_DURATION_MS = 4000;

function getElement<T extends HTMLElement>(selector: string): T {
  const element = document.querySelector<T>(selector);
  if (!element) throw new Error(`Missing element: ${selector}`);
  return element;
}

const grid = getElement<HTMLDivElement>("#product-grid");
const searchInput = getElement<HTMLInputElement>("#search");
const categorySelect = getElement<HTMLSelectElement>("#category");
const sortSelect = getElement<HTMLSelectElement>("#sort");
const cartCount = getElement<HTMLSpanElement>("#cart-count");
const cartItems = getElement<HTMLDivElement>("#cart-items");
const cartTotal = getElement<HTMLSpanElement>("#cart-total");
const clearCartButton = getElement<HTMLButtonElement>("#clear-cart");
const signupForm = getElement<HTMLFormElement>(".form");
const toastContainer = getElement<HTMLDivElement>("#toasts");

type CartAction = "increase" | "decrease" | "remove";
type ToastType = "success" | "error";

type Handlers = {
  onSearch: (value: string) => void;
  onCategory: (value: string) => void;
  onSort: (value: SortOption) => void;
  onAdd: (id: number) => void;
  onCartAction: (action: CartAction, id: number) => void;
  onClear: () => void;
};

function isSortOption(value: string): value is SortOption {
  return value === "default" || value === "asc" || value === "desc";
}

function isCartAction(value: string | undefined): value is CartAction {
  return value === "increase" || value === "decrease" || value === "remove";
}

export function showToast(message: string, type: ToastType = "success"): void {
  const toast = document.createElement("div");
  toast.className = `toast toast--${type}`;
  toast.textContent = message;
  toastContainer.append(toast);

  window.setTimeout(() => toast.remove(), TOAST_DURATION_MS);
}

export function renderCategoryOptions(categories: string[]): void {
  categorySelect.innerHTML = [
    `<option value="all">All categories</option>`,
    ...categories.map((category) => `<option value="${category}">${category}</option>`),
  ].join("");
}

export function renderProducts(list: Product[]): void {
  grid.innerHTML = list
    .map(
      (product) => `
        <article class="card">
          <img class="product-image" src="${product.image}" alt="${product.name}" loading="lazy" />
          <div class="product-details">
            <p class="category">${product.category}</p>
            <h3>${product.name}</h3>
            <div class="product-purchase">
              <p class="price">$${product.price}</p>
              <button type="button" data-id="${product.id}">Add to cart</button>
            </div>
          </div>
        </article>`,
    )
    .join("");
}

export function renderCart(lines: CartLine[], count: number, total: number): void {
  if (lines.length === 0) {
    cartItems.innerHTML = `<p>Your cart is empty.</p>`;
  } else {
    cartItems.innerHTML = `<ul class="cart-list">${lines
      .map(
        (line) => `
          <li class="cart-item">
            <span class="cart-item-name">${line.name}</span>
            <span>$${line.price} each</span>
            <span class="cart-qty">
              <button type="button" data-action="decrease" data-id="${line.id}" aria-label="Decrease quantity of ${line.name}">−</button>
              <span>${line.quantity}</span>
              <button type="button" data-action="increase" data-id="${line.id}" aria-label="Increase quantity of ${line.name}">+</button>
            </span>
            <span>$${line.lineTotal}</span>
            <button type="button" data-action="remove" data-id="${line.id}" aria-label="Remove ${line.name} from cart">Remove</button>
          </li>`,
      )
      .join("")}</ul>`;
  }
  cartCount.textContent = String(count);
  cartTotal.textContent = String(total);
  clearCartButton.disabled = lines.length === 0;
}

async function submitSignup(): Promise<void> {
  try {
    // Simulate the unimplemented signup API returning an HTTP 500 response.
    const response = await Promise.resolve({ ok: false, status: 500 });
    if (!response.ok) throw new Error(`Request failed with status ${response.status}`);
    showToast("Account created successfully.");
  } catch (error) {
    const message = error instanceof Error ? error.message : "Signup request failed.";
    showToast(message, "error");
  }
}

export function bindEvents(handlers: Handlers): void {
  searchInput.addEventListener("input", () => handlers.onSearch(searchInput.value));
  categorySelect.addEventListener("change", () => handlers.onCategory(categorySelect.value));
  sortSelect.addEventListener("change", () => {
    const value = sortSelect.value;
    if (isSortOption(value)) handlers.onSort(value);
  });
  grid.addEventListener("click", (event) => {
    if (!(event.target instanceof Element)) return;
    const button = event.target.closest<HTMLButtonElement>("[data-id]");
    if (!button) return;
    const productId = Number(button.dataset.id);
    if (Number.isInteger(productId)) handlers.onAdd(productId);
  });

  cartItems.addEventListener("click", (event) => {
    if (!(event.target instanceof Element)) return;
    const button = event.target.closest<HTMLButtonElement>("button[data-action]");
    if (!button) return;
    const action = button.dataset.action;
    const productId = Number(button.dataset.id);
    if (isCartAction(action) && Number.isInteger(productId)) {
      handlers.onCartAction(action, productId);
    }
  });

  clearCartButton.addEventListener("click", handlers.onClear);
  signupForm.addEventListener("submit", (event) => {
    event.preventDefault();
    void submitSignup();
  });
}
