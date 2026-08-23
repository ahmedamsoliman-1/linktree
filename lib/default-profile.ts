import type { Profile } from "./types";

export const defaultProfile: Profile = {
  username: "ahmed",
  name: "Ahmed Soliman",
  bio: "Building thoughtful digital experiences, one idea at a time.",
  avatar: "AS",
  links: [
    { id: "portfolio", title: "Explore my portfolio", url: "https://ahmed.dev", icon: "globe", active: true },
    { id: "linkedin", title: "Let’s connect on LinkedIn", url: "https://linkedin.com", icon: "linkedin", active: true },
    { id: "instagram", title: "Behind the scenes", url: "https://instagram.com", icon: "instagram", active: true },
    { id: "youtube", title: "Watch my latest video", url: "https://youtube.com", icon: "youtube", active: true },
  ],
};
