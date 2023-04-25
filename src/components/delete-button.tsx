"use client";
import React from "react";
import client from "@/lib/commerce";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/icons";
import { useState } from "react";
import { useCartDispatch } from "@/store/cart";

interface Props {
  id: string;
}

const DeleteButton = ({ id }: Props) => {
  const [isLoading, setIsLoading] = useState(false);
  const { setCart } = useCartDispatch();
  const handleDelete = async () => {
    setIsLoading(true);
    const cart = await client.cart.remove(id);
    setCart(cart);
    setIsLoading(false);
  };
  return (
    <Button
      size="sm"
      onClick={handleDelete}
      disabled={isLoading}
      variant="destructive"
    >
      {isLoading ? (
        <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
      ) : (
        <Icons.trash className="text-white w-5 h-5 mr-2" />
      )}{" "}
      Delete
    </Button>
  );
};

export default DeleteButton;
