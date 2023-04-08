"use client";
import EmptyCart from "@/components/empty-cart";
import client from "@/lib/commerce";
import { useCartState } from "@/store/cart";

interface CartItem {
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
  selected_options: any[];
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
    meta: any[];
    created_at: number;
    updated_at: number;
  };
  tax: null;
}

interface PageProps {}

function CartPage({}: PageProps) {
  const { line_items } = useCartState();

  if (line_items.length === 0) {
    return <EmptyCart />;
  }

  const cartItems: CartItem[] = line_items;

  return (
    <>
      {cartItems.map((item) => (
        <div key={item.id}>
          <h3>{item.name}</h3>
          <p>{item.price.formatted_with_symbol}</p>
          <p>Quantity: {item.quantity}</p>
        </div>
      ))}
    </>
  );
}

export default CartPage;
