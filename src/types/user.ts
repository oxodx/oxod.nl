export type User = {
  firstName: string
  lastName: string
  displayName: string
  username: string
  gender: "male" | "female" | "non-binary"
  pronouns: string
  bio: string
  flipSentences: string[]
  address: string
  phoneNumber: string
  phoneNumberB64?: string
  email: string
  emailB64?: string
  website: string
  github: string
  twitter: string
  jobTitle: string
  jobs: {
    title: string
    company: string
    website: string
    startDate?: string
    endDate?: string
    type?: string
    description?: string
    tags?: string[]
    experienceId?: string
  }[]
  about: string
  avatar: string
  keywords: string[]
  timeZone: string
  dateCreated: string
}
