import { ReactNode } from "react";
import LargeHeading from "@/ui/large-heading";
import Paragraph from "@/ui/paragraph";
import { Button } from "@/ui/button";

interface Props {}

const TrendingProducts: React.FC<Props> = ({}) => {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      <div className="p-4 rounded-lg bg-green-200">
        <div className="flex h-full flex-col justify-end ">
          <LargeHeading size="sm">Eco-friendly 🌍</LargeHeading>
          <Paragraph>
            Linen is a sustainable and eco-friendly material, as it is made from
            the flax plant and requires less water and chemicals to produce
            compared to other materials.
          </Paragraph>
        </div>
      </div>
      <div className="flex flex-col justify-between">
        <div className="bg-yellow-200 text-white rounded-lg p-4 mb-4">
          <LargeHeading size="xs">Comfort 👕</LargeHeading>
          <Paragraph>
            Linen is a soft and comfortable fabric that gets softer with each
            wash, making it a popular choice for people who prioritize comfort
            in their clothing.
          </Paragraph>
        </div>
        <div className="flex justify-between">
          <div className="bg-red-200 rounded-lg p-4 mr-2 flex flex-col justify-between w-full">
            <div>
              <LargeHeading size="xs">New Arrivals</LargeHeading>
              <Paragraph>Check out our latest arrivals for men.</Paragraph>
            </div>
            <Button size="sm" className="bg-red-500">
              View Collection
            </Button>
          </div>
          <div className="bg-violet-200 rounded-lg p-4 ml-2 flex flex-col justify-between w-full">
            <div>
              <LargeHeading size="xs">Trending Now</LargeHeading>
              <Paragraph>Get the hottest product of the season!</Paragraph>
            </div>
            <Button size="sm" className="bg-violet-500">
              Shop Now
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrendingProducts;
