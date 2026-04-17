import * as React from "react"
import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils"

const alertVariants = cva(
  "relative w-full rounded-[2rem] border p-5 text-sm [&>svg~*]:pl-9 [&>svg+div]:translate-y-[-2px] [&>svg]:absolute [&>svg]:left-5 [&>svg]:top-5 [&>svg]:text-foreground transition-all shadow-sm",
  {
    variants: {
      variant: {
        default: "bg-card text-foreground border-border/60",
        destructive:
          "border-destructive/30 bg-destructive/5 text-destructive dark:border-destructive/30 [&>svg]:text-destructive",
        success:
          "border-emerald-500/30 bg-emerald-500/5 text-emerald-600 dark:text-emerald-400 [&>svg]:text-emerald-500",
        warning:
          "border-amber-500/30 bg-amber-500/5 text-amber-700 dark:text-amber-400 [&>svg]:text-amber-500",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

const Alert = React.forwardRef(({ className, variant, ...props }, ref) => (
  <div
    ref={ref}
    role="alert"
    className={cn(alertVariants({ variant }), className)}
    {...props}
  />
))
Alert.displayName = "Alert"

const AlertTitle = React.forwardRef(({ className, ...props }, ref) => (
  <h5
    ref={ref}
    className={cn("mb-1 font-black leading-none tracking-tight text-base", className)}
    {...props}
  />
))
AlertTitle.displayName = "AlertTitle"

const AlertDescription = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("text-sm opacity-90 font-medium [&_p]:leading-relaxed", className)}
    {...props}
  />
))
AlertDescription.displayName = "AlertDescription"

export { Alert, AlertTitle, AlertDescription }