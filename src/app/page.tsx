import { Button } from "@/ui/button";
import Paragraph from "@/ui/paragraph";
import LargeHeading from "@/ui/large-heading";
import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <div className="h-screen w-full flex flex-col md:flex-row">
      <div className="w-full md:w-1/2 h-full flex flex-col items-center justify-center">
        <LargeHeading className="text-center">Lavish Linen</LargeHeading>
        <Paragraph className="text-center">Mumbai, India</Paragraph>
        <Button size="lg">Shop Now</Button>
      </div>
      <div className="w-full md:w-1/2 h-full relative">
        <Image
          src="https://images.unsplash.com/photo-1590566996911-2d82c6b7e585?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80"
          alt="Lavish Linen"
          layout="fill"
          objectFit="cover"
          objectPosition="center"
          className="rounded-tl-lg rounded-br-lg"
        />
      </div>
    </div>
  );
}
