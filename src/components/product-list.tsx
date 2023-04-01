import * as React from "react";
import { FC } from "react";
import LargeHeading from "@/ui/large-heading";
import { Separator } from "@/ui/seperator";
import { Button } from "@/ui/button";
import ProductCard from "@/ui/product-card";

interface ProductListProps {}

interface Product {
  name: string;
  price: string;
  cover: string;
  sale?: boolean;
}

const productList: Product[] = [
  {
    name: "Powder Blue - Pure Linen slim fit Full  Sleeve Shirt",
    price: "Rs. 1890.00",
    cover: "/products/ASP_8573.jpg",
    sale: true,
  },
  {
    name: "Deep Green - Pure Linen slim fit Full  Sleeve Shirt",
    price: "Rs. 1890.00",
    cover: "/products/ASP_8574.jpg",
  },
  {
    name: "Rust Orange - Pure Linen slim fit Full  Sleeve Shirt",
    price: "Rs. 1890.00",
    cover: "/products/ASP_8598.jpg",
    sale: true,
  },
  {
    name: "Cornflower Blue - Pure Linen slim fit Full Sleeve Shirt",
    price: "Rs. 1890.00",
    cover: "/products/ASP_8616.jpg",
  },
  {
    name: "Navy Blue - Pure Linen slim fit Full  Sleeve Shirt",
    price: "Rs. 1890.00",
    cover: "/products/ASP_8630.jpg",
    sale: true,
  },
  {
    name: "Blue Floral digital print - Pure Linen slim fit Full  Sleeve Shirt",
    price: "Rs. 1890.00",
    cover: "/products/ASP_8615.jpg",
  },
];

const ProductList: FC<ProductListProps> = ({}) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <Separator className="my-4" />
      <LargeHeading size="sm">Experience the Luxury</LargeHeading>
      <Separator className="my-4" />
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 justify-between">
        {productList.map((product) => (
          <ProductCard
            key={product.name}
            product={product}
            className="w-full"
          />
        ))}
      </div>
      <div className="flex w-full justify-center items-center my-6">
        <Button size="lg">View All</Button>
      </div>
    </div>
  );
};

export default ProductList;
