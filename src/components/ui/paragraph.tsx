import * as React from "react";
import { VariantProps, cva } from "class-variance-authority";

import { cn } from "@/lib/utils";

interface ParagraphProps
  extends React.HTMLAttributes<HTMLParagraphElement>,
    VariantProps<typeof paragraphVariants> {}

export const paragraphVariants = cva(
  "max-w-prose text-stone-700 dark:text-stone-300 mb-2 xt-left leading-relaxed",
  {
    variants: {
      size: {
        default: "text-base sm:text-lg",
        sm: "text-sm sm:text-base",
        xs: "text-[10px] sm:text-[12px]",
      },
    },
    defaultVariants: {
      size: "default",
    },
  }
);

const Paragraph = React.forwardRef<HTMLParagraphElement, ParagraphProps>(
  ({ className, size, children, ...props }, ref) => {
    return (
      <p
        ref={ref}
        {...props}
        className={cn(paragraphVariants({ size, className }))}
      >
        {children}
      </p>
    );
  }
);

Paragraph.displayName = "Paragraph";

export default Paragraph;
