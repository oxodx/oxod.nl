import { cn } from "@/lib/utils";
import { useState } from "react"
import { buttonVariants } from "./shadcn/ui/button";

const skills = [
  // Frontend
  { name: "HTML", level: 50, category: "frontend" },
  { name: "CSS", level: 40, category: "frontend" },
  { name: "JavaScript", level: 55, category: "frontend" },
  { name: "TypeScript", level: 75, category: "frontend" },
  { name: "React", level: 30, category: "frontend" },
  { name: "Tailwind CSS", level: 35, category: "frontend" },
  { name: "Next.js", level: 10, category: "frontend" },
  { name: "Vite", level: 15, category: "frontend" },

  // Backend
  { name: "Python", level: 80, category: "backend" },
  { name: "Node.js", level: 35, category: "backend" },
  { name: "Express", level: 5, category: "backend" },
  { name: "MongoDB", level: 10, category: "backend" },
  { name: "PostgreSQL", level: 10, category: "backend" },
  { name: "GraphQL", level: 10, category: "backend" },

  // Tools
  { name: "Git/Github", level: 90, category: "tools" },
  { name: "Github Actions", level: 85, category: "tools" },
  { name: "Docker", level: 80, category: "tools" },
  { name: "Vs Code", level: 90, category: "tools" },
]

const categories = ["all", "frontend", "backend", "tools"]

export const SkillsSection = () => {
  const [activeCategory, setActiveCategory] = useState("all");

  const filteredSkills = skills
    .filter((skill) => activeCategory === "all" || skill.category === activeCategory)
    .sort((a, b) => b.level - a.level)

  return <section id="skills" className="py-24 px-4 relative bg-secondary/3">
    <div className="container mx-auto max-w-5xl">
      <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
        My <span className="text-primary">Skills</span>
      </h2>

      <div className="flex flex-wrap justify-center gap-4 mb-12">
        {categories.map((category, key) => (
          <a
            key={key}
            onClick={() => setActiveCategory(category)}
            className={cn(
              buttonVariants({ variant: activeCategory === category ? "default" : "secondary", size: "default" }),
              "px-5 py-2 rounded-full transition-colors duration-300 capitalize"
            )}
          >
            {category}
          </a>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredSkills.map((skill, key) => (
          <div
            key={key}
            className="bg-card p-6 rounded-lg shadow-xs card-hover"
          >
            <div className="text-left mb-4">
              <h3 className="font-semibold text-lg">{skill.name}</h3>
            </div>
            <div className="w-full bg-secondary/50 h-2 rounded-full overflow-hidden">
              <div
                className="bg-primary h-2 rounded-full origin-left animate-[grow_1.5_ease_out]"
                style={{ width: skill.level + "%" }}
              />
            </div>

            <div className="text-right mt-1">
              <span className="text-sm text-muted-foreground">{skill.level}%</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
}
