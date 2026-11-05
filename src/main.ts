import "../style.css";
import { products } from "./modules/products/products.data";
import { getCategories, getVisibleProducts } from "./modules/products/products.logic";
import {
  bindProductEvents,
  renderCategoryOptions,
  renderProducts,
} from "./modules/products/products.ui";
import { bindCartEvents, renderCart } from "./modules/cart/cart.ui";
import {
  addToCart,
  changeQuantity,
  clearCart,
  getCartCount,
  getCartLines,
  getCartTotal,
  removeFromCart,
} from "./modules/cart/cart.state";
import { bindSignupForm } from "./modules/signup/signup.ui";
import type { CatalogState } from "./modules/products/products.types";

const QUANTITY_INCREMENT = 1;
const QUANTITY_DECREMENT = -1;

const state: CatalogState = {
  search: "",
  category: "all",
  sort: "default",
};

const categories = getCategories(products);

function renderCatalog(): void {
  renderProducts(getVisibleProducts(products, state));
}

function renderCurrentCart(): void {
  renderCart(getCartLines(), getCartCount(), getCartTotal());
}

bindProductEvents(categories, {
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
});

bindCartEvents({
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

bindSignupForm();

renderCategoryOptions(categories);
renderCatalog();
renderCurrentCart();
