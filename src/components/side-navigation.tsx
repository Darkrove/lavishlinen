"use client";

import React from "react";
import { siteConfig } from "@/config/site";
import Link from "next/link";

import { Icons } from "@/components/icons";

import { useCartState } from "@/store/cart";
import { Button, buttonVariants } from "@/ui/button";

const SideNavigation = () => {
  const { total_unique_items } = useCartState();
  return (
    <div className="flex items-center space-x-2">
      <Link href="/cart" className="relative">
        <Button variant="ghost" className="px-2">
          <Icons.shoppingCart className="w-6 h-6 hover:text-stone-900 dark:text-stone-400 dark:hover:text-stone-100" />
          {total_unique_items > 0 && (
            <span className="absolute top-0 right-0 inline-flex items-center justify-center px-1.5 py-1 text-[10px] leading-none text-red-100 bg-red-600 rounded-full">
              {total_unique_items}
            </span>
          )}
        </Button>
      </Link>
      <Button variant="ghost" className="px-2">
        <Icons.heart className="w-6 h-6 hover:text-stone-900 dark:text-stone-400 dark:hover:text-stone-100" />
      </Button>
    </div>
  );
};

export default SideNavigation;
