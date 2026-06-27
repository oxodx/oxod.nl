import { cn } from "@/lib/utils"
import { type HTMLAttributes } from "react"

export function Tag({ className, children, ...props }: HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={cn(
        "flex h-6 items-center justify-center gap-1.25 rounded-full bg-zinc-50/80 px-2 font-mono text-xs text-foreground ring-1 ring-border dark:bg-zinc-900/80",
        className
      )}
      {...props}
    >
      {children}
    </span>
  )
}
