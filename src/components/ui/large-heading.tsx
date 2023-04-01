import * as React from "react";
import { VariantProps, cva } from "class-variance-authority";

import { cn } from "@/lib/utils";

interface LargeHeadingPrpops
  extends React.HTMLAttributes<HTMLHeadingElement>,
    VariantProps<typeof largeHeadingVariants> {}

export const largeHeadingVariants = cva(
  "text-black dark:text-white text-left font-extrabold leading-tight tracking-tighter",
  {
    variants: {
      size: {
        default: "text-4xl md:text-5xl lg:text-6xl",
        sm: "text-2xl md:text-3xl lg:text-4xl",
        lg: "text-5xl md:text-6xl ld:text-7xl",
      },
    },
    defaultVariants: {
      size: "default",
    },
  }
);

const LargeHeading = React.forwardRef<HTMLHeadingElement, LargeHeadingPrpops>(
  ({ className, size, children, ...props }, ref) => {
    return (
      <h1
        ref={ref}
        {...props}
        className={cn(largeHeadingVariants({ size, className }))}
      >
        {children}
      </h1>
    );
  }
);

LargeHeading.displayName = "LargeHeading";

export default LargeHeading;
