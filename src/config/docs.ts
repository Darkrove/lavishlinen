import { MainNavItem, SidebarNavItem } from "@/types/nav";

interface DocsConfig {
  mainNav: MainNavItem[];
  sidebarNav: SidebarNavItem[];
}

export const docsConfig: DocsConfig = {
  mainNav: [
    {
      title: "Home",
      href: "/",
    },
    {
      title: "Contact",
      href: "/contact",
    },
    {
      title: "Track Order",
      href: "/",
    },
  ],
  sidebarNav: [
    {
      title: "Shop All",
      items: [
        {
          title: "Full Sleeve Shirts",
          href: "/",
          items: [],
        },
        {
          title: "Pure Linen Fabric",
          href: "/",
          items: [],
        },
        { title: "Half Sleeve Shirts", href: "/", items: [] },
      ],
    },
    {
      title: "Social",
      items: [
        {
          title: "Instagram",
          href: "https://www.instagram.com/lavish_linen_/",
          external: true,
          items: [],
        },
        {
          title: "Faecbook",
          href: "https://www.facebook.com/people/lavish_linen_/100089931697810/",
          external: true,
          items: [],
        },
      ],
    },
  ],
};
