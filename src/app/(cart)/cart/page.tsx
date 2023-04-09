"use client";
import LargeHeading from "@/components/ui/large-heading";
import Paragraph from "@/components/ui/paragraph";
import EmptyCart from "@/components/empty-cart";
import { useCartDispatch, useCartState } from "@/store/cart";
import Image from "next/image";
import { AspectRatio } from "@radix-ui/react-aspect-ratio";
import DeleteButton from "@/components/delete-button";

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
  const state = useCartState();

  if (state.line_items.length === 0) {
    return <EmptyCart />;
  }

  const cartItems: CartItem[] = state.line_items;
  console.log(state);

  return (
    <>
      <LargeHeading size="sm" className="md:pl-5">
        Shopping Cart
      </LargeHeading>
      <div className="flex flex-col lg:flex-row">
        <div className="w-full lg:w-3/4 md:p-5">
          <Paragraph>Cart Items</Paragraph>

          {cartItems.map((item) => (
            <div key={item.id}>
              <div className="flex py-5 gap-3 md:gap-5 border-b">
                <div className="shrink-0 aspect-square w-[80px] md:w-[120px]">
                  <AspectRatio
                    ratio={1}
                    className="relative overflow-hidden rounded-md"
                  >
                    <Image
                      src={item.image.url}
                      alt={item.name}
                      width={120}
                      height={120}
                    />
                  </AspectRatio>
                </div>
                <div className="w-full flex flex-col">
                  <div className="flex flex-col md:flex-row justify-between">
                    <Paragraph className="font-semibold">{item.name}</Paragraph>
                    <Paragraph className="text-gray-500">
                      MRP : {item.price.formatted_with_symbol}
                    </Paragraph>
                  </div>
                  <div className="flex flex-row justify-between items-center">
                    <Paragraph className="text-gray-500">
                      Quantity: {item.quantity}
                    </Paragraph>
                    <DeleteButton id={item.id} />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="w-full lg:w-1/4 md:p-5">
          <Paragraph>Summary</Paragraph>

          <div className="p-5 my-5 bg-black/[0.05] rounded-xl">
            <div className="flex justify-between">
              <div className="uppercase text-md md:text-lg font-medium text-black">
                Subtotal
              </div>
              <div className="text-md md:text-lg font-medium text-black">
                {state.subtotal.formatted_with_symbol}
              </div>
            </div>
            <div className="text-sm md:text-md py-5 border-t mt-5">
              The subtotal reflects the total price of your order, including
              duties and taxes, before any applicable discounts. It does not
              include delivery costs and international transaction fees.
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CartPage;
