export type User = {
  /** Real first name, shown under the display name */
  firstName: string;
  /** Real last name; leave blank to show the first name only */
  lastName: string;
  /** Preferred public-facing name */
  displayName: string;
  /** Handle/username used in links or mentions */
  username: string;
  gender: "male" | "female" | "non-binary";
  /** e.g. "he/him", "she/her", "they/them" */
  pronouns: string;
  bio: string;
  /** Short phrases rotated in UI */
  flipSentences: string[];
  /** General location to display */
  address: string;
  phoneNumber: string;
  email: string;
  /** Personal/homepage URL */
  website: string;
  /** Primary/current role shown on profile */
  jobTitle: string;
  /** Work history entries */
  jobs: {
    title: string;
    company: string;
    website: string;
    startDate?: string;
    endDate?: string;
    type?: string;
    description?: string;
    tags?: string[];
    experienceId?: string;
  }[];
  /** Rich about section; supports Markdown */
  about: string;
  /** Public URL to avatar image */
  avatar: string;
  /** Keywords for search and filtering */
  keywords: string[];
  /** Time zone for time displays */
  timeZone: string;
  /** Profile/site start date in YYYY-MM-DD */
  dateCreated: string;
  github: string;
  twitter: string;
  /** LinkedIn profile URL; leave blank to hide the LinkedIn link */
  linkedin: string;
};
