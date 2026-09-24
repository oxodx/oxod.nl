import { Mail } from "lucide-react";
import { USER } from "@/data/user";

function GithubIcon({ size = 16 }: { size?: number }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" width={size} height={size}>
      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297 24 5.67 18.627.297 12 .297z" />
    </svg>
  );
}

function XIcon({ size = 16 }: { size?: number }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" width={size} height={size}>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

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
            <a
              className="flex items-center text-muted-foreground transition-colors hover:text-foreground"
              href={`mailto:${USER.email}`}
              aria-label="Email"
            >
              <Mail className="size-4" />
            </a>
            <a
              className="flex items-center text-muted-foreground transition-colors hover:text-foreground"
              href={USER.github}
              target="_blank"
              rel="noopener"
              aria-label="GitHub"
            >
              <GithubIcon />
            </a>
            <a
              className="flex items-center text-muted-foreground transition-colors hover:text-foreground"
              href={USER.twitter}
              target="_blank"
              rel="noopener"
              aria-label="X"
            >
              <XIcon size={16} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
