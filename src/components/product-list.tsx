import * as React from "react";
import Image from "next/image";
import { FC } from "react";
import Paragraph from "@/ui/paragraph";
import LargeHeading from "@/ui/large-heading";
import Batch from "@/ui/batch";
import { Separator } from "@/ui/seperator";
import { Button } from "@/ui/button";
import { cn } from "@/lib/utils";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { ListMusic } from "lucide-react";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";

const playlists = [
  "Recently Added",
  "Recently Played",
  "Top Songs",
  "Top Albums",
  "Top Artists",
  "Logic Discography",
  "Bedtime Beats",
  "Feeling Happy",
  "I miss Y2K Pop",
  "Runtober",
  "Mellow Days",
  "Eminem Essentials",
];
interface ProductListProps {}

interface Album {
  name: string;
  artist: string;
  cover: string;
}

const listenNowAlbums: Album[] = [
  {
    name: "Powder Blue - Pure Linen slim fit Full  Sleeve Shirt",
    artist: "Rs. 1890.00",
    cover: "/products/ASP_8573.jpg",
  },
  {
    name: "Deep Green - Pure Linen slim fit Full  Sleeve Shirt",
    artist: "Rs. 1890.00",
    cover: "/products/ASP_8574.jpg",
  },
  {
    name: "Rust Orange - Pure Linen slim fit Full  Sleeve Shirt",
    artist: "Rs. 1890.00",
    cover: "/products/ASP_8598.jpg",
  },
  {
    name: "Cornflower Blue - Pure Linen slim fit Full Sleeve Shirt",
    artist: "Rs. 1890.00",
    cover: "/products/ASP_8616.jpg",
  },
  {
    name: "Navy Blue - Pure Linen slim fit Full  Sleeve Shirt",
    artist: "Rs. 1890.00",
    cover: "/products/ASP_8630.jpg",
  },
  {
    name: "Blue Floral digital print - Pure Linen slim fit Full  Sleeve Shirt",
    artist: "Rs. 1890.00",
    cover: "/products/ASP_8615.jpg",
  },
];

const ProductList: FC<ProductListProps> = ({}) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <Separator className="my-4" />
      <LargeHeading size="sm">Experience the Luxury</LargeHeading>
      <Separator className="my-4" />
      <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 justify-center">
        {listenNowAlbums.map((album) => (
          <AlbumArtwork
            key={album.name}
            album={album}
            className="w-[150px] md:w-[250px]"
          />
        ))}
      </div>
      <div className="flex w-full justify-center items-center my-6">
        <Button size="lg">View All</Button>
      </div>
    </div>
  );
};

export default ProductList;

interface AlbumArtworkProps extends React.HTMLAttributes<HTMLDivElement> {
  album: Album;
  aspectRatio?: number;
}

function AlbumArtwork({
  album,
  aspectRatio = 3 / 4,
  className,
  ...props
}: AlbumArtworkProps) {
  return (
    <div className={cn("mb-4 space-y-3", className)} {...props}>
      <AspectRatio ratio={aspectRatio} className="overflow-hidden rounded-md">
        <Image
          src={album.cover}
          alt={album.name}
          fill
          className="object-cover transition-all hover:scale-105"
        />
      </AspectRatio>
      <Batch>Sale</Batch>
      <div className="space-y-1 text-sm">
        <h3 className="font-medium leading-none">{album.name}</h3>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          {album.artist}
        </p>
      </div>
    </div>
  );
}
