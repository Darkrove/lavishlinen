import React from "react";
import { Separator } from "./ui/seperator";
import { Token, ItemSelectedOption } from "@/types/checkout";

interface Props {
  token: Token | null;
  subTotal: string;
  shipping: string;
  total: string;
}

const OrderSummary = ({ token, subTotal, shipping, total }: Props) => {
  console.log(token);
  return (
    <div>
      <p className="text-sm text-slate-500 dark:text-slate-400 pb-2">
        Your order
      </p>
      <Separator className="my-2" />
      {token?.line_items.map((item, index) => {
        return (
          <div key={index} className="flex flex-col justify-between py-1">
            <div className="w-full flex justify-between py-1">
              <span className="text-sm text-stone-500 dark:text-stone-400">
                {item.name} X {item.quantity}
              </span>
              <span className="text-sm text-stone-500 dark:text-stone-400">
                {item.line_total.formatted_with_symbol}
              </span>
            </div>
            <span className="text-sm text-stone-500 dark:text-stone-400">
              {item.selected_options.map((option: ItemSelectedOption) => (
                <p
                  key={option.group_id}
                  className="font-color-light font-weight-small"
                >
                  {option.group_name}: {option.option_name}
                </p>
              ))}
            </span>
          </div>
        );
      })}
      <Separator className="my-2" />
      <div className="flex justify-between py-1">
        <span className="text-sm text-stone-500 dark:text-stone-400">
          Subtotal
        </span>
        <span className="text-sm text-stone-500 dark:text-stone-400">
          {token?.subtotal.formatted_with_symbol}
        </span>
      </div>
      <div className="flex justify-between py-1">
        <span className="text-sm text-stone-500 dark:text-stone-400">
          Shipping
        </span>
        <span className="text-sm text-stone-500 dark:text-stone-400">
          {shipping ? shipping : "₹0"}
        </span>
      </div>
      <Separator className="my-2" />
      <div className="flex justify-between">
        <span className="text-sm text-stone-500 dark:text-stone-400">
          Total
        </span>
        <span className="text-sm text-stone-500 dark:text-stone-400">
          {total ? total : "₹0"}
        </span>
      </div>
      <Separator className="my-2" />
    </div>
  );
};

export default OrderSummary;
