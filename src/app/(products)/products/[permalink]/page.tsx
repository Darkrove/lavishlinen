import React, { useState } from "react";
import Image from "next/image";
import client from "@/lib/commerce";
import LargeHeading from "@/ui/large-heading";
import { Button } from "@/ui/button";
import Paragraph from "@/ui/paragraph";
import { AspectRatio } from "@/ui/aspect-ratio";
import { Separator } from "@/ui/seperator";
import Badge from "@/ui/badge";
import { Icons } from "@/components/icons";
import Quantity from "@/components/quantity";

interface ProductPageProps {
  params: { permalink: string };
  searchParams?: any;
}

const ProductPage = async ({
  params,
  searchParams,
}: ProductPageProps): Promise<any> => {
  const product = await client.products.retrieve(params.permalink, {
    type: "permalink",
  });

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <Image
          src={product.assets[0].url}
          alt={product.name}
          height={600}
          width={600}
          className="rounded-xl"
        />
      </div>
      <div>
        <div className="flex flex-row justify-between items-center">
          <Paragraph size="xs" className="uppercase">
            SKU - {product.sku}
          </Paragraph>
          <Paragraph size="xs" className="uppercase">
            ID - {product.id}
          </Paragraph>
        </div>
        <LargeHeading size="sm">{product.name}</LargeHeading>
        <Paragraph className="lowercase">
          {product.description.replace("<p>", "").replace("</p>", "")}
        </Paragraph>
        <Separator className="my-4" />
        <div className="flex flex-row justify-between items-center">
          <div className="flex flex-col justify-between items-start">
            <Paragraph size="sm" className="">
              Fabric
            </Paragraph>
            <Paragraph size="sm" className="font-bold">
              Pure Linen
            </Paragraph>
          </div>
          <div className="flex flex-col justify-between items-start">
            <Paragraph size="sm" className="">
              GSM
            </Paragraph>
            <Paragraph size="sm" className="font-bold">
              129 gsm
            </Paragraph>
          </div>
          <div className="flex flex-col justify-between items-start">
            <Paragraph size="sm" className="">
              Width
            </Paragraph>
            <Paragraph size="sm" className="font-bold">
              --
            </Paragraph>
          </div>
        </div>
        <Separator className="my-4" />
        <div className="flex flex-row space-x-2">
          <Paragraph
            className={`${
              product.inventory.available < 10 ? "text-red-900" : ""
            }`}
          >
            {product.price.formatted_with_symbol}
          </Paragraph>
          <Paragraph className="line-through">₹3299.00</Paragraph>
          <Paragraph>
            <Badge variant="destructive" size="lg">
              Sale
            </Badge>
          </Paragraph>
        </div>
        <Paragraph size="xs">
          Tax included. Shipping calculated at checkout.
        </Paragraph>
        {product.inventory.available < 10 ? (
          <div className="bg-red-100 rounded-lg p-3 my-2 flex flex-row justify-start items-center">
            <Paragraph
              size="sm"
              className="text-red-900 flex flex-row justify-start items-center space-x-2 mb-0"
            >
              <Icons.info className="w-4 h-4" />
              <span>Only {product.inventory.available} units left</span>
            </Paragraph>
          </div>
        ) : (
          <div className="bg-green-100 rounded-lg p-3 my-2 flex flex-row justify-start items-center">
            <Paragraph
              size="sm"
              className="text-green-900 flex flex-row justify-start items-center space-x-2 mb-0"
            >
              <Icons.checkCircle className="w-4 h-4" />
              <span>In stock</span>
            </Paragraph>
          </div>
        )}
        <Paragraph className="font-bold">Quantity</Paragraph>
        <Quantity quantity={1} />
        <Button className="w-full my-3 rounded-xl">Add To Cart</Button>
      </div>
    </div>
  );
};

export default ProductPage;
