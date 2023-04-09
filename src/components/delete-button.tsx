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
  const [loading, setLoading] = useState(false);
  const { setCart } = useCartDispatch();
  const handleDelete = async () => {
    setLoading(true);
    const cart = await client.cart.remove(id);
    setCart(cart);
    setLoading(false);
  };
  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={handleDelete}
      isLoading={loading}
    >
      {loading ? (
        ""
      ) : (
        <Icons.trash2 className="hover:text-stone-900 w-5 h-5 dark:text-stone-400 dark:hover:text-stone-100" />
      )}
    </Button>
  );
};

export default DeleteButton;
