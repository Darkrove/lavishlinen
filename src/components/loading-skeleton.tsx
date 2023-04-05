import React from "react";
import { Separator } from "@/ui/seperator";
import { AspectRatio } from "@/ui/aspect-ratio";

const ProductCard = () => (
  <div className={"bg-stone-100 rounded-md w-full"}>
    <AspectRatio
      ratio={3 / 4}
      className="relative overflow-hidden rounded-t-md"
    >
      <div className="object-cover w-full h-full bg-gradient-to-r from-transparent to-gray-200 loading" />
    </AspectRatio>
    <div className="space-y-1 text-sm font-sans p-4">
      <div className="h-4 w-full bg-gradient-to-r from-transparent to-gray-200 loading" />
      <div className="h-4 w-1/2 bg-gradient-to-r from-transparent to-gray-200 loading" />
    </div>
  </div>
);

const LoadingSkeleton = () => {
  return (
    <div>
      <div className="h-7 md:h-9 w-1/2 md:w-1/4 bg-gradient-to-r from-transparent to-gray-200 loading" />
      <Separator className="my-4" />
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 justify-between">
        {[0, 1, 2, 3].map((id) => (
          <ProductCard key={id} />
        ))}
      </div>
    </div>
  );
};

export default LoadingSkeleton;
