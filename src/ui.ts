import type { CartLine, Product, SortOption } from "./types";
import { isSortOption } from "./types";
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
const signupStatus = getElement<HTMLParagraphElement>("#signup-status");

type Handlers = {
  onSearch: (value: string) => void;
  onCategory: (value: string) => void;
  onSort: (value: SortOption) => void;
  onAdd: (id: number) => void;
  onCartAction: (action: string, id: number) => void;
  onClear: () => void;
};

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

export function bindEvents(handlers: Handlers): void {
  searchInput.addEventListener("input", () => handlers.onSearch(searchInput.value));
  categorySelect.addEventListener("change", () => handlers.onCategory(categorySelect.value));
  sortSelect.addEventListener("change", () => {
    const value = sortSelect.value;
    if (isSortOption(value)) handlers.onSort(value);
  });
  grid.addEventListener("click", (event) => {
    if (!(event.target instanceof Element)) return;
    const button = event.target.closest<HTMLButtonElement>("button[data-id]");
    if (!button) return;
    handlers.onAdd(Number(button.dataset.id));
  });

  cartItems.addEventListener("click", (event) => {
    if (!(event.target instanceof Element)) return;
    const button = event.target.closest<HTMLButtonElement>("button[data-action]");
    if (!button) return;
    handlers.onCartAction(String(button.dataset.action), Number(button.dataset.id));
  });

  clearCartButton.addEventListener("click", handlers.onClear);
  signupForm.addEventListener("submit", (event) => {
    event.preventDefault();
    signupStatus.hidden = false;
  });
}
