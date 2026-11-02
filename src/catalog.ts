import type { CatalogState, Product } from "./types";

export function getCategories(products: Product[]): string[] {
  return [...new Set(products.map((product) => product.category))];
}

export function getVisibleProducts(
  products: Product[],
  { search, category, sort }: CatalogState,
): Product[] {
  const query = search.trim().toLowerCase();

  // filter() returns a NEW array, so the original `products` is never changed
  const result = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(query);
    const matchesCategory = category === "all" || product.category === category;
    return matchesSearch && matchesCategory;
  });

  if (sort === "asc") {
    result.sort((a, b) => a.price - b.price);
  } else if (sort === "desc") {
    result.sort((a, b) => b.price - a.price);
  }

  return result;
}
