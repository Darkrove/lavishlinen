import React from "react";
import { VariantProps, cva } from "class-variance-authority";
import { cn } from "@/lib/utils";
import Paragraph from "@/ui/paragraph";

const alertVariants = cva(
  "rounded-lg no-underline group-hover:no-underline my-2 flex flex-row justify-start items-center",
  {
    variants: {
      variant: {
        default:
          "bg-teal-100 text-teal-800 dark:bg-teal-800 dark:text-teal-100",
        destructive:
          "bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100",
        info: "bg-yellow-100 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-100",
        success:
          "bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100",
      },
      size: {
        sm: "text-xs p-2",
        md: "text-sm p-3",
        lg: "text-base p-4",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
);

interface AlertProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof alertVariants> {}

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  ({ className, variant, size, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        {...props}
        className={cn(alertVariants({ variant, size, className }))}
      >
        <Paragraph
          size="sm"
          className="flex flex-row justify-start items-center space-x-2 mb-0"
        >
          {children}
        </Paragraph>
      </div>
    );
  }
);

Alert.displayName = "Alert";

export default Alert;
