import React from "react";
import Image from "next/image";
import { AspectRatio } from "@radix-ui/react-aspect-ratio";
import DeleteButton from "@/components/delete-button";
import Paragraph from "@/components/ui/paragraph";
import { Item } from "@/types/cart";

interface CartItemProps {
  item: Item;
}

const CartItem = ({ item }: CartItemProps) => {
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
  );
};

export default CartItem;
