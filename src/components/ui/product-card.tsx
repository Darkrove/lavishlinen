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
  name: string;
  price: string;
  imageUrl: string;
  sale?: boolean;
  aspectRatio?: number;
}

const ProductCard: FC<ProductCardProps> = ({
  name,
  price,
  imageUrl,
  sale,
  aspectRatio = 3 / 4,
  className,
  ...props
}) => {
  return (
    <div className={cn("bg-stone-100 rounded-md", className)} {...props}>
      <AspectRatio
        ratio={aspectRatio}
        className="relative overflow-hidden rounded-t-md"
      >
        <Image
          src={imageUrl}
          alt={name}
          fill
          className="object-cover transition-all hover:scale-105"
        />
        {sale && (
          <div className="absolute top-0 left-0 mt-2 ml-2">
            <Badge variant="destructive" size="sm">
              Sale
            </Badge>
          </div>
        )}
      </AspectRatio>
      <div className="space-y-1 text-sm font-sans p-4">
        <h3 className="font-bold leading-tight">{name}</h3>
        <p className="text-xs text-gray-500">{price}</p>
      </div>
    </div>
  );
};

export default ProductCard;
