import React from "react";
import Image from "next/image";
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
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className=" max-h-[700px]">
        {/* <Image
          src={product.assets[0].url}
          alt={product.name}
          height={600}
          width={600}
          className="rounded-xl"
        /> */}
        <ProductDetailsCarousel images={product.assets} />
      </div>
      <ProductInfo product={product} variants={variants} />
    </div>
  );
};

export default ProductPage;
