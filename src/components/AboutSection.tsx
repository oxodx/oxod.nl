import { Briefcase, Code, User } from "lucide-react"
import { buttonVariants } from "./shadcn/ui/button"
import { cn } from "@/lib/utils"

export const AboutSection = () => {
  return <section id="about" className="py-24 px-4 relative">
    <div className="container mx-auto max-w-5xl">
      <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
        About <span className="text-primary">Me</span>
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <h3 className="text-2xl text-semibold">Random Things Developer</h3>

          <p className="text-muted-foreground">
            I have 6 years of experience in development.
          </p>

          <p className="text-muted-foreground">
            I mostly make random stuff.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 pt-4 justify-center">
            <a
              href="#contact"
              className={cn(
                buttonVariants({ variant: "default", size: "default" }),
                "rounded-full px-6 py-2"
              )}
            >
              Get In Touch
            </a>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6">
          <div className="gradient-border p-6 card-hover">
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-full bg-primary/10">
                <Code className="h-6 w-6 text-primary" />
              </div>
              <div className="text-left">
                <h4 className="font-semibold text-lg">Developer</h4>
                <p className="text-muted-foreground">
                  Creating random projects
                </p>
              </div>
            </div>
          </div>
          <div className="gradient-border p-6 card-hover">
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-full bg-primary/10">
                <User className="h-6 w-6 text-primary" />
              </div>
              <div className="text-left">
                <h4 className="font-semibold text-lg">UI/UX Design</h4>
                <p className="text-muted-foreground">
                  Designing some stuff
                </p>
              </div>
            </div>
          </div>
          <div className="gradient-border p-6 card-hover">
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-full bg-primary/10">
                <Briefcase className="h-6 w-6 text-primary" />
              </div>
              <div className="text-left">
                <h4 className="font-semibold text-lg">Project Management</h4>
                <p className="text-muted-foreground">
                  Creating projects on github
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
}
