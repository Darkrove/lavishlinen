export interface Cart {
  id: string;
  total_items: number;
  total_unique_items: number;
  subtotal: {
    raw: number;
    formatted: string;
    formatted_with_symbol: string;
    formatted_with_code: string;
  };
  hosted_checkout_url: string;
  line_items: {
    id: string;
    product_id: string;
    name: string;
    product_name: string;
    sku: string;
    permalink: string;
    quantity: number;
    price: {
      raw: number;
      formatted: string;
      formatted_with_symbol: string;
      formatted_with_code: string;
    };
    line_total: {
      raw: number;
      formatted: string;
      formatted_with_symbol: string;
      formatted_with_code: string;
    };
    is_valid: boolean;
    image: {
      id: string;
      url: string;
      description: string | null;
      is_image: boolean;
      filename: string;
      file_size: number;
      file_extension: string;
      image_dimensions: {
        width: number;
        height: number;
      };
      created_at: number;
      updated_at: number;
    };
  }[];
  currency: {
    code: string;
    symbol: string;
  };
}

export interface Item {
  id: string;
  product_id: string;
  name: string;
  product_name: string;
  sku: string;
  permalink: string;
  quantity: number;
  price: {
    raw: number;
    formatted: string;
    formatted_with_symbol: string;
    formatted_with_code: string;
  };
  line_total: {
    raw: number;
    formatted: string;
    formatted_with_symbol: string;
    formatted_with_code: string;
  };
  is_valid: boolean;
  product_meta: any[];
  selected_options: {
    group_id: string;
    group_name: string;
    option_id: string;
    option_name: string;
    price: {
      raw: number;
      formatted: string;
      formatted_with_symbol: string;
      formatted_with_code: string;
    };
  }[];
  variant: {
    id: string;
    sku: string | null;
    description: string;
    inventory: number;
    price: number | null;
    is_valid: boolean;
    invalid_reason_code: string | null;
    meta: any | null;
    created: number;
    updated: number;
    options: {
      [key: string]: string;
    };
    assets: any[];
  } | null;
  image: {
    id: string;
    url: string;
    description: string | null;
    is_image: boolean;
    filename: string;
    file_size: number;
    file_extension: string;
    image_dimensions: {
      width: number;
      height: number;
    };
    meta: any[];
    created_at: number;
    updated_at: number;
  };
  tax: any | null;
}
