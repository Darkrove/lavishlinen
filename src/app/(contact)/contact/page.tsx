import Paragraph from "@/ui/paragraph";
import LargeHeading from "@/ui/large-heading";
import React from "react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/ui/seperator";
import { Icons } from "@/components/icons";

interface Props {}

const contact = () => {
  return (
    <div className="flex flex-col justify-start">
      <LargeHeading size="sm">Contact us</LargeHeading>
      <Paragraph>
        Whether you’re looking for assistance, have any query or just want to
        let us know how we did, you can contact us easily via 👇
      </Paragraph>
      <div className="flex space-x-3 w-full">
        <Button className="bg-green-500 w-full">
          <a
            className="flex space-x-2 justify-center items-center w-full"
            href="https://wa.me/9850698000?text=I%20have%20a%20query%20regarding%20your%20product."
            target="_blank"
            rel="noreferrer"
          >
            <Icons.whatsapp className="w-4 h-4" />
            <span>Chat on Whatsapp</span>
          </a>
        </Button>
        <Button className="bg-blue-500 w-full ">
          <a
            className="flex space-x-2 justify-center items-center w-full"
            href="mailto:hello@lavishlinen.com?subject = Feedback&body = I have a query regarding your product."
            target="_blank"
            rel="noreferrer"
          >
            <Icons.gmail className="w-5 h-5" />
            <span>Email Me</span>
          </a>
        </Button>
      </div>
      <Separator className="my-4" />
      <LargeHeading size="sm">Or</LargeHeading>
      <Paragraph>
        Alternatively, you could also take a look at our FAQs for answers to
        your questions.
      </Paragraph>
    </div>
  );
};

export default contact;
