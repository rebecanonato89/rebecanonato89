import * as React from "react";
import { Slot } from "@radix-ui/react-slot";

import { cn } from "@/lib/utils";

export type ButtonProps = React.ComponentPropsWithoutRef<"button"> & {
  variant?: "solid" | "outline" | "ghost";
  size?: "sm" | "md";
  asChild?: boolean;
};

const variants: Record<NonNullable<ButtonProps["variant"]>, string> = {
  solid:
    "bg-accent-500 text-base-900 hover:bg-accent-600 focus-visible:ring-accent-500",
  outline:
    "border border-base-500 text-base-100 hover:border-accent-500 hover:text-accent-500 focus-visible:ring-accent-500",
  ghost:
    "text-base-200 hover:text-base-100 hover:bg-base-700 focus-visible:ring-accent-500",
};

const sizes: Record<NonNullable<ButtonProps["size"]>, string> = {
  sm: "h-9 px-3 text-sm",
  md: "h-11 px-4 text-sm",
};

export const Button = React.forwardRef<React.ElementRef<"button">, ButtonProps>(
  ({ className, variant = "solid", size = "md", asChild, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";

    return (
      <Comp
      ref={ref}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-md font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-base-900 disabled:cursor-not-allowed disabled:opacity-60",
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    />
    );
  }
);

Button.displayName = "Button";
