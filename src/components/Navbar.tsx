import { USER } from "@/data/user"

const navItems = [
  { name: "Overview", href: "#overview" },
]

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 max-w-screen overflow-x-clip bg-background px-2 pt-2">
      <div className="screen-line-top screen-line-bottom mx-auto flex h-12 items-center justify-between gap-2 border-x border-line px-2 sm:gap-4 md:max-w-3xl">
        <a
          href="#"
          className="font-heading text-sm font-medium text-foreground"
        >
          {USER.displayName}
        </a>
        <div className="flex-1" />
        <nav className="flex items-center gap-4">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm font-medium tracking-wide text-muted-foreground hover:text-foreground transition-colors"
            >
              {item.name}
            </a>
          ))}
        </nav>
      </div>
    </header>
  )
}
