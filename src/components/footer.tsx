import { FC } from "react";
import { Icons } from "@/components/icons";
import { siteConfig } from "@/config/site";
import { footerConfig } from "@/config/footer";
import Link from "next/link";

interface ItemProps {
  href: string;
  children: React.ReactNode;
}

const Item = ({ href, children }: ItemProps) => {
  return (
    <Link href={href}>
      <p className="text-body-color hover:text-primary mb-2 inline-block text-base leading-loose">
        {children}
      </p>
    </Link>
  );
};

const Footer = () => {
  return (
    <footer className="relative z-10 border-t border-stone-900 bg-white">
      <div className="container max-w-7xl mx-auto p-5 md:p-10">
        <div className="-mx-4 flex flex-col md:flex-row justify-between">
          <div className="w-full px-4 sm:w-2/3 lg:w-3/12">
            <div className="mb-10 w-full">
              <Link href="/" className="mr-6 flex items-center space-x-2 mb-4">
                <Icons.logo className="h-6 w-6" />
                <span className="font-bold">{siteConfig.name}</span>
              </Link>
              <p className="text-body-color mb-7 text-base">
                Discover the Joy of Luxurious Living
              </p>
              <p className="text-dark flex items-center text-sm font-medium">
                <span className="text-primary mr-2">
                  <Icons.phone className="h-5 w-5" />
                </span>
                <span>+91 9850698000</span>
              </p>
            </div>
          </div>
          <div className="w-full px-4 sm:w-1/2 lg:w-2/12">
            <div className="mb-10 w-full">
              <h4 className="text-dark mb-3 text-lg font-semibold">Links</h4>
              <ul>
                {footerConfig.QuickLinks.map((item, index) => (
                  <li key={index}>
                    <Item href={item.href}>{item.title}</Item>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="w-full px-4 sm:w-1/2 lg:w-2/12">
            <div className="mb-10 w-full">
              <h4 className="text-dark mb-3 text-lg font-semibold">Policy</h4>
              <ul>
                {footerConfig.Policy.map((item, index) => (
                  <li key={index}>
                    <Item href={item.href}>{item.title}</Item>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="w-full px-4 sm:w-1/2 lg:w-2/12">
            <div className="mb-10 w-full">
              <h4 className="text-dark mb-3 text-lg font-semibold">
                Categories
              </h4>
              <ul>
                {footerConfig.ShopByCategory.map((item, index) => (
                  <li key={index}>
                    <Item href={item.href}>{item.title}</Item>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="w-full px-4 sm:w-1/2 lg:w-3/12">
            <div className="mb-10 w-full">
              <h4 className="text-dark mb-3 text-lg font-semibold">
                Follow Us On
              </h4>
              <div className="mb-6 flex items-center">
                <a
                  href={footerConfig.Social[0].href}
                  target="_blank"
                  rel="noreferrer"
                  className="text-dark hover:bg-primary hover:border-primary mr-3 flex h-8 w-8 items-center justify-center rounded-full border border-[#E5E5E5] hover:text-stone-500 sm:mr-4 lg:mr-3 xl:mr-4"
                >
                  <Icons.instagram className="h-4 w-4" />
                </a>
                <a
                  href={footerConfig.Social[1].href}
                  target="_blank"
                  rel="noreferrer"
                  className="text-dark hover:bg-primary hover:border-primary mr-3 flex h-8 w-8 items-center justify-center rounded-full border border-[#E5E5E5] hover:text-stone-500 sm:mr-4 lg:mr-3 xl:mr-4"
                >
                  <Icons.facebook className="h-4 w-4" />
                </a>
              </div>
              <p className="text-body-color text-base">
                &copy; 2023 {siteConfig.name}
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
