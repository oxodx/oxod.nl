import { cn } from "@/lib/utils"
import { ArrowRight, ExternalLink, GitGraph } from "lucide-react"
import { buttonVariants } from "./shadcn/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "./shadcn/ui/card"
import { USER } from "@/data/user"

const projects = [
  {
    id: 1,
    title: "portfolio",
    description: "My developer portfolio site.",
    image: "/projects/portfolio",
    tags: ["React", "TailwindCSS", "Vite", "Typescript"],
    demoUrl: "https://oxod.nl",
    gitUrl: "https://github.com/oxodx/oxod.nl.git",
  }
]

export function ProjectsSection() {
  return <section id="projects" className="py-24 px-4 relative">
    <div className="container mx-auto max-w-5xl">
      <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">
        Featured <span className="text-primary">Projects</span>
      </h2>

      <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
        Here are some of my recent projects.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project, key) => (
          <Card key={key} className="group bg-card rounded-lg overflow-hidden shadow-xs card-hover">
            <CardHeader className="h-48 overflow-hidden">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
            </CardHeader>

            <CardContent className="px-6">
              <div className="flex flex-wrap gap-2 mb-4">
                {project.tags.map((tag) => (
                  <span className="px-2 py-1 text-xs font-medium border rounded-full bg-secondary text-secondary-foreground">
                    {tag}
                  </span>
                ))}
              </div>

              <h3 className="text-xl font-semibold mb-1">{project.title}</h3>
              <p className="text-muted-foreground text-sm mb-1">{project.description}</p>
            </CardContent>
            <CardFooter className="flex justify-between items-center">
              <div className="flex space-x-3">
                <a
                  href={project.demoUrl}
                  target="_blank"
                  className="text-foreground/80 hover:text-primary transition-colors duration-300"
                ><ExternalLink size={20} /></a>
                <a
                  href={project.gitUrl}
                  target="_blank"
                  className="text-foreground/80 hover:text-primary transition-colors duration-300"
                ><GitGraph size={20} /></a>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>

      <div className="text-center mt-12">
        <a
          href={USER.github}
          target="_blank"
          className={cn(
            buttonVariants({ variant: "default", size: "default" }),
            "rounded-full px-6 py-2"
          )}
        >
          Check My Github <ArrowRight size={16} />
        </a>
      </div>
    </div>
  </section>
}
