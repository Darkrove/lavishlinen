import * as React from "react";
import { FC } from "react";
import LargeHeading from "@/ui/large-heading";
import { Button } from "@/ui/button";
import ProductCard from "@/ui/product-card";
import { Product } from "@/types/product";

interface ProductListProps {
  products: Product[];
}

const ProductList: FC<ProductListProps> = ({ products }) => {
  return (
    <div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 justify-between">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            name={product.name}
            price={product.price.formatted_with_symbol}
            imageUrl={product.image.url}
            permalink={product.permalink}
            createdAt={product.created}
            className="w-full"
          />
        ))}
      </div>
    </div>
  );
};

export default ProductList;
