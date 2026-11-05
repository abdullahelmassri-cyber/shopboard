import { getElement } from "../../shared/dom.ui";
import type { CartAction, CartLine } from "./cart.types";

type CartHandlers = {
  onCartAction: (action: CartAction, productId: number) => void;
  onClear: () => void;
};

const cartCount = getElement<HTMLSpanElement>("#cart-count");
const cartItems = getElement<HTMLDivElement>("#cart-items");
const cartTotal = getElement<HTMLSpanElement>("#cart-total");
const clearCartButton = getElement<HTMLButtonElement>("#clear-cart");

function isCartAction(value: string | undefined): value is CartAction {
  return value === "increase" || value === "decrease" || value === "remove";
}

export function renderCart(lines: readonly CartLine[], count: number, total: number): void {
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

export function bindCartEvents(handlers: CartHandlers): void {
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
}
