import * as React from "react";
import { ReactElement } from "react";
import Link from "next/link";
import client from "@/lib/commerce";
import { docsConfig } from "@/config/docs";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import { Icons } from "@/components/icons";
import { Button } from "@/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ScrollArea } from "@/components/ui/scroll-area";
import Badge from "@/ui/badge";
import { isNew } from "@/lib/utils";

const MobileNav = async () => {
  const { data: categories } = await client.categories.list();
  const sort = () => {
    return categories.sort((a: { name: string }, b: { name: string }) =>
      a.name.localeCompare(b.name)
    );
  };
  const newSortedCategories = sort();
  return (
    <React.Fragment>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="-ml-4 text-base hover:bg-transparent focus:ring-0 focus:ring-offset-0 md:hidden "
          >
            <Icons.menu className="w-6 h-6" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="start"
          sideOffset={24}
          alignOffset={4}
          className="w-[300px] overflow-scroll"
        >
          <DropdownMenuItem asChild>
            <Link href="/" className="flex items-center">
              <Icons.logo className="mr-2 h-4 w-4" /> {siteConfig.name}
            </Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <ScrollArea className="h-[400px]">
            {docsConfig.mainNav?.map(
              (item, index) =>
                item.href && (
                  <DropdownMenuItem key={index} asChild>
                    <Link href={item.href}>{item.title}</Link>
                  </DropdownMenuItem>
                )
            )}
            <DropdownMenuSeparator className="-mx-2" />
            <DropdownMenuGroup>
              <DropdownMenuLabel>Categories</DropdownMenuLabel>
              <DropdownMenuSeparator className="-mx-2" />
              {newSortedCategories?.map(
                (category: {
                  id: string;
                  slug: string;
                  name: string;
                  created: number;
                }) => (
                  <DropdownMenuItem key={category.id} asChild>
                    <Link
                      href={`/category/${category.slug}`}
                      className="flex justify-between items-center"
                    >
                      <span>{category.name}</span>
                      {isNew(category.created) && (
                        <Badge variant="info" size="sm">
                          New
                        </Badge>
                      )}
                    </Link>
                  </DropdownMenuItem>
                )
              )}
            </DropdownMenuGroup>
            <DropdownMenuSeparator className="-mx-2" />
            {docsConfig.sidebarNav.map((item, index) => (
              <DropdownMenuGroup key={index}>
                <DropdownMenuSeparator
                  className={cn({
                    hidden: index === 0,
                  })}
                />
                <DropdownMenuLabel>{item.title}</DropdownMenuLabel>
                <DropdownMenuSeparator className="-mx-2" />
                {item?.items?.length &&
                  item.items.map((item) => (
                    <DropdownMenuItem key={item.title} asChild>
                      {item.href ? (
                        <Link
                          href={item.href}
                          target={item.external ? "_blank" : ""}
                          rel={item.external ? "noreferrer" : ""}
                          className="flex justify-between items-center"
                        >
                          {item.title}
                          {item.label && (
                            <Badge variant="info" size="sm">
                              {item.label}
                            </Badge>
                          )}
                        </Link>
                      ) : (
                        item.title
                      )}
                    </DropdownMenuItem>
                  ))}
              </DropdownMenuGroup>
            ))}
          </ScrollArea>
        </DropdownMenuContent>
      </DropdownMenu>
    </React.Fragment>
  );
};

export default MobileNav;
