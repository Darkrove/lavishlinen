import { FC } from "react";
import * as React from "react";
import { VariantProps, cva } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "rounded-md px-1.5 py-0.5 text-xs no-underline group-hover:no-underline dark:text-slate-900",
  {
    variants: {
      variant: {
        default:
          "bg-teal-100 text-teal-800 dark:bg-teal-800 dark:text-teal-100",
        destructive:
          "bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100",
        outline: "bg-transparent border border-stone-800",
        info: "bg-yellow-100 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-100",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant, children, ...props }, ref) => {
    return (
      <span
        ref={ref}
        {...props}
        className={cn(badgeVariants({ variant, className }))}
      >
        {children}
      </span>
    );
  }
);

Badge.displayName = "Badge";

export default Badge;
