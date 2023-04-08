"use client";

import * as React from "react";
import { siteConfig } from "@/config/site";
import Link from "next/link";
import { FC } from "react";
import { Icons } from "@/components/icons";
import { MobileNav } from "@/components/mobile-nav";
import client from "@/lib/commerce";
import { useCartState } from "@/store/cart";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
  navigationMenuTriggerStyle,
} from "@/ui/navigation-menu";
import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "@/ui/button";
import { CategoryData } from "@/types/api";
import { Url } from "next/dist/shared/lib/router/router";

const components: { title: string; href: string; description: string }[] = [
  {
    title: "Full Sleeve Shirts",
    href: "/categories/full-sleeve-shirts",
    description:
      "Pure linen full sleeve shirt for mens with a button down collar and a chest pocket.",
  },
  {
    title: "Pure Linen Fabric",
    href: "/categories/pure-linen-fabric",
    description:
      "Pure linen fabric for shirts, pants, dresses, and more. 100% linen.",
  },
  {
    title: "Half Sleeve Shirts",
    href: "/categories/half-sleeve-shirts",
    description: "Pure linen half sleeve shirt for mens.",
  },
];
const Navbar = ({}) => {
  const { total_unique_items } = useCartState();
  return (
    <header className="sticky top-0 z-40 w-full border-b border-b-stone-200 bg-white dark:border-b-stone-700 dark:bg-stone-900">
      <div className="h-16 px-5 md:px-10 container max-w-7xl mx-auto w-full flex justify-between items-center">
        <div className="hidden md:flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <Icons.logo className="h-6 w-6" />
            <span className="hidden font-bold sm:inline-block">
              {siteConfig.name}
            </span>
          </Link>
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem className="hidden lg:flex">
                <Link href="\" legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    Home
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuTrigger>Shop All</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                    {components.map((component) => (
                      <ListItem
                        key={component.title}
                        title={component.title}
                        href={component.href}
                      >
                        {component.description}
                      </ListItem>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem className="hidden lg:flex">
                <Link href="/contact" legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    Contact
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem className="hidden lg:flex">
                <Link href={siteConfig.links.github} legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    Track Order
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        <div className="flex flex-1 items-center justify-between space-x-2 sm:space-x-4 md:justify-end">
          <MobileNav />
          <div className="flex items-center space-x-2">
            {/* <Link href="/cart">
              <Button variant="ghost">
                <Icons.shoppingCart className="hover:text-stone-900 dark:text-stone-400 dark:hover:text-stone-100" />
              </Button>
            </Link> */}
            <Link href="/cart" className="relative">
              <Button variant="ghost">
                <Icons.shoppingCart className="hover:text-stone-900 dark:text-stone-400 dark:hover:text-stone-100" />
                {total_unique_items > 0 && (
                  <span className="absolute top-0 right-0 inline-flex items-center justify-center px-1.5 py-1 text-[10px] leading-none text-red-100 bg-red-600 rounded-full">
                    {total_unique_items}
                  </span>
                )}
              </Button>
            </Link>
            <Button>Sign in</Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-stone-100 focus:bg-stone-100 dark:hover:bg-stone-700 dark:focus:bg-stone-700",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-stone-500 dark:text-stone-400">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
