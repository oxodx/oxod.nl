import { useState } from "react"
import { BoxIcon, ChevronsUpDown, LinkIcon } from "lucide-react"
import { Tag } from "@/components/ui/Tag"
import { cn } from "@/lib/utils"
import type { Project } from "@/types/projects"

export function ProjectItem({ project }: { project: Project }) {
  const { start, end } = project.period
  const isOngoing = !end
  const [open, setOpen] = useState(project.isExpanded ?? false)

  return (
    <div>
      <div className="group/project flex items-center hover:bg-accent-muted">
        <div className="mx-4 flex size-6 shrink-0 items-center justify-center rounded-lg border border-muted-foreground/15 bg-muted text-muted-foreground ring-1 ring-line ring-offset-1 ring-offset-background select-none">
          {project.logo ? (
            <img
              src={project.logo}
              alt={project.title}
              className="size-6 grayscale group-hover/project:grayscale-0"
              aria-hidden
            />
          ) : (
            <BoxIcon className="size-4" />
          )}
        </div>

        <div className="flex-1 border-l border-dashed border-line">
          <button
            onClick={() => setOpen((v) => !v)}
            className="flex w-full items-center gap-2 p-4 pr-2 text-left"
          >
            <div className="flex-1">
              <h3 className="mb-1 leading-snug font-medium text-balance">
                {project.title}
              </h3>
              <dl className="text-sm text-muted-foreground">
                <dt className="sr-only">Period</dt>
                <dd className="flex items-center gap-0.5">
                  <span>{start}</span>
                  <span className="font-mono">—</span>
                  {isOngoing ? <span>Present</span> : <span>{end}</span>}
                </dd>
              </dl>
            </div>

            <a
              className="relative flex size-6 shrink-0 items-center justify-center text-muted-foreground after:absolute after:-inset-2 hover:text-foreground"
              href={project.link}
              target="_blank"
              rel="noopener"
              aria-label="Open project"
              onClick={(e) => e.stopPropagation()}
            >
              <LinkIcon className="pointer-events-none size-4" />
            </a>

            <div
              className={cn(
                "shrink-0 text-muted-foreground transition-transform duration-150",
                open && "rotate-180"
              )}
            >
              <ChevronsUpDown className="size-4" />
            </div>
          </button>
        </div>
      </div>

      {open && (
        <div className="space-y-4 border-t border-line p-4">
          {project.description && (
            <p className="text-sm text-muted-foreground text-balance leading-relaxed">
              {project.description}
            </p>
          )}

          {project.skills.length > 0 && (
            <ul className="flex flex-wrap gap-1.5">
              {project.skills.map((skill) => (
                <li key={skill} className="flex">
                  <Tag>{skill}</Tag>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  )
}
