import { FC } from "react";
import { cn } from "@/lib/utils";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import Image from "next/image";
import Badge from "@/components/ui/badge";

interface Product {
  name: string;
  price: string;
  cover: string;
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
    <div className={cn("mb-4 space-y-3", className)} {...props}>
      <AspectRatio ratio={aspectRatio} className="overflow-hidden rounded-md">
        <Image
          src={product.cover}
          alt={product.name}
          fill
          className="object-cover transition-all hover:scale-105"
        />
      </AspectRatio>
      <Badge variant="destructive">Sale</Badge>
      <div className="space-y-1 text-sm">
        <h3 className="font-medium leading-none">{product.name}</h3>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          {product.price}
        </p>
      </div>
    </div>
  );
};

export default ProductCard;
