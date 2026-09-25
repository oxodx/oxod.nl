import { CollapsibleList } from "@/components/CollapsibleList";
import { ExperienceItem } from "@/components/ExperienceItem";
import {
  Panel,
  PanelHeader,
  PanelTitle,
  PanelTitleSup,
} from "@/components/Panel";
import { USER } from "@/data/user";

const ID = "experience";

export function ExperienceSection() {
  return (
    <Panel id={ID} className="scroll-mt-14">
      <PanelHeader>
        <div className="p-2 sm:p-3 lg:p-4">
          <PanelTitle>
            Experience
            <PanelTitleSup>({USER.jobs.length})</PanelTitleSup>
          </PanelTitle>
        </div>
      </PanelHeader>
      <CollapsibleList
        items={USER.jobs}
        max={4}
        keyExtractor={(job) => job.experienceId ?? job.company}
        renderItem={(job) => <ExperienceItem job={job} />}
      />
    </Panel>
  );
}
