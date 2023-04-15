export interface Token {
  id: string;
  cart_id: string;
  currency: {
    code: string;
    symbol: string;
  };
  subtotal: {
    raw: number;
    formatted: string;
    formatted_with_symbol: string;
    formatted_with_code: string;
  };
  total: {
    raw: number;
    formatted: string;
    formatted_with_symbol: string;
    formatted_with_code: string;
  };
  total_with_tax: {
    raw: number;
    formatted: string;
    formatted_with_symbol: string;
    formatted_with_code: string;
  };
  giftcard: never[];
  total_due: {
    raw: number;
    formatted: string;
    formatted_with_symbol: string;
    formatted_with_code: string;
  };
  pay_what_you_want: {
    enabled: boolean;
    minimum: number | null;
    customer_set_price: number | null;
  };
  conditionals: {
    collects_fullname: boolean;
    collects_shipping_address: boolean;
    collects_billing_address: boolean;
    has_physical_delivery: boolean;
    has_digital_delivery: boolean;
    has_pay_what_you_want: boolean;
    has_available_discounts: boolean;
    collects_extra_fields: boolean;
    is_cart_free: boolean;
  };
  meta: null;
  created: number;
  updated: number;
  expires: number;
  collects: {
    fullname: boolean;
    shipping_address: boolean;
    billing_address: boolean;
    extra_fields: boolean;
  };
  has: {
    physical_delivery: boolean;
    digital_delivery: boolean;
    pay_what_you_want: boolean;
    available_discounts: boolean;
  };
  is: {
    cart_free: boolean;
  };
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
    product_meta: never[];
    selected_options: never[];
    variant: null;
    image: {
      id: string;
      url: string;
      description: null;
      is_image: boolean;
      filename: string;
      file_size: number;
      file_extension: string;
      image_dimensions: {
        width: number;
        height: number;
      };
      meta: never[];
      created_at: number;
      updated_at: number;
    };
    tax: {
      is_taxable: boolean;
      taxable_amount: number | null;
      amount: number | null;
      breakdown: null;
    };
  }[];
}

export interface OrderData {
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
    product_meta: never[];
    selected_options: never[];
    variant: null;
    image: {
      id: string;
      url: string;
      description: null;
      is_image: boolean;
      filename: string;
      file_size: number;
      file_extension: string;
      image_dimensions: {
        width: number;
        height: number;
      };
      meta: never[];
      created_at: number;
      updated_at: number;
    };
    tax: {
      is_taxable: boolean;
      taxable_amount: number | null;
      amount: number | null;
      breakdown: null;
    };
  }[];
  customer: {
    firstname: string;
    lastname: string;
    email: string;
  };
  shipping: {
    name: string;
    street: string;
    town_city: string;
    county_state: string;
    postal_zip_code: string;
    country: string;
  };
  fulfillment: {
    shipping_method: string;
  };
  billing: {
    name: string;
    street: string;
    town_city: string;
    county_stat: string;
    postal_zip_code: string;
    country: string;
  };
  payment: {
    gateway: string;
    stripe: {
      payment_method_id: string;
    };
  };
}
