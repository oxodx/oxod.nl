import type { User } from "@/types/user";

export const USER: User = {
  firstName: "",
  lastName: "",
  displayName: "oxod",
  username: "oxod",
  gender: "male",
  pronouns: "he/him",
  bio: "Just a random guy who creates random stuff.",
  flipSentences: [
    "Just a random guy who creates random stuff.",
    "Student",
    "Open source contributor",
  ],
  address: "Netherlands",
  phoneNumber: "",
  phoneNumberB64: "",
  email: "me@oxod.nl",
  emailB64: "bWVAb3hvZC5ubA==",
  website: "https://oxod.nl",
  github: "https://github.com/oxodx",
  twitter: "https://x.com/_oxod_",
  jobTitle: "Student",
  jobs: [
    {
      title: "Student",
      company: "School",
      website: "https://oxod.nl",
      startDate: "2022",
      type: "Full-time",
      description: "Learning and building things. Studying computer science and software development.",
      tags: ["Computer Science", "Software Development", "Mathematics"],
      experienceId: "school",
    },
  ],
  about: `I'm oxod — a developer who enjoys building random things and contributing to open source.

Passionate about exploring new technologies and turning ideas into reality through polished projects.

Creator of [oxod.nl](https://github.com/oxodx/oxod.nl).`,
  avatar: "",
  keywords: [
    "portfolio",
    "developer",
    "oxod",
  ],
  timeZone: "Europe/Amsterdam",
  dateCreated: "2026-06-26",
}
