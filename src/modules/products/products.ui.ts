import { getElement } from "../../shared/dom.ui";
import { showToast } from "../../shared/toast.ui";
import type { CatalogCategory, Category, Product, SortOption } from "./products.types";

type CatalogHandlers = {
  onSearch: (value: string) => void;
  onCategory: (value: CatalogCategory) => void;
  onSort: (value: SortOption) => void;
  onAdd: (productId: number) => void;
};

const productGrid = getElement<HTMLDivElement>("#product-grid");
const searchInput = getElement<HTMLInputElement>("#search");
const categorySelect = getElement<HTMLSelectElement>("#category");
const sortSelect = getElement<HTMLSelectElement>("#sort");

function isSortOption(value: string): value is SortOption {
  return value === "default" || value === "asc" || value === "desc";
}

export function renderCategoryOptions(categories: readonly Category[]): void {
  categorySelect.innerHTML = [
    `<option value="all">All categories</option>`,
    ...categories.map((category) => `<option value="${category}">${category}</option>`),
  ].join("");
}

export function renderProducts(products: readonly Product[]): void {
  productGrid.innerHTML = products
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

export function bindProductEvents(
  categories: readonly Category[],
  handlers: CatalogHandlers,
): void {
  searchInput.addEventListener("input", () => handlers.onSearch(searchInput.value));
  categorySelect.addEventListener("change", () => {
    const category = categorySelect.value;
    if (category === "all") {
      handlers.onCategory(category);
      return;
    }

    const selectedCategory = categories.find((knownCategory) => knownCategory === category);
    if (selectedCategory) handlers.onCategory(selectedCategory);
  });
  sortSelect.addEventListener("change", () => {
    const sort = sortSelect.value;
    if (isSortOption(sort)) handlers.onSort(sort);
  });
  productGrid.addEventListener("click", (event) => {
    if (!(event.target instanceof Element)) return;
    const button = event.target.closest<HTMLButtonElement>("[data-id]");
    if (!button) return;

    const productId = Number(button.dataset.id);
    if (!Number.isInteger(productId)) return;

    handlers.onAdd(productId);
    showToast("Added to cart.");
  });
}
