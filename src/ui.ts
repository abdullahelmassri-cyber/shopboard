import type { CartLine, Product, SortOption } from "./types";

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
          <h3>${product.name}</h3>
          <p class="category">${product.category}</p>
          <p class="price">$${product.price}</p>
          <button type="button" data-id="${product.id}">Add to cart</button>
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

// Called ONCE at startup. The listeners live here, never inside a render function.
export function bindEvents(handlers: Handlers): void {
  searchInput.addEventListener("input", () => handlers.onSearch(searchInput.value));
  categorySelect.addEventListener("change", () => handlers.onCategory(categorySelect.value));
  sortSelect.addEventListener("change", () => handlers.onSort(sortSelect.value as SortOption));

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
}
