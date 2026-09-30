import type { User } from "@/types/user"

export const USER: User = {
  firstName: "Yarno",
  lastName: "Roethof",
  displayName: "oxod",
  username: "oxod",
  gender: "male",
  pronouns: "he/him",
  bio: "Writing horrible code.",
  flipSentences: [
    "Writing horrible code.",
    "Student.",
    "Open source contributor",
  ],
  address: "Netherlands",
  phoneNumber: "",
  email: "me@oxod.nl",
  website: "https://oxod.nl",
  jobTitle: "Student",
  jobs: [
    {
      title: "Student",
      company: "Porteum, Lelystad",
      website: "https://www.porteum.nl/",
      startDate: "2022",
      type: "Full-time",
      description: "Learning things.",
      tags: ["Mathematics", "English", "Dutch"],
      experienceId: "porteum",
    },
  ],
  about: `- I'm oxod — a developer who enjoys building random things and contributing to open source.

Passionate about exploring new technologies and turning ideas into reality through polished projects.

- Creator of [oxod.nl](https://github.com/oxodx/oxod.nl).`,
  avatar: "https://avatars.githubusercontent.com/u/126201299?s=96&v=4",
  keywords: [
    "portfolio",
    "developer",
    "oxod",
  ],
  timeZone: "Europe/Amsterdam",
  dateCreated: "2026-06-26",
  github: "https://github.com/oxodx",
  twitter: "https://x.com/_oxod_",
  linkedin: "https://www.linkedin.com/in/yarno-roethof",
}