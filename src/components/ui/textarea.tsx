import * as React from "react";

import { cn } from "@/lib/utils";

export type TextareaProps =
  React.TextareaHTMLAttributes<HTMLTextAreaElement>;

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => (
    <textarea
      ref={ref}
      className={cn(
        "min-h-[140px] w-full resize-y rounded-md border border-base-600 bg-base-800 px-3 py-2 text-sm text-base-100 placeholder:text-base-400 focus:border-accent-500 focus:outline-none focus:ring-2 focus:ring-accent-500 focus:ring-offset-2 focus:ring-offset-base-900",
        className
      )}
      {...props}
    />
  )
);

Textarea.displayName = "Textarea";
