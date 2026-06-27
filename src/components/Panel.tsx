import { cn } from "@/lib/utils"
import { type HTMLAttributes } from "react"

interface PanelProps extends HTMLAttributes<HTMLElement> {
  as?: "section" | "div"
}

export function Panel({ className, children, as: Tag = "section", ...props }: PanelProps) {
  return (
    <Tag
      data-slot="panel"
      className={cn("screen-line-top screen-line-bottom border-x border-line", className)}
      {...props}
    >
      {children}
    </Tag>
  )
}

export function PanelHeader({ className, children, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div data-slot="panel-header" className={cn("screen-line-bottom", className)} {...props}>
      {children}
    </div>
  )
}

interface PanelTitleProps extends HTMLAttributes<HTMLHeadingElement> {
  as?: "h1" | "h2" | "h3" | "h4"
}

export function PanelTitle({ className, children, as: Tag = "h2", ...props }: PanelTitleProps) {
  return (
    <Tag
      data-slot="panel-title"
      className={cn("font-heading text-3xl font-medium tracking-tight text-balance", className)}
      {...props}
    >
      {children}
    </Tag>
  )
}

export function PanelTitleSup({ className, children, ...props }: HTMLAttributes<HTMLSpanElement>) {
  return (
    <sup
      className={cn(
        "top-[-0.75em] ml-1 text-sm font-medium tracking-normal text-muted-foreground",
        className
      )}
      {...props}
    >
      {children}
    </sup>
  )
}

export function PanelDescription({ className, children, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      data-slot="panel-description"
      className={cn(
        "py-4 text-base text-balance text-muted-foreground",
        className
      )}
      {...props}
    />
  )
}

export function PanelContent({ className, children, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div data-slot="panel-body" className={cn("p-4", className)} {...props}>
      {children}
    </div>
  )
}
