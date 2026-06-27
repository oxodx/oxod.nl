import { Panel, PanelHeader, PanelTitle } from "@/components/Panel"
import { Tag } from "@/components/ui/Tag"
import { USER } from "@/data/user"

export function ExperienceSection() {
  return (
    <Panel id="experience">
      <PanelHeader>
        <div className="p-4">
          <PanelTitle>Experience</PanelTitle>
        </div>
      </PanelHeader>
      <div className="pr-2 pl-4">
        {USER.jobs.map((job, i) => (
          <div
            key={i}
            id={job.experienceId ? `experience-${job.experienceId}` : undefined}
            className="screen-line-bottom space-y-4 py-4 scroll-mt-14"
          >
            <div className="flex items-center gap-3">
              <div className="flex size-6 shrink-0 items-center justify-center rounded-full border bg-card text-xs font-medium select-none">
                {job.company.charAt(0)}
              </div>
              <h3 className="text-lg leading-snug font-semibold">
                <a
                  href={job.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-foreground transition-colors"
                >
                  {job.company}
                </a>
              </h3>
            </div>
            <div className="pl-9 space-y-3">
              <div className="space-y-0.5">
                <h4 className="font-medium">{job.title}</h4>
                {job.startDate && (
                  <dl className="flex items-center gap-2 text-sm text-muted-foreground tabular-nums">
                    {job.type && (
                      <>
                        <div>{job.type}</div>
                        <span className="h-4 w-px bg-line" />
                      </>
                    )}
                    <div className="flex items-center gap-0.5">
                      <span>{job.startDate}</span>
                      <span className="font-mono">—</span>
                      <span>{job.endDate || "Present"}</span>
                    </div>
                  </dl>
                )}
              </div>
              {job.description && (
                <p className="text-sm text-muted-foreground text-balance leading-relaxed">
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
          </div>
        ))}
      </div>
    </Panel>
  )
}
