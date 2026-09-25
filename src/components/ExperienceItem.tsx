import { useId, useState } from "react";
import {
  BriefcaseBusiness,
  ChevronsUpDown,
  LinkIcon,
} from "lucide-react";
import { Tag } from "@/components/ui/Tag";
import { cn } from "@/lib/utils";
import type { User } from "@/types/user";

type Job = User["jobs"][number];

export function ExperienceItem({ job }: { job: Job }) {
  const [open, setOpen] = useState(false);
  const detailsId = useId();
  const hasPeriod = Boolean(job.startDate || job.endDate);

  return (
    <div
      id={job.experienceId ? `experience-${job.experienceId}` : undefined}
      className="scroll-mt-14"
    >
      <div className="group/experience flex items-center hover:bg-accent-muted transition-colors duration-200">
        <div className="mx-2 sm:mx-4 flex size-6 shrink-0 items-center justify-center rounded-lg border border-muted-foreground/15 bg-muted text-muted-foreground ring-1 ring-line ring-offset-1 ring-offset-background select-none group-hover/experience:border-ring/30 transition-all duration-200">
          <BriefcaseBusiness className="size-3.5" aria-hidden />
        </div>

        <div className="flex-1 border-l border-dashed border-line">
          <div className="flex items-center">
            <button
              type="button"
              onClick={() => setOpen((value) => !value)}
              aria-expanded={open}
              aria-controls={detailsId}
              className="flex min-w-0 flex-1 items-center gap-2 p-2 pr-1 text-left sm:p-4 sm:pr-2"
            >
              <div className="min-w-0 flex-1">
                <h3 className="mb-1 truncate leading-snug font-medium text-balance text-sm sm:text-base">
                  {job.company}
                </h3>
                <p className="flex flex-wrap items-center gap-x-1 text-xs text-muted-foreground sm:text-sm">
                  <span>{job.title}</span>
                  {job.type && (
                    <>
                      <span aria-hidden="true">·</span>
                      <span>{job.type}</span>
                    </>
                  )}
                  {hasPeriod && (
                    <>
                      <span aria-hidden="true">·</span>
                      <span className="tabular-nums">
                        {job.startDate}
                        {job.startDate && job.endDate && (
                          <span className="px-0.5 font-mono">—</span>
                        )}
                        {job.endDate || (job.startDate ? "Present" : null)}
                      </span>
                    </>
                  )}
                </p>
              </div>

              <div
                className={cn(
                  "shrink-0 text-muted-foreground transition-transform duration-150",
                  open && "rotate-180",
                )}
              >
                <ChevronsUpDown className="size-4" aria-hidden />
              </div>
            </button>

            <a
              href={job.website}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Open ${job.company}`}
              className="relative mr-1 flex size-8 shrink-0 items-center justify-center text-muted-foreground after:absolute after:-inset-2 hover:text-foreground sm:mr-2"
            >
              <LinkIcon className="pointer-events-none size-4" aria-hidden />
            </a>
          </div>
        </div>
      </div>

      {open && (
        <div
          id={detailsId}
          className="space-y-3 border-t border-line p-2 sm:space-y-4 sm:p-4"
        >
          {job.description && (
            <p className="text-xs text-balance leading-relaxed text-muted-foreground sm:text-sm">
              {job.description}
            </p>
          )}

          {job.tags && job.tags.length > 0 && (
            <ul className="flex flex-wrap gap-1.5">
              {job.tags.map((tag) => (
                <li key={tag} className="flex">
                  <Tag>{tag}</Tag>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
