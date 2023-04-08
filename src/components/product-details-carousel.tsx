import React from "react";

import { Carousel } from "react-responsive-carousel";
import Image from "next/image";

interface Image {
  id: string;
  url: string;
  filename: string;
}

interface Props {
  images: Image[];
}

const ProductDetailsCarousel = ({ images }: Props) => {
  console.log(images);
  return (
    <div className="text-white text-[20px] w-full max-w-[1360px] mx-auto sticky top-[50px]">
      <Carousel
        infiniteLoop={true}
        showIndicators={false}
        showStatus={false}
        thumbWidth={60}
        className="productCarousel"
      >
        {images?.map((img) => (
          <div
            key={img.id}
            style={{ position: "relative", width: "100%", height: "100%" }}
          >
            <Image
              src={img.url}
              alt={img.filename}
              layout="fill"
              objectFit="contain"
              quality={100}
            />
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default ProductDetailsCarousel;
