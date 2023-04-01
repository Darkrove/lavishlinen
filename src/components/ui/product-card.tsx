import { FC } from "react";
import { cn } from "@/lib/utils";
import { AspectRatio } from "@/ui/aspect-ratio";
import { Button } from "@/ui/button";
import { Icons } from "@/components/icons";
import Image from "next/image";
import Badge from "@/ui/badge";

interface Product {
  name: string;
  price: string;
  cover: string;
  sale?: boolean;
}

interface ProductCardProps extends React.HTMLAttributes<HTMLDivElement> {
  product: Product;
  aspectRatio?: number;
}

const ProductCard: FC<ProductCardProps> = ({
  product,
  aspectRatio = 3 / 4,
  className,
  ...props
}) => {
  return (
    <div
      className={cn("bg-[#fbf7f5] rounded-md shadow-md", className)}
      {...props}
    >
      <AspectRatio
        ratio={aspectRatio}
        className="relative overflow-hidden rounded-t-md"
      >
        <Image
          src={product.cover}
          alt={product.name}
          fill
          className="object-cover transition-all hover:scale-105"
        />
        {product.sale && (
          <div className="absolute top-0 left-0 mt-2 ml-2">
            <Badge variant="destructive" size="sm">
              Sale
            </Badge>
          </div>
        )}
        <div className="absolute bottom-0 right-0 mb-2 mr-2">
          <Button
            size="sm"
            className="rounded-full py-2 bg-white hover:bg-white"
          >
            <Icons.shoppingCart className="text-gray-700 h-5 w-5" />
          </Button>
        </div>
      </AspectRatio>
      <div className="space-y-1 text-sm font-sans p-4">
        <h3 className="font-bold leading-tight">{product.name}</h3>
        <p className="text-xs text-gray-500">{product.price}</p>
      </div>
    </div>
  );
};

export default ProductCard;
