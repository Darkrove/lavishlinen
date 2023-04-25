"use client";
import { useState, useEffect } from "react";
import client from "@/lib/commerce";
import LargeHeading from "@/ui/large-heading";
import { Button } from "@/components/ui/button";
import { Separator } from "@/ui/seperator";
import ProductList from "@/components/product-list";
import NoProduct from "@/components/no-product";
import CategoryFilter from "@/components/category-filter";
import CategorySorter from "@/components/category-sorter";
import { Product } from "@/types/product";
import LoadingSkeleton from "@/components/loading-skeleton";

interface CategoryPageProps {
  params: { slug: string };
  searchParams?: any;
}

const CategoryPage = ({ params }: CategoryPageProps): JSX.Element => {
  const [category, setCategory] = useState<any>();
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      if (params.slug === "all") {
        const { data } = await client.products.list();
        setProducts(data || []);
      } else {
        const { data } = await client.categories.retrieve(params.slug, {
          type: "slug",
        });
        setCategory(data);
        const { data: products } = await client.products.list({
          category_slug: [params.slug],
        });
        setProducts(products || []);
      }

      setIsLoading(false);
    };

    fetchData();
  }, [params.slug]);

  if (isLoading) {
    return <LoadingSkeleton />;
  }

  if (products.length === 0) {
    return <NoProduct />;
  }

  const applySorter = (filter: string) => {
    let productData: Product[] = [];

    // Make a copy of the original products array
    const productsCopy = [...products];

    switch (filter) {
      case "featured":
        productData = productsCopy;
        return productData;
      case "best-selling":
        productData = productsCopy;
        setProducts(productData);
        return productData;
      case "a-z":
        productData = productsCopy.sort((a: any, b: any) =>
          a.name.localeCompare(b.name)
        );
        setProducts(productData);
        return productData;
      case "z-a":
        productData = productsCopy.sort((a: any, b: any) =>
          b.name.localeCompare(a.name)
        );
        setProducts(productData);
        return productData;
      case "low-high":
        productData = productsCopy.sort(
          (a: any, b: any) => a.price.raw - b.price.raw
        );
        setProducts(productData);
        return productData;
      case "high-low":
        productData = productsCopy.sort(
          (a: any, b: any) => b.price.raw - a.price.raw
        );
        setProducts(productData);
        return productData;
      default:
        return products;
    }
  };

  return (
    <div>
      {category && <LargeHeading size="xs">{category.name}</LargeHeading>}
      {!category && <LargeHeading size="xs">All Products</LargeHeading>}
      <div className="pt-3 flex justify-between items-center">
        <CategoryFilter />
        <CategorySorter onSortChange={applySorter} />
      </div>
      <Separator className="my-4" />
      <ProductList products={products} />
    </div>
  );
};

export default CategoryPage;
