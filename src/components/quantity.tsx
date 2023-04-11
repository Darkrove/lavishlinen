"use client";
import { useState } from "react";
import { Button } from "@/ui/button";
import { Icons } from "@/components/icons";

type QuantityProps = {
  quantity: number;
  plusClickAction: () => void;
  minusClickAction: () => void;
};

const Quantity: React.FC<QuantityProps> = ({
  quantity,
  plusClickAction,
  minusClickAction,
}) => {
  return (
    <div className="flex items-center justify-start space-x-4">
      <Button
        variant="outline"
        size="sm"
        className="w-9"
        onClick={minusClickAction}
      >
        <Icons.minus className="w-4 h-4" />
      </Button>
      <span>{quantity}</span>
      <Button
        variant="outline"
        size="sm"
        className="w-9"
        onClick={plusClickAction}
      >
        <Icons.plus className="w-4 h-4" />
      </Button>
    </div>
  );
};

export default Quantity;
