import React from "react";
import Image from "next/image";
import client from "@/lib/commerce";
import ProductInfo from "@/components/product-info";

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
  console.log(product);
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <Image
          src={product.assets[0].url}
          alt={product.name}
          height={600}
          width={600}
          className="rounded-xl"
        />
      </div>
      <ProductInfo product={product} />
    </div>
  );
};

export default ProductPage;
