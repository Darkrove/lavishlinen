export interface Product {
  sku: string;
  id: string;
  name: string;
  description: string;
  price: {
    formatted_with_symbol: string;
  };
  inventory: {
    available: number;
  };
  assets: {
    url: string;
  }[];
}

export interface Variant {
  data: {
    id: string;
    sku: string | null;
    description: string | null;
    inventory: number;
    price: number | null;
    is_valid: boolean;
    invalid_reason_code: string | null;
    meta: Record<string, unknown> | null;
    created: number;
    updated: number;
    options: Array<Record<string, unknown>>;
    assets: Array<unknown>;
  }[];
  meta: {
    pagination: {
      total: number;
      count: number;
      per_page: number;
      current_page: number;
      total_pages: number;
      links: Record<string, unknown>;
    };
  };
}
