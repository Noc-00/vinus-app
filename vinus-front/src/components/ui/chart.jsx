"use client";
import * as React from "react"
import * as RechartsPrimitive from "recharts"
import { cn } from "@/lib/utils"

const THEMES = { light: "", dark: ".dark" }
const ChartContext = React.createContext(null)

function useChart() {
  const context = React.useContext(ChartContext)
  if (!context) throw new Error("useChart must be used within a <ChartContainer />")
  return context
}

const ChartContainer = React.forwardRef(({ id, className, children, config, ...props }, ref) => {
  const uniqueId = React.useId()
  const chartId = `chart-${id || uniqueId.replace(/:/g, "")}`

  return (
    <ChartContext.Provider value={{ config }}>
      <div
        data-chart={chartId}
        ref={ref}
        className={cn(
          "flex aspect-video justify-center text-xs font-medium",
          // Estilización sutil de ejes y mallas para Vinus
          "[&_.recharts-cartesian-axis-tick_text]:fill-muted-foreground/70 [&_.recharts-cartesian-grid_line[stroke='#ccc']]:stroke-border/40",
          "[&_.recharts-curve.recharts-tooltip-cursor]:stroke-primary/20 [&_.recharts-dot[stroke='#fff']]:stroke-transparent",
          "[&_.recharts-layer]:outline-none [&_.recharts-surface]:outline-none",
          className
        )}
        {...props}>
        <ChartStyle id={chartId} config={config} />
        <RechartsPrimitive.ResponsiveContainer>
          {children}
        </RechartsPrimitive.ResponsiveContainer>
      </div>
    </ChartContext.Provider>
  )
})
ChartContainer.displayName = "Chart"

const ChartStyle = ({ id, config }) => {
  const colorConfig = Object.entries(config).filter(([, config]) => config.theme || config.color)
  if (!colorConfig.length) return null

  return (
    <style
      dangerouslySetInnerHTML={{
        __html: Object.entries(THEMES)
          .map(([theme, prefix]) => `
            ${prefix} [data-chart=${id}] {
              ${colorConfig.map(([key, itemConfig]) => {
                const color = itemConfig.theme?.[theme] || itemConfig.color
                return color ? `--color-${key}: ${color};` : null
              }).join("\n")}
            }
          `).join("\n"),
      }}
    />
  )
}

const ChartTooltip = RechartsPrimitive.Tooltip

const ChartTooltipContent = React.forwardRef((
  { active, payload, className, indicator = "dot", hideLabel = false, hideIndicator = false, label, labelFormatter, labelClassName, formatter, color, nameKey, labelKey },
  ref
) => {
  const { config } = useChart()

  const tooltipLabel = React.useMemo(() => {
    if (hideLabel || !payload?.length) return null
    const [item] = payload
    const key = `${labelKey || item.dataKey || item.name || "value"}`
    const itemConfig = getPayloadConfigFromPayload(config, item, key)
    const value = !labelKey && typeof label === "string" ? config[label]?.label || label : itemConfig?.label

    if (labelFormatter) return <div className={cn("font-black mb-1 text-xs uppercase tracking-wider", labelClassName)}>{labelFormatter(value, payload)}</div>
    if (!value) return null
    return <div className={cn("font-black mb-1 text-xs uppercase tracking-wider", labelClassName)}>{value}</div>
  }, [label, labelFormatter, payload, hideLabel, labelClassName, config, labelKey])

  if (!active || !payload?.length) return null

  return (
    <div
      ref={ref}
      className={cn(
        "grid min-w-[9rem] items-start gap-2 rounded-2xl border border-border/50 bg-background/90 backdrop-blur-md px-3 py-2.5 text-[11px] shadow-xl shadow-primary/5",
        className
      )}>
      {tooltipLabel}
      <div className="grid gap-1.5">
        {payload.map((item, index) => {
          const key = `${nameKey || item.name || item.dataKey || "value"}`
          const itemConfig = getPayloadConfigFromPayload(config, item, key)
          const indicatorColor = color || item.payload.fill || item.color

          return (
            <div key={item.dataKey} className={cn("flex w-full items-center gap-2 [&>svg]:h-3 [&>svg]:w-3", indicator === "dot" && "items-center")}>
              {!hideIndicator && (
                <div
                  className={cn("shrink-0 rounded-full", indicator === "dot" ? "h-2 w-2" : "w-1 h-3")}
                  style={{ backgroundColor: indicatorColor }}
                />
              )}
              <div className="flex flex-1 justify-between items-center leading-none">
                <span className="text-muted-foreground font-bold">{itemConfig?.label || item.name}</span>
                {item.value && <span className="font-mono font-black text-foreground ml-2">{item.value.toLocaleString()}</span>}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
})
ChartTooltipContent.displayName = "ChartTooltip"

const ChartLegend = RechartsPrimitive.Legend
const ChartLegendContent = React.forwardRef(({ className, hideIcon = false, payload, verticalAlign = "bottom", nameKey }, ref) => {
  const { config } = useChart()
  if (!payload?.length) return null

  return (
    <div ref={ref} className={cn("flex items-center justify-center gap-5 text-xs font-bold", verticalAlign === "top" ? "pb-4" : "pt-4", className)}>
      {payload.map((item) => {
        const key = `${nameKey || item.dataKey || "value"}`
        const itemConfig = getPayloadConfigFromPayload(config, item, key)
        return (
          <div key={item.value} className="flex items-center gap-1.5">
            {!hideIcon && <div className="h-1.5 w-1.5 shrink-0 rounded-full" style={{ backgroundColor: item.color }} />}
            <span className="text-muted-foreground">{itemConfig?.label || item.value}</span>
          </div>
        )
      })}
    </div>
  )
})
ChartLegendContent.displayName = "ChartLegend"

function getPayloadConfigFromPayload(config, payload, key) {
  if (typeof payload !== "object" || payload === null) return undefined
  const p = "payload" in payload && typeof payload.payload === "object" ? payload.payload : undefined
  let configLabelKey = key
  if (key in payload && typeof payload[key] === "string") configLabelKey = payload[key]
  else if (p && key in p && typeof p[key] === "string") configLabelKey = p[key]
  return configLabelKey in config ? config[configLabelKey] : config[key]
}

export { ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent, ChartStyle }