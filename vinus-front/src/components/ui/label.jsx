"use client"

import * as React from "react"
import * as LabelPrimitive from "@radix-ui/react-label"
import { cva } from "class-variance-authority"
import { cn } from "@/lib/utils"

const labelVariants = cva(
  "text-[10px] font-black uppercase tracking-[0.1em] leading-none text-muted-foreground/80 peer-disabled:cursor-not-allowed peer-disabled:opacity-70 transition-colors"
)

const Label = React.forwardRef(({ className, ...props }, ref) => (
  <LabelPrimitive.Root
    ref={ref}
    className={cn(labelVariants(), "peer-focus:text-primary", className)}
    {...props}
  />
))
Label.displayName = LabelPrimitive.Root.displayName

export { Label }