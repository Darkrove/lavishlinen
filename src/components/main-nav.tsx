import React from "react";
import { siteConfig } from "@/config/site";
import Link from "next/link";
import { FC } from "react";
import { Icons } from "@/components/icons";
import MobileNav from "@/components/mobile-nav";
import { cva } from "class-variance-authority";
import client from "@/lib/commerce";
import SideNavigation from "@/components/side-navigation";
import { Separator } from "@/ui/seperator";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "@/ui/navigation-menu";
import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "@/ui/button";
import { CategoryData } from "@/types/api";
import { Url } from "next/dist/shared/lib/router/router";
import { isNew } from "@/lib/utils";
import Badge from "@/ui/badge";
const components: { title: string; slug: string; description: string }[] = [
  {
    title: "Full Sleeve Shirts",
    slug: "full-sleeve-shirts",
    description:
      "Pure linen full sleeve shirt for mens with a button down collar and a chest pocket.",
  },
  {
    title: "Pure Linen Fabric",
    slug: "pure-linen-fabric",
    description:
      "Pure linen fabric for shirts, pants, dresses, and more. 100% linen.",
  },
  {
    title: "Half Sleeve Shirts",
    slug: "half-sleeve-shirts",
    description: "Pure linen half sleeve shirt for mens.",
  },
];

const Navbar = async () => {
  const { data: categories } = await client.categories.list();
  const sort = () => {
    return categories.sort((a: { name: string }, b: { name: string }) =>
      a.name.localeCompare(b.name)
    );
  };
  const newSortedCategories = sort().slice(0, 6);
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
                    {newSortedCategories?.map(
                      (component: {
                        slug: string | null;
                        name: string;
                        description: string | null;
                        created: number;
                      }) => (
                        <ListItem
                          key={component.slug}
                          title={component.name}
                          href={`/categories/${component.slug}`}
                        >
                          {component.description}
                        </ListItem>
                      )
                    )}
                  </ul>
                  <div className="p-4 pt-0">
                    <Separator className="mb-4" />
                    <Link href="/categories/list" passHref legacyBehavior>
                      <NavigationMenuLink
                        className={cn(
                          buttonVariants({ variant: "outline" }),
                          "w-full dark:hover:bg-slate-700"
                        )}
                      >
                        Browse Categories
                      </NavigationMenuLink>
                    </Link>
                  </div>
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
          <SideNavigation />
        </div>
      </div>
    </header>
  );
};

export default Navbar;

const navigationMenuTriggerStyle = cva(
  "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus:outline-none focus:bg-stone-100 disabled:opacity-50 dark:focus:bg-stone-800 disabled:pointer-events-none bg-transparent hover:bg-stone-100 dark:hover:bg-stone-800 dark:text-stone-100 dark:hover:text-stone-100 data-[state=open]:bg-stone-50 dark:data-[state=open]:bg-stone-800 data-[active]:bg-stone-50 dark:data-[active]:bg-stone-800 h-10 py-2 px-4 group w-max"
);

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
          <div className="text-sm font-medium leading-none">
            {title}
            {/* {isNew(created) && (
            <Badge className="ml-2">New</Badge>
          )} */}
          </div>
          <p className="line-clamp-1 text-sm leading-snug text-stone-500 dark:text-stone-400">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
