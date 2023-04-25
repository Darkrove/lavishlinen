"use client";
import React, { useState, useEffect } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface CategorySorterProps {
  onSortChange: (sortType: string) => void;
}

const CategorySorter = ({ onSortChange }: CategorySorterProps): JSX.Element => {
  const [sortType, setSortType] = useState("");
  useEffect(() => {
    onSortChange(sortType);
  }, [sortType, onSortChange]);

  return (
    <Select value={sortType} onValueChange={setSortType}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Sort By" aria-label={sortType}>
          {sortType ? sortType : "Sort By"}
        </SelectValue>
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="featured">Featured</SelectItem>
        <SelectItem value="best-selling">Best Selling</SelectItem>
        <SelectItem value="a-z">A-Z</SelectItem>
        <SelectItem value="z-a">Z-A</SelectItem>
        <SelectItem value="low-high">Low to High</SelectItem>
        <SelectItem value="high-low">High to Low</SelectItem>
      </SelectContent>
    </Select>
  );
};

export default CategorySorter;
