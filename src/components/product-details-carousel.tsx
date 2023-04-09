"use client";
import React, { Component } from "react";
import ReactDOM from "react-dom";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import { AspectRatio } from "@/ui/aspect-ratio";

interface Image {
  id: number;
  url: string;
  filename: string;
}

interface Props {
  images: Image[];
}
const DemoCarousel = ({ images }: Props) => {
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
        {/* <img src="/products/ASP_8573.jpg" />
        <img src="/products/ASP_8573.jpg" />
        <img src="/products/ASP_8573.jpg" />
        <img src="/products/ASP_8573.jpg" /> */}
        {images.map((image) => (
          <div key={image.id} className="flex items-center justify-center">
            <img
              src={image.url}
              alt={image.filename}
              className="object-contain max-h-full max-w-full rounded-lg"
            />
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default DemoCarousel;
