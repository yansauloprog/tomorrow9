import { Slot } from "@radix-ui/react-slot";
import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
}

export function Button({ asChild, className, ...props }: ButtonProps) {
  const Component = asChild ? Slot : "button";
  return (
    <Component
      className={cn(
        "inline-flex min-h-11 items-center justify-center gap-2 border border-transparent px-5 py-3 text-xs font-bold uppercase transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring disabled:pointer-events-none disabled:opacity-50",
        className,
      )}
      {...props}
    />
  );
}