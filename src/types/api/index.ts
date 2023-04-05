import { ZodIssue } from "zod";

interface Category {
  id: String;
  slug: String;
  name: String;
  description: String;
}

export interface CategoryData {
  error: string | ZodIssue[] | null;
  categories: Category[] | null;
}

export interface ProductData {
  id: string;
  name: string;
  price: {
    raw: number;
    formatted: string;
    formatted_with_symbol: string;
    formatted_with_code: string;
  };
  image: {
    url: string;
  };
}
