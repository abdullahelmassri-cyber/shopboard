import "../style.css";
import { products } from "./products";
import { getCategories, getVisibleProducts } from "./catalog";
import {
  addToCart,
  changeQuantity,
  clearCart,
  getCartCount,
  getCartLines,
  getCartTotal,
  removeFromCart,
} from "./cart";
import { bindEvents, renderCart, renderCategoryOptions, renderProducts } from "./ui";
import type { CatalogState } from "./types";

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
  },
  onCartAction(action, id) {
    if (action === "increase") changeQuantity(id, 1);
    if (action === "decrease") changeQuantity(id, -1);
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
