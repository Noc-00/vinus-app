"use client"

import { GripVertical } from "lucide-react"
import * as ResizablePrimitive from "react-resizable-panels"
import { cn } from "@/lib/utils"

const ResizablePanelGroup = ({ className, ...props }) => (
  <ResizablePrimitive.PanelGroup
    className={cn(
      "flex h-full w-full data-[panel-group-direction=vertical]:flex-col transition-all",
      className
    )}
    {...props}
  />
)

const ResizablePanel = ResizablePrimitive.Panel

const ResizableHandle = ({ withHandle, className, ...props }) => (
  <ResizablePrimitive.PanelResizeHandle
    className={cn(
      "relative flex w-1.5 items-center justify-center bg-transparent transition-all hover:bg-primary/5 data-[panel-group-direction=vertical]:h-1.5 data-[panel-group-direction=vertical]:w-full",
      className
    )}
    {...props}>
    {withHandle && (
      <div className="z-10 flex h-8 w-4 items-center justify-center rounded-full border border-border/50 bg-background shadow-sm hover:border-primary/50 transition-colors">
        <GripVertical className="h-3 w-3 text-muted-foreground/50" />
      </div>
    )}
  </ResizablePrimitive.PanelResizeHandle>
)

export { ResizablePanelGroup, ResizablePanel, ResizableHandle }