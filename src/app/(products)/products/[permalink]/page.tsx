import React from "react";
import Image from "next/image";
import { Separator } from "@/ui/seperator";
import ProductList from "@/components/product-list";
import LargeHeading from "@/components/ui/large-heading";
import client from "@/lib/commerce";
import ProductInfo from "@/components/product-info";
import ProductDetailsCarousel from "@/components/product-details-carousel";

interface ProductPageProps {
  params: { permalink: string };
  searchParams?: any;
}

const ProductPage = async ({
  params,
  searchParams,
}: ProductPageProps): Promise<any> => {
  const product = await client.products.retrieve(params.permalink, {
    type: "permalink",
  });
  const variants = await client.products.getVariants(product.id);

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className=" max-h-[700px]">
          <ProductDetailsCarousel images={product.assets} />
        </div>
        <ProductInfo product={product} variants={variants} />
      </div>
      <div className="pt-5">
        <Separator className="my-4" />
        <LargeHeading size="sm">Similar products</LargeHeading>
        <Separator className="my-4" />
        <div>
          <ProductList products={product.related_products} />
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
