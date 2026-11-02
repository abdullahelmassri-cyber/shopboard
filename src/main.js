import "./style.css";
import { products } from "./products.js";
import { getCategories, getVisibleProducts } from "./catalog.js";
import * as cart from "./cart.js";
import * as ui from "./ui.js";

const state = {
  search: "",
  category: "all",
  sort: "default",
};

function renderCatalog() {
  ui.renderProducts(getVisibleProducts(products, state));
}

function renderCart() {
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
