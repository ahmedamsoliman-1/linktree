import type { Profile } from "./types";

export const defaultProfile: Profile = {
  username: "ahmed",
  name: "Ahmed Soliman",
  bio: "Building thoughtful digital experiences, one idea at a time.",
  avatar: "AS",
  theme: "aurora",
  accent: "#9b7bff",
  showBranding: true,
  links: [
    { id: "portfolio", title: "Explore my portfolio", description: "Selected work & case studies", url: "https://ahmed.dev", icon: "globe", active: true, featured: true },
    { id: "linkedin", title: "Let’s connect on LinkedIn", url: "https://linkedin.com", icon: "linkedin", active: true },
    { id: "instagram", title: "Behind the scenes", url: "https://instagram.com", icon: "instagram", active: true },
    { id: "youtube", title: "Watch my latest video", url: "https://youtube.com", icon: "youtube", active: true },
  ],
  blocks: [
    { id: "now", type: "note", title: "Currently building", body: "A more human internet, one thoughtful interaction at a time.", active: true },
    { id: "availability", type: "availability", title: "Open for select collaborations", body: "Available for product, brand, and creative technology work.", active: true },
  ],
};
