import "../style.css";
import { products } from "./data";
import { getCategories, getVisibleProducts } from "./logic";
import {
  addToCart,
  changeQuantity,
  clearCart,
  getCartCount,
  getCartLines,
  getCartTotal,
  removeFromCart,
} from "./state";
import { bindEvents, renderCart, renderCategoryOptions, renderProducts, showToast } from "./ui";
import type { CatalogState } from "./types";

const QUANTITY_INCREMENT = 1;
const QUANTITY_DECREMENT = -1;

const state: CatalogState = {
  search: "",
  category: "all",
  sort: "default",
};

function renderCatalog(): void {
  renderProducts(getVisibleProducts(products, state));
}

function renderCurrentCart(): void {
  renderCart(getCartLines(), getCartCount(), getCartTotal());
}

bindEvents({
  onSearch(value) {
    state.search = value;
    renderCatalog();
  },
  onCategory(value) {
    state.category = value;
    renderCatalog();
  },
  onSort(value) {
    state.sort = value;
    renderCatalog();
  },
  onAdd(id) {
    addToCart(id);
    renderCurrentCart();
    showToast("Added to cart.");
  },
  onCartAction(action, id) {
    if (action === "increase") changeQuantity(id, QUANTITY_INCREMENT);
    if (action === "decrease") changeQuantity(id, QUANTITY_DECREMENT);
    if (action === "remove") removeFromCart(id);
    renderCurrentCart();
  },
  onClear() {
    clearCart();
    renderCurrentCart();
  },
});

renderCategoryOptions(getCategories(products));
renderCatalog();
renderCurrentCart();
