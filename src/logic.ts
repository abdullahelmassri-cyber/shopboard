import type { Cart, CartItem, CartLine, CatalogState, PriceRange, Product } from "./types";

const ALL_CATEGORIES = "all";
const INITIAL_CART_QUANTITY = 1;
const MIN_CART_QUANTITY = 1;

export function getCategories(products: readonly Product[]): string[] {
  return [...new Set(products.map((product) => product.category))];
}

export function getVisibleProducts(
  products: readonly Product[],
  { search, category, sort }: CatalogState,
  priceRange: PriceRange = {},
): Product[] {
  const query = search.trim().toLowerCase();

  const result = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(query);
    const matchesCategory = category === ALL_CATEGORIES || product.category === category;
    const matchesMinimumPrice = priceRange.min === undefined || product.price >= priceRange.min;
    const matchesMaximumPrice = priceRange.max === undefined || product.price <= priceRange.max;
    return matchesSearch && matchesCategory && matchesMinimumPrice && matchesMaximumPrice;
  });

  if (sort === "asc") {
    result.sort((first, second) => first.price - second.price);
  } else if (sort === "desc") {
    result.sort((first, second) => second.price - first.price);
  }

  return result;
}

export function addProductToCart(cart: readonly CartItem[], productId: number): Cart {
  const existingIndex = cart.findIndex((item) => item.id === productId);
  if (existingIndex < 0) {
    return [...cart, { id: productId, quantity: INITIAL_CART_QUANTITY }];
  }
  return cart.map((item, index) =>
    index === existingIndex ? { ...item, quantity: item.quantity + INITIAL_CART_QUANTITY } : item,
  );
}

export function changeCartQuantity(
  cart: readonly CartItem[],
  productId: number,
  change: number,
): Cart {
  if (!Number.isInteger(change) || change === 0) return cart;

  const existingItem = cart.find((item) => item.id === productId);
  if (!existingItem) return cart;

  const nextQuantity = existingItem.quantity + change;
  if (nextQuantity < MIN_CART_QUANTITY) {
    return cart.filter((item) => item.id !== productId);
  }

  return cart.map((item) => (item.id === productId ? { ...item, quantity: nextQuantity } : item));
}

export function removeProductFromCart(cart: readonly CartItem[], productId: number): Cart {
  return cart.filter((item) => item.id !== productId);
}

export function getCartLines(cart: readonly CartItem[], products: readonly Product[]): CartLine[] {
  return cart.map((item) => {
    const product = getProduct(products, item.id);
    return {
      id: item.id,
      name: product.name,
      price: product.price,
      quantity: item.quantity,
      lineTotal: product.price * item.quantity,
    };
  });
}

export function getCartCount(cart: readonly CartItem[]): number {
  return cart.reduce((sum, item) => sum + item.quantity, 0);
}

export function getCartTotal(cart: readonly CartItem[], products: readonly Product[]): number {
  return cart.reduce((sum, item) => sum + getProduct(products, item.id).price * item.quantity, 0);
}

export function validateCartData(value: unknown, products: readonly Product[]): Cart {
  if (!Array.isArray(value)) return [];
  return value.filter((item: unknown) => isValidCartItem(item, products));
}

function isValidCartItem(value: unknown, products: readonly Product[]): value is CartItem {
  if (typeof value !== "object" || value === null) return false;
  if (!("id" in value) || !("quantity" in value)) return false;

  const { id, quantity } = value;
  return (
    typeof id === "number" &&
    typeof quantity === "number" &&
    products.some((product) => product.id === id) &&
    Number.isInteger(quantity) &&
    quantity >= MIN_CART_QUANTITY
  );
}

function getProduct(products: readonly Product[], productId: number): Product {
  const product = products.find((item) => item.id === productId);
  if (!product) throw new Error(`Unknown product id: ${productId}`);
  return product;
}
