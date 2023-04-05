import { FC } from "react";
import client from "@/lib/commerce";
import LargeHeading from "@/ui/large-heading";
import { Separator } from "@/ui/seperator";
import ProductList from "@/components/product-list";
import NoProduct from "@/components/no-product";

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
