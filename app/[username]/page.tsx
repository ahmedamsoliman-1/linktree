import { ProfilePreview } from "@/components/profile-preview";
import { defaultProfile } from "@/lib/default-profile";
import { normalizeProfile } from "@/lib/profile";
import { redis } from "@/lib/redis";
import type { Profile } from "@/lib/types";

export default async function PublicPage({ params }: { params: Promise<{ username: string }> }) {
  const { username } = await params;
  const savedProfile = redis ? await redis.get<Profile>(`pulse:profile:${username.toLowerCase()}`) : null;
  const profile = normalizeProfile(savedProfile || defaultProfile, username);
  return <ProfilePreview profile={profile} />;
}
