export const themeIds = ["aurora", "obsidian", "solaris", "mono", "bloom", "paper"] as const;
export type ThemeId = (typeof themeIds)[number];

export type Link = {
  id: string;
  title: string;
  url: string;
  icon: "globe" | "instagram" | "linkedin" | "youtube" | "music";
  active: boolean;
  featured?: boolean;
  description?: string;
};

export type ContentBlock = {
  id: string;
  type: "note" | "media" | "availability";
  title: string;
  body: string;
  active: boolean;
};

export type Profile = {
  username: string;
  name: string;
  bio: string;
  avatar: string;
  theme: ThemeId;
  accent: string;
  showBranding: boolean;
  links: Link[];
  blocks: ContentBlock[];
};
