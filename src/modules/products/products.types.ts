export type Category = "Bags" | "Shoes" | "Accessories";

export interface ProductDetails {
  id: number;
  name: string;
  category: Category;
  price: number;
}

export interface Product extends ProductDetails {
  inStock: boolean;
}

export interface CatalogProduct extends ProductDetails {
  image: string;
}

export type CatalogCategory = Category | "all";

export type SortOption = "default" | "asc" | "desc";

export type CatalogState = {
  search: string;
  category: CatalogCategory;
  sort: SortOption;
};

export type PriceRange = {
  min?: number;
  max?: number;
};
