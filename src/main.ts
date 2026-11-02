import "./style.css";
import { products } from "./products";
import { getCategories, getVisibleProducts } from "./catalog";
import * as cart from "./cart";
import * as ui from "./ui";
import type { CatalogState } from "./types";

const state: CatalogState = {
  search: "",
  category: "all",
  sort: "default",
};

function renderCatalog(): void {
  ui.renderProducts(getVisibleProducts(products, state));
}

function renderCart(): void {
  ui.renderCart(cart.getCartLines(), cart.getCartCount(), cart.getCartTotal());
}

ui.bindEvents({
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
    cart.addToCart(id);
    renderCart();
  },
  onCartAction(action, id) {
    if (action === "increase") cart.changeQuantity(id, 1);
    if (action === "decrease") cart.changeQuantity(id, -1);
    if (action === "remove") cart.removeFromCart(id);
    renderCart();
  },
  onClear() {
    cart.clearCart();
    renderCart();
  },
});

ui.renderCategoryOptions(getCategories(products));
renderCatalog();
renderCart();
