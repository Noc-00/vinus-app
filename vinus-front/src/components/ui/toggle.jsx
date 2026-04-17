"use client"

import * as React from "react"
import * as TogglePrimitive from "@radix-ui/react-toggle"
import { cva } from "class-variance-authority"
import { cn } from "@/lib/utils"

const toggleVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-xl text-sm font-black uppercase tracking-tight transition-all duration-200 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/10 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-transparent hover:bg-muted/50 text-foreground data-[state=on]:bg-primary/10 data-[state=on]:text-primary",
        outline:
          "border border-border/40 bg-transparent shadow-sm hover:bg-muted/50 data-[state=on]:bg-primary data-[state=on]:text-primary-foreground data-[state=on]:border-primary",
      },
      size: {
        default: "h-11 px-4 min-w-11",
        sm: "h-9 px-3 min-w-9 text-xs",
        lg: "h-14 px-6 min-w-14",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

const Toggle = React.forwardRef(({ className, variant, size, ...props }, ref) => (
  <TogglePrimitive.Root
    ref={ref}
    className={cn(toggleVariants({ variant, size, className }))}
    {...props} />
))

Toggle.displayName = TogglePrimitive.Root.displayName

export { Toggle, toggleVariants }