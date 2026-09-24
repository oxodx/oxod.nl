export type StackItem = {
  key: string;
  title: string;
  href?: string;
  category: string;
  /** Proficiency from 1 (basics) to 4 (expert). Omit to show no meter. */
  level?: 1 | 2 | 3 | 4;
};
