"use client";
import { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

const CategoryFilter = (): JSX.Element => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" onClick={handleToggle}>
          Filter
        </Button>
      </SheetTrigger>
      <SheetContent position="right" size="lg">
        <SheetHeader>
          <SheetTitle>Filter Products</SheetTitle>
          <SheetDescription>10 products</SheetDescription>
        </SheetHeader>
        {/* Filter options go here */}
      </SheetContent>
    </Sheet>
  );
};

export default CategoryFilter;
