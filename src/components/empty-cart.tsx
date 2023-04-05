import { FC } from "react";
import Link from "next/link";
import Paragraph from "@/ui/paragraph";
import LargeHeading from "@/ui/large-heading";
import { Button } from "@/ui/button";
import { Icons } from "@/components/icons";

interface EmptyCartProps {}

const EmptyCart: FC<EmptyCartProps> = ({}) => {
  return (
    <div className="flex h-full flex-col items-center justify-center mt-8 space-x-2">
      <Icons.emptyCart className="text-gray-500" />
      <div className="flex flex-col justify-center items-center p-4">
        <LargeHeading size="xs">Your cart is empty</LargeHeading>
        <Paragraph className="text-gray-500 mt-2 text-center">
          Looks like you havent added anything to your cart yet.
        </Paragraph>
        <Link href="/products">
          <Button variant="outline">Start Shopping</Button>
        </Link>
      </div>
    </div>
  );
};

export default EmptyCart;
