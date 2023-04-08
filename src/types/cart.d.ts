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
