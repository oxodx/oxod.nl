import { Mail, MapPin } from "lucide-react"
import { buttonVariants } from "./shadcn/ui/button"
import { cn } from "@/lib/utils"

export const ContactSection = () => {
  return <section id="contact" className="py-24 px-4 relative bg-secondary/30">
    <div className="container mx-auto max-w-5xl">
      <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">
        Get In <span className="text-primary">Touch</span>
      </h2>

      <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
        Have a project in mind or want to collaborate? Feel free to reach out.
        I'm always open to discussing new opportunities.
      </p>

      <div className="space-y-8">
        <h3 className="text-2xl font-semibold mb-6">Contact Information</h3>

        <div className="space-y-6 flex flex-col items-center">
          <div className="flex items-start space-x-4">
            <div className="p-3 rounded-full bg-primary/10">
              <Mail className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h4 className="font-medium">Email</h4>
              <a href="mailto:me@oxod.nl" className="text-muted-foreground hover:text-primary transition-colors">
                me@oxod.nl
              </a>
            </div>
          </div>
          <div className="flex items-start space-x-4">
            <div className="p-3 rounded-full bg-primary/10">
              <MapPin className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h4 className="font-medium">Location</h4>
              <a className="text-muted-foreground hover:text-primary transition-colors">
                Netherlands
              </a>
            </div>
          </div>
        </div>

        <div className="pt-8">
          <h4 className="font-medium mb-4">Connect With Me</h4>
          <div className="flex space-x-4 justify-center">
            <a
              target="_blank"
              href="https://github.com/oxodx"
              className={cn(
                buttonVariants({ variant: "ghost", size: "default" }),
                "rounded-full px-2 py-2"
              )}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8" />
              </svg>
            </a>
            <a
              target="_blank"
              href="https://x.com/_oxod_"
              className={cn(
                buttonVariants({ variant: "ghost", size: "default" }),
                "rounded-full px-2 py-2"
              )}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                <path d="M12.6.75h2.454l-5.36 6.142L16 15.25h-4.937l-3.867-5.07-4.425 5.07H.316l5.733-6.57L0 .75h5.063l3.495 4.633L12.601.75Zm-.86 13.028h1.36L4.323 2.145H2.865z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
}