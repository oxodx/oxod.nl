import {
  Panel,
  PanelContent,
  PanelHeader,
  PanelTitle,
} from "@/components/Panel";
import { Markdown } from "@/components/ui/Markdown";
import { USER } from "@/data/user";

function getGreeting() {
  const hour = new Date().getHours();
  if (hour >= 0 && hour < 12) return "Good morning";
  if (hour >= 12 && hour < 17) return "Good afternoon";
  return "Good evening";
}

const ID = "hello";

export function HelloSection() {
  const greeting = getGreeting();

  return (
    <Panel id={ID} className="scroll-mt-14">
      <PanelHeader>
        <div className="p-4">
          <PanelTitle>{greeting}</PanelTitle>
        </div>
      </PanelHeader>
      <PanelContent>
        <Markdown>{USER.about}</Markdown>
      </PanelContent>
    </Panel>
  );
}
