import { Navbar } from "@/components/Navbar"
import { ProfileHeader } from "@/components/ProfileHeader"
import { OverviewSection } from "@/components/OverviewSection"
import { SocialLinksSection } from "@/components/SocialLinksSection"
import { GitHubContributionsSection } from "@/components/GitHubContributionsSection"
import { HelloSection } from "@/components/HelloSection"
import { StackSection } from "@/components/StackSection"
import { ExperienceSection } from "@/components/ExperienceSection"
import { ProjectsSection } from "@/components/ProjectsSection"
import { Footer } from "@/components/Footer"

export function Home() {
  return (
    <div className="max-w-screen overflow-x-clip">
      <Navbar />
      <main className="mx-auto md:max-w-3xl">
        <ProfileHeader />
        <OverviewSection />
        <SocialLinksSection />
        <GitHubContributionsSection />
        <HelloSection />
        <StackSection />
        <ExperienceSection />
        <ProjectsSection />
      </main>
      <Footer />
    </div>
  )
}
