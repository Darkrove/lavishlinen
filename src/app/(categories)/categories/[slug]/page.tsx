import { FC } from "react";
import client from "@/lib/commerce";
import LargeHeading from "@/ui/large-heading";
import { Button } from "@/components/ui/button";
import { Separator } from "@/ui/seperator";
import ProductList from "@/components/product-list";
import NoProduct from "@/components/no-product";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

interface ProductProps {
  params: { slug: string };
  searchParams?: any;
}

const Product = async ({
  params,
  searchParams,
}: ProductProps): Promise<any> => {
  if (params.slug === "all") {
    const { data: products } = await client.products.list();
    if (!products || products.length === 0) {
      return <NoProduct />;
    }
    return (
      <div>
        <LargeHeading size="xs">All Products</LargeHeading>
        <div className="pt-3 flex justify-between items-center">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline">Filter</Button>
            </SheetTrigger>
            <SheetContent position="right" size="lg">
              <SheetHeader>
                <SheetTitle>Filter Products</SheetTitle>
                <SheetDescription>10 products</SheetDescription>
              </SheetHeader>
            </SheetContent>
          </Sheet>
          <Select className="hidden md:flex">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort By" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="featured">Featured</SelectItem>
              <SelectItem value="best-selling">Best Selling</SelectItem>
              <SelectItem value="a-z">A-Z</SelectItem>
              <SelectItem value="z-a">Z-A</SelectItem>
              <SelectItem value="low-high">Low to High</SelectItem>
              <SelectItem value="high-low">Low to High</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Separator className="my-4" />
        <ProductList products={products} />
      </div>
    );
  }

  const category = await client.categories.retrieve(params.slug, {
    type: "slug",
  });
  const { data: products } = await client.products.list({
    category_slug: [params.slug],
  });
  if (!products || products.length === 0) {
    return <NoProduct />;
  }
  return (
    <div>
      <LargeHeading size="xs">{category.name}</LargeHeading>
      <Separator className="my-4" />
      <ProductList products={products} />
    </div>
  );
};

export default Product;
