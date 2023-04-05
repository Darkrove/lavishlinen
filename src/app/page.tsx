import Link from "next/link";
import { Button } from "@/ui/button";
import Paragraph from "@/ui/paragraph";
import LargeHeading from "@/ui/large-heading";
import ProductList from "@/components/product-list";
import client from "@/lib/commerce";
import { Separator } from "@/ui/seperator";
import TrendingProducts from "@/components/trending-products";
import Image from "next/image";

export default async function Home() {
  const { data: products } = await client.products.list();
  return (
    <div>
      <div className="h-screen max-h-[800px] w-full flex flex-col md:flex-row">
        <div className="w-full md:w-1/2 h-full flex flex-col items-center px-4 pt-4 pb-2 md:py-10 md:pl-10 md:pr-5 justify-center">
          <div className="rounded-3xl overflow-hidden p-4 bg-stone-200 flex flex-col items-center justify-center w-full h-full ">
            <LargeHeading className="text-center">Lavish Linen</LargeHeading>
            <Paragraph className="text-center">
              Discover the Joy of Luxurious Living
            </Paragraph>
            <Button size="lg">Shop Now</Button>
          </div>
        </div>
        <div className="w-full md:w-1/2 h-full px-4 pt-2 pb-4 md:py-10 md:pl-5 md:pr-10 ">
          <div className="relative h-full aspect-w-2 aspect-h-1">
            <Image
              src="https://images.unsplash.com/photo-1639690265149-d70d289a6638?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1374&q=80"
              alt="Lavish Linen"
              layout="fill"
              objectFit="cover"
              objectPosition="center"
              className="rounded-3xl"
            />
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Separator className="my-4" />
        <LargeHeading size="xs">Experience the Luxury</LargeHeading>
        <Separator className="my-4" />
        <ProductList products={products} />
        <div className="flex w-full justify-center items-center mt-4">
          <Link href="/categories/all">
            <Button size="lg">View All</Button>
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <TrendingProducts />
      </div>
    </div>
  );
}
