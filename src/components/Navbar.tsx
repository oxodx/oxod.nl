import { cn } from "@/lib/utils"
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react"
import { buttonVariants } from "@/components/shadcn/ui/button";
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList } from "@/components/shadcn/ui/navigation-menu";

const navItems = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Projects", href: "#projects" },
  { name: "Contact", href: "#contact" },
]

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    function handleScroll() {
      setIsScrolled(window.screenY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return <nav className={cn(
    "fixed w-full z-40 transition-all duration-300",
    isScrolled ? "py-3 bg-background/80 backdrop-blur-md shadow-xs" : "py-5"
  )}>
    <div className="container flex items-center justify-between">
      <a className="text-xl font-bold text-primary flex items-center" href="#home">
        <span className="relative z-10">
          <span className="text-glow text-foreground">oxod </span>
          Portfolio
        </span>
      </a>

      {/* desktop nav */}
      <div className="hidden md:flex space-x-8">
        <NavigationMenu>
          <NavigationMenuList>
            {navItems.map((item, key) => (
              <NavigationMenuItem>
                <NavigationMenuLink key={key} className="rounded-full" href={item.href}>{item.name}</NavigationMenuLink>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>
      </div>

      {/* mobile nav */}
      <a
        onClick={() => setIsMenuOpen((prev) => !prev)}
        className={cn(
          buttonVariants({ variant: "ghost", size: "icon-lg" }),
          "md:hidden p-2 z-50"
        )}
        aria-label={isMenuOpen ? "Close Menu" : "Open Menu"}
      >
        {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </a>

      <div className={cn(
        "fixed inset-0 bg-background/95 backdrop-blur-md z-40 flex flex-col items-center justify-center",
        "transition-all duration-300 md:hidden",
        isMenuOpen
          ? "opacity-100 pointer-events-auto"
          : "opacity-0 pointer-events-none"
      )}>
        <div className="flex flex-col space-y-9 text-xl">
          {navItems.map((item, key) => (
            <a
              key={key}
              href={item.href}
              onClick={() => setIsMenuOpen(false)}
              className={cn(
                buttonVariants({ variant: "ghost", size: "default" }),
                "rounded-full px-6 py-2"
              )}
            >
              {item.name}
            </a>
          ))}
        </div>
      </div>
    </div>
  </nav>
}
