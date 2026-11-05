import { ApiError, fetchJson } from "../../shared/api/client";
import type { Category, Product } from "./products.types";

const CENTS_PER_DOLLAR = 100;
const INVALID_RESPONSE_STATUS = 500;
const PRODUCTS_PATH = "/api/products";

interface ApiProduct {
  id: number;
  title: string;
  category_name: string;
  price_cents: number;
  in_stock: boolean;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function isCategory(value: string): value is Category {
  return value === "Bags" || value === "Shoes" || value === "Accessories";
}

function isApiProduct(value: unknown): value is ApiProduct {
  if (!isRecord(value)) return false;

  return (
    Number.isInteger(value.id) &&
    typeof value.title === "string" &&
    typeof value.category_name === "string" &&
    isCategory(value.category_name) &&
    Number.isInteger(value.price_cents) &&
    typeof value.price_cents === "number" &&
    typeof value.in_stock === "boolean"
  );
}

function toProduct(apiProduct: ApiProduct): Product {
  if (!isCategory(apiProduct.category_name)) {
    throw new ApiError("Product has an unknown category", INVALID_RESPONSE_STATUS);
  }

  return {
    id: apiProduct.id,
    name: apiProduct.title,
    category: apiProduct.category_name,
    price: apiProduct.price_cents / CENTS_PER_DOLLAR,
    inStock: apiProduct.in_stock,
  };
}

function parseProductsResponse(data: unknown): Product[] {
  if (!isRecord(data) || !Array.isArray(data.items)) {
    throw new ApiError("Products response has an invalid shape", INVALID_RESPONSE_STATUS);
  }

  if (!data.items.every(isApiProduct)) {
    throw new ApiError("Products response contains invalid product data", INVALID_RESPONSE_STATUS);
  }

  return data.items.map(toProduct);
}

export async function getProducts(): Promise<Product[]> {
  return fetchJson(PRODUCTS_PATH, parseProductsResponse);
}
