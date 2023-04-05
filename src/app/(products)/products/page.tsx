import { FC } from "react";
import ProductList from "@/components/product-list";
import client from "@/lib/commerce";

const page = async ({}) => {
  const { data: products } = await client.products.list();
  return (
    <div>
      <ProductList products={products} />
    </div>
  );
};

export default page;
