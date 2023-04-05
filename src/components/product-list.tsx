import * as React from "react";
import { FC } from "react";
import LargeHeading from "@/ui/large-heading";
import { Button } from "@/ui/button";
import ProductCard from "@/ui/product-card";

interface ProductListProps {
  products: Product[];
}

interface Product {
  id: string;
  name: string;
  price: {
    raw: number;
    formatted: string;
    formatted_with_symbol: string;
    formatted_with_code: string;
  };
  image: {
    url: string;
  };
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
            className="w-full"
          />
        ))}
      </div>
    </div>
  );
};

export default ProductList;
