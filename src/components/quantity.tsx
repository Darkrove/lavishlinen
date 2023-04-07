"use client";
import { useState } from "react";
import { Button } from "@/ui/button";

type QuantityProps = {
  quantity: number;
};

const Quantity: React.FC<QuantityProps> = ({ quantity }) => {
  const [value, setValue] = useState(quantity);

  return (
    <div className="flex items-center justify-start space-x-4">
      <Button className="bg-white text-stone-900">-</Button>
      <span>{value}</span>
      <Button className="bg-white text-stone-900">+</Button>
    </div>
  );
};

export default Quantity;
