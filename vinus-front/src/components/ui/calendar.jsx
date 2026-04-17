import * as React from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { DayPicker } from "react-day-picker"
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn("p-4 bg-card rounded-[2rem] border border-border/50 shadow-sm", className)}
      classNames={{
        months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
        month: "space-y-4",
        caption: "flex justify-center pt-2 relative items-center px-8",
        caption_label: "text-sm font-black text-foreground uppercase tracking-widest",
        nav: "flex items-center",
        nav_button: cn(
          buttonVariants({ variant: "ghost" }),
          "h-8 w-8 bg-transparent p-0 opacity-70 hover:opacity-100 hover:bg-primary/10 rounded-xl transition-all"
        ),
        nav_button_previous: "absolute left-2",
        nav_button_next: "absolute right-2",
        table: "w-full border-collapse space-y-1",
        head_row: "flex justify-between",
        head_cell: "text-muted-foreground/50 rounded-md w-9 font-bold text-[0.7rem] uppercase tracking-tighter",
        row: "flex w-full mt-2 justify-between",
        cell: cn(
          "relative p-0 text-center text-sm focus-within:relative focus-within:z-20 [&:has([aria-selected])]:bg-primary/5 first:[&:has([aria-selected])]:rounded-l-2xl last:[&:has([aria-selected])]:rounded-r-2xl",
          props.mode === "range"
            ? "[&:has(>.day-range-end)]:rounded-r-2xl [&:has(>.day-range-start)]:rounded-l-2xl"
            : "[&:has([aria-selected])]:rounded-2xl"
        ),
        day: cn(
          buttonVariants({ variant: "ghost" }),
          "h-9 w-9 p-0 font-bold aria-selected:opacity-100 rounded-2xl transition-all hover:bg-primary/20 hover:text-primary"
        ),
        day_range_start: "day-range-start bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground",
        day_range_end: "day-range-end bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground",
        day_selected: "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground shadow-md shadow-primary/20",
        day_today: "bg-accent/50 text-accent-foreground border-2 border-primary/20",
        day_outside: "day-outside text-muted-foreground/30 aria-selected:bg-accent/50 aria-selected:text-muted-foreground",
        day_disabled: "text-muted-foreground opacity-20",
        day_range_middle: "aria-selected:bg-primary/10 aria-selected:text-primary",
        day_hidden: "invisible",
        ...classNames,
      }}
      components={{
        IconLeft: ({ className, ...props }) => (
          <ChevronLeft className={cn("h-5 w-5", className)} {...props} />
        ),
        IconRight: ({ className, ...props }) => (
          <ChevronRight className={cn("h-5 w-5", className)} {...props} />
        ),
      }}
      {...props}
    />
  );
}
Calendar.displayName = "Calendar"

export { Calendar }