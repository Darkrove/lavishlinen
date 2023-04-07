import React from "react";
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
import Alert from "@/ui/alert";
import InventoryStatus from "@/components/inventory-status";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

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
        <InventoryStatus available={product.inventory.available} />
        <Paragraph className="font-bold">Quantity</Paragraph>
        <Quantity quantity={1} />
        <Paragraph className="font-bold">Size</Paragraph>
        <div className="flex flex-row space-x-2">
          <Button variant="outline" className="w-10 h-10">
            S
          </Button>
          <Button variant="outline" className="w-10 h-10">
            M
          </Button>
          <Button variant="outline" className="w-10 h-10">
            L
          </Button>
          <Button variant="outline" className="w-10 h-10">
            XL
          </Button>
        </div>
        <div className="my-3 flex flex-col space-y-3">
          <Button className="w-full  rounded-lg">Add To Cart</Button>
          <Button variant="subtle" className="w-full rounded-lg">
            Buy Now
          </Button>
        </div>
        <Accordion type="single" collapsible>
          <AccordionItem value="item-1">
            <AccordionTrigger>Materials</AccordionTrigger>
            <AccordionContent>
              100% Premiun Linen <br />
              Fabric Construction is{" "}
              <span className="font-semibold">60 Lea x 60 Lea</span>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>Shipping & Returns</AccordionTrigger>
            <AccordionContent>
              We offer free shipping on all prepaid orders within India.
              <br />
              COD order have standard shiping charges you will find on chekout.
              <br />
              Most of our orders are shipped within 1-2 days of purchase. Once
              your order is shipped, we estimate you will receive your order
              within 2-5 business days of its ship date.
              <br />
              Return - Easy 10 Days Return & Refund Policy we have And Size
              Change also we offer as per available stock.
              <br />
              Note - Fabric purchase is not available For return And exchnage.
              <br />
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger>Care Instructions</AccordionTrigger>
            <AccordionContent>
              Ideally :<br />
              Use mild Detergent
              <br />
              Hand wash or Short cycle alone
              <br />
              (15 to 30 minutes) or &quot;Delicate cycle&quot;.
              <br />
              Avoid :<br />
              Hot Wash
              <br />
              Dry Clean
              <br />
              Combo Wash
              <br />
              Tumble Dry
              <br />
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
};

export default ProductPage;
