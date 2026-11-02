export type Product = {
  id: number;
  name: string;
  category: string;
  price: number;
};

export type CartItem = {
  id: number;
  quantity: number;
};

export type CartLine = {
  id: number;
  name: string;
  price: number;
  quantity: number;
  lineTotal: number;
};

export type SortOption = "default" | "asc" | "desc";

export type CatalogState = {
  search: string;
  category: string;
  sort: SortOption;
};
