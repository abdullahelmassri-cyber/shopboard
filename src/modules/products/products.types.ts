export type Category = "Bags" | "Shoes" | "Accessories";

export type Product = {
  id: number;
  name: string;
  category: Category;
  price: number;
  image: string;
};

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
