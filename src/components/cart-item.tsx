"use client";
import React, { useState } from "react";
import Image from "next/image";
import { AspectRatio } from "@radix-ui/react-aspect-ratio";
import DeleteButton from "@/components/delete-button";
import Paragraph from "@/components/ui/paragraph";
import { Item } from "@/types/cart";
import Quantity from "./quantity";

interface CartItemProps {
  item: Item;
  onUpdateCart: (id: string, quantity: number) => void;
}

const CartItem = ({ item, onUpdateCart }: CartItemProps) => {
  const [isPlusLoading, setIsPlusLoading] = useState(false);
  const [isMinusLoading, setIsMinusLoading] = useState(false);
  const onPlusClick = () => {
    onUpdateCart(item.id, item.quantity + 1);
  };
  const onMinusClick = () => {
    onUpdateCart(item.id, item.quantity - 1);
  };
  return (
    <div>
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
        <div className="w-full flex flex-col ">
          <div className="flex flex-col md:flex-row justify-between">
            <Paragraph className="font-semibold">
              {item.name}{" "}
              {item.selected_options[0] ? (
                <> ({item.selected_options[0].option_name})</>
              ) : null}{" "}
            </Paragraph>
            <Paragraph className="text-gray-500">
              MRP : {item.price.formatted_with_symbol}
            </Paragraph>
          </div>
          <div className="flex flex-row justify-between items-center">
            <div>
              {/* <Paragraph className="text-gray-500">
                Quantity: {item.quantity}
              </Paragraph> */}
              <Quantity
                minusClickAction={onMinusClick}
                plusClickAction={onPlusClick}
                quantity={item.quantity}
              />
            </div>

            <DeleteButton id={item.id} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
