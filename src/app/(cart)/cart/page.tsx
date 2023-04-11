"use client";
import React, { useState } from "react";
import LargeHeading from "@/components/ui/large-heading";
import Paragraph from "@/components/ui/paragraph";
import EmptyCart from "@/components/empty-cart";
import { useCartDispatch, useCartState } from "@/store/cart";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/icons";
import client from "@/lib/commerce";
import { Item } from "@/types/cart";
import CartItem from "@/components/cart-item";

interface PageProps {}

function CartPage({}: PageProps) {
  const state = useCartState();
  const [isEmptyCartLoading, setIsEmptyCartLoading] = useState(false);
  const { setCart } = useCartDispatch();

  if (state.line_items.length === 0) {
    return <EmptyCart />;
  }

  const cartItems: Item[] = state.line_items;
  console.log(state);

  const handleClearCart = async () => {
    setIsEmptyCartLoading(true);
    const cart = await client.cart.empty();
    setCart(cart);
    setIsEmptyCartLoading(false);
  };

  const handleUpdateCart = async (id: string, quantity: number) => {
    const cart = await client.cart.update(id, { quantity });
    setCart(cart);
  };

  return (
    <>
      <LargeHeading size="sm" className="md:pl-5">
        Shopping Cart
      </LargeHeading>
      <div className="flex flex-col lg:flex-row">
        <div className="w-full lg:w-3/4 md:p-5">
          <Paragraph>Cart Items</Paragraph>

          {cartItems.map((item) => (
            <CartItem
              key={item.id}
              item={item}
              onUpdateCart={handleUpdateCart}
            />
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
          <Button className="w-full">Proceed to Checkout</Button>
          <Button
            variant="outline"
            className="w-full mt-3"
            onClick={handleClearCart}
            disabled={isEmptyCartLoading}
          >
            {isEmptyCartLoading ? (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Icons.trash2 className="w-4 h-4 mr-2" />
            )}{" "}
            Clear Cart
          </Button>
        </div>
      </div>
    </>
  );
}

export default CartPage;
