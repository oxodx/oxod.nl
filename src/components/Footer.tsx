import { Mail } from "lucide-react";
import { GithubIcon, LinkedinIcon, XIcon } from "@/components/ui/BrandIcons";
import { USER } from "@/data/user";

const socialLinks = [
  { name: "Email", href: `mailto:${USER.email}`, icon: Mail, external: false },
  { name: "GitHub", href: USER.github, icon: GithubIcon, external: true },
  { name: "LinkedIn", href: USER.linkedin, icon: LinkedinIcon, external: true },
  { name: "X", href: USER.twitter, icon: XIcon, external: true },
] as const;

// Links without a URL in the user data are hidden instead of rendered broken.
const visibleSocialLinks = socialLinks.filter((link) => link.href);

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="px-2">
      <div className="mx-auto md:max-w-3xl">
        <div className="screen-line-top screen-line-bottom flex w-full items-center justify-between gap-4 border-x border-line bg-background px-4 py-3">
          <p className="text-xs text-muted-foreground">
            © {year} {USER.displayName}
          </p>
          <div className="flex items-center gap-4">
            {visibleSocialLinks.map((link) => {
              const Icon = link.icon;
              return (
                <a
                  key={link.name}
                  className="flex items-center text-muted-foreground transition-colors hover:text-foreground"
                  href={link.href}
                  target={link.external ? "_blank" : undefined}
                  rel={link.external ? "noopener" : undefined}
                  aria-label={link.name}
                >
                  <Icon />
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </footer>
  );
}
