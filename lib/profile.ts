import { defaultProfile } from "./default-profile";
import type { Profile } from "./types";

/** Allows profiles saved before the theme studio to keep working. */
export function normalizeProfile(profile: Partial<Profile> | null | undefined, username?: string): Profile {
  return {
    ...defaultProfile,
    ...profile,
    username: profile?.username || username || defaultProfile.username,
    links: profile?.links || defaultProfile.links,
    blocks: profile?.blocks || defaultProfile.blocks,
  };
}
