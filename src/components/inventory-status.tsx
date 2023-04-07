import React from "react";
import Alert from "@/ui/alert";
import { Icons } from "@/components/icons";

interface InventoryStatusProps {
  available: number;
}

const InventoryStatus = ({ available }: InventoryStatusProps) => {
  if (available === 0)
    return (
      <Alert variant="destructive" className="mt-4">
        <Icons.minusCircle className="w-4 h-4" />
        <span>Out of Stock</span>
      </Alert>
    );
  if (available < 10)
    return (
      <Alert variant="info" className="mt-4">
        <Icons.info className="w-4 h-4" />
        <span>Only {available} units left</span>
      </Alert>
    );

  return (
    <Alert variant="success" className="mt-4">
      <Icons.checkCircle className="w-4 h-4" />
      <span>In stock</span>
    </Alert>
  );
};

export default InventoryStatus;
