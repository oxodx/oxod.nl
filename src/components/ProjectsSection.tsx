import { CollapsibleList } from "@/components/CollapsibleList"
import { Panel, PanelHeader, PanelTitle, PanelTitleSup } from "@/components/Panel"
import { ProjectItem } from "@/components/ProjectItem"
import { PROJECTS } from "@/data/projects"

const ID = "projects"

export function ProjectsSection() {
  return (
    <Panel id={ID}>
      <PanelHeader>
        <div className="p-4">
          <PanelTitle>
            Projects
            <PanelTitleSup>({PROJECTS.length})</PanelTitleSup>
          </PanelTitle>
        </div>
      </PanelHeader>
      <CollapsibleList
        items={PROJECTS}
        max={4}
        keyExtractor={(p) => p.id}
        renderItem={(project) => <ProjectItem project={project} />}
      />
    </Panel>
  )
}
