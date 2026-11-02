const grid = document.querySelector("#product-grid");
const searchInput = document.querySelector("#search");
const categorySelect = document.querySelector("#category");
const sortSelect = document.querySelector("#sort");
const cartCount = document.querySelector("#cart-count");
const cartItems = document.querySelector("#cart-items");
const cartTotal = document.querySelector("#cart-total");
const clearCartButton = document.querySelector("#clear-cart");

export function renderCategoryOptions(categories) {
  categorySelect.innerHTML = [
    `<option value="all">All categories</option>`,
    ...categories.map((category) => `<option value="${category}">${category}</option>`),
  ].join("");
}

export function renderProducts(list) {
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

export function renderCart(lines, count, total) {
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
  cartCount.textContent = count;
  cartTotal.textContent = total;
  clearCartButton.disabled = lines.length === 0;
}

// Called ONCE at startup. The listeners live here, never inside a render function.
export function bindEvents({ onSearch, onCategory, onSort, onAdd, onCartAction, onClear }) {
  searchInput.addEventListener("input", (event) => onSearch(event.target.value));
  categorySelect.addEventListener("change", (event) => onCategory(event.target.value));
  sortSelect.addEventListener("change", (event) => onSort(event.target.value));

  grid.addEventListener("click", (event) => {
    const button = event.target.closest("button[data-id]");
    if (!button) return;
    onAdd(Number(button.dataset.id));
  });

  cartItems.addEventListener("click", (event) => {
    const button = event.target.closest("button[data-action]");
    if (!button) return;
    onCartAction(button.dataset.action, Number(button.dataset.id));
  });

  clearCartButton.addEventListener("click", onClear);
}
