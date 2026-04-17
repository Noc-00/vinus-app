import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2.5 whitespace-nowrap transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/20 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 active:scale-95 select-none",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground font-black shadow-lg shadow-primary/20 hover:bg-primary/90 hover:shadow-primary/30",
        destructive:
          "bg-destructive text-destructive-foreground font-bold shadow-sm hover:bg-destructive/90",
        outline:
          "border-2 border-input bg-background font-bold hover:bg-accent hover:text-accent-foreground active:bg-muted",
        secondary:
          "bg-secondary text-secondary-foreground font-bold shadow-sm hover:bg-secondary/80",
        ghost:
          "hover:bg-primary/10 hover:text-primary font-bold",
        link:
          "text-primary font-bold underline-offset-4 hover:underline",
      },
      size: {
        default: "h-12 px-6 py-2 rounded-2xl text-sm",
        sm: "h-9 px-4 rounded-xl text-xs",
        lg: "h-14 px-10 rounded-[1.5rem] text-base",
        icon: "h-11 w-11 rounded-2xl",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

const Button = React.forwardRef(({ className, variant, size, asChild = false, ...props }, ref) => {
  const Comp = asChild ? Slot : "button"
  return (
    <Comp
      className={cn(buttonVariants({ variant, size, className }))}
      ref={ref}
      {...props}
    />
  )
})
Button.displayName = "Button"

export { Button, buttonVariants }