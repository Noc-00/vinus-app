import { cn } from "@/lib/utils"

function Skeleton({
  className,
  ...props
}) {
  return (
    <div
      className={cn(
        "animate-pulse rounded-2xl bg-muted/40 backdrop-blur-sm",
        className
      )}
      {...props}
    />
  )
}

export { Skeleton }