export type Link = {
  id: string;
  title: string;
  url: string;
  icon: "globe" | "instagram" | "linkedin" | "youtube" | "music";
  active: boolean;
};

export type Profile = {
  username: string;
  name: string;
  bio: string;
  avatar: string;
  links: Link[];
};
