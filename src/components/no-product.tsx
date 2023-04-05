import { FC } from "react";
import Link from "next/link";
import Paragraph from "@/ui/paragraph";
import LargeHeading from "@/ui/large-heading";
import { Button } from "@/ui/button";
import { Icons } from "@/components/icons";

interface NoProductProps {}

const NoProduct: FC<NoProductProps> = ({}) => {
  return (
    <div className="flex flex-col h-full items-center justify-center mt-8 space-x-2">
      <Icons.emptyBox className="text-gray-500" />
      <div className="flex flex-col justify-center items-center p-4">
        <LargeHeading size="xs">No Product Found</LargeHeading>
        <Paragraph className="text-gray-500 mt-2">
          You can try our different products.
        </Paragraph>
        <Link href="/products">
          <Button variant="outline">View Other Products</Button>
        </Link>
      </div>
    </div>
  );
};

export default NoProduct;
