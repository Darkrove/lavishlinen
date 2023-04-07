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
      <Button variant="outline" className="w-10 h-10">
        -
      </Button>
      <span>{value}</span>
      <Button variant="outline" className="w-10 h-10">
        +
      </Button>
    </div>
  );
};

export default Quantity;
