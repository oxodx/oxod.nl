import { Briefcase, Code, User } from "lucide-react"
import { buttonVariants } from "./shadcn/ui/button"
import { cn } from "@/lib/utils"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./shadcn/ui/card"

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

        <div className="grid grid-cols-1 px-4 space-y-4">
          <Card className="rounded-2xl">
            <CardContent className="flex items-start gap-4 pt-2">
              <div className="bg-primary/10 rounded-full p-4 shrink-0">
                <Code className="h-6 w-6 text-primary" />
              </div>

              <div className="flex flex-col">
                <CardTitle className="text-left">Developer</CardTitle>
                <CardDescription className="text-left">Creating random projects</CardDescription>
              </div>
            </CardContent>
          </Card>
          <Card className="rounded-2xl">
            <CardContent className="flex items-start gap-4 pt-2">
              <div className="bg-primary/10 rounded-full p-4 shrink-0">
                <User className="h-6 w-6 text-primary" />
              </div>

              <div className="flex flex-col">
                <CardTitle className="text-left">UI/UX Design</CardTitle>
                <CardDescription className="text-left">Designing some stuff</CardDescription>
              </div>
            </CardContent>
          </Card>
          <Card className="rounded-2xl">
            <CardContent className="flex items-start gap-4 pt-2">
              <div className="bg-primary/10 rounded-full p-4 shrink-0">
                <Briefcase className="h-6 w-6 text-primary" />
              </div>

              <div className="flex flex-col">
                <CardTitle className="text-left">Project Management</CardTitle>
                <CardDescription className="text-left">Creating projects on github</CardDescription>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  </section>
}
