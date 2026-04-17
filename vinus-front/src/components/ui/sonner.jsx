"use client";
import { useTheme } from "next-themes"
import { Toaster as Sonner } from "sonner"

const Toaster = ({
  ...props
}) => {
  const { theme = "system" } = useTheme()

  return (
    <Sonner
      theme={theme}
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:rounded-[2rem] group-[.toaster]:bg-background/80 group-[.toaster]:backdrop-blur-xl group-[.toaster]:text-foreground group-[.toaster]:border-border/40 group-[.toaster]:shadow-2xl group-[.toaster]:p-6 group-[.toaster]:font-bold",
          description:
            "group-[.toast]:text-muted-foreground group-[.toast]:font-medium group-[.toast]:text-xs",
          actionButton:
            "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground group-[.toast]:rounded-xl group-[.toast]:px-4 group-[.toast]:font-black group-[.toast]:uppercase group-[.toast]:text-[10px] group-[.toast]:tracking-widest",
          cancelButton:
            "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground group-[.toast]:rounded-xl group-[.toast]:px-4 group-[.toast]:font-black group-[.toast]:uppercase group-[.toast]:text-[10px]",
        },
      }}
      {...props} />
  );
}

export { Toaster }