import { Mail } from "lucide-react";
import { Panel, PanelContent } from "@/components/Panel";
import { GithubIcon, LinkedinIcon, XIcon } from "@/components/ui/BrandIcons";
import { USER } from "@/data/user";

const links = [
  {
    name: "mail",
    title: "Email",
    href: `mailto:${USER.email}`,
    icon: Mail,
  },
  {
    name: "github",
    title: "GitHub",
    href: USER.github,
    icon: GithubIcon,
  },
  {
    name: "linkedin",
    title: "LinkedIn",
    href: USER.linkedin,
    icon: LinkedinIcon,
  },
  {
    name: "x",
    title: "X",
    href: USER.twitter,
    icon: XIcon,
  },
] as const;

// Links without a URL in the user data are hidden instead of rendered broken.
const visibleLinks = links.filter((link) => link.href);

export function SocialLinksSection() {
  return (
    <Panel>
      <h2 className="sr-only">Social Links</h2>
      <PanelContent>
        <ul className="flex flex-wrap gap-2">
          {visibleLinks.map((link) => {
            const Icon = link.icon;
            return (
              <li key={link.name}>
                <a
                  href={link.href}
                  target={link.name === "mail" ? undefined : "_blank"}
                  rel={link.name === "mail" ? undefined : "noopener"}
                  className="group relative inline-flex size-9 items-center justify-center rounded-lg border border-input bg-muted/40 text-muted-foreground transition-all duration-300 hover:-translate-y-1 hover:border-ring/50 hover:bg-accent hover:text-foreground hover:shadow-[0_8px_16px_-4px_rgba(255,255,255,0.1)] [&_svg:not([class*='size-'])]:size-4.5"
                >
                  <Icon />
                  <span className="sr-only">{link.title}</span>
                </a>
              </li>
            );
          })}
        </ul>
      </PanelContent>
    </Panel>
  );
}
