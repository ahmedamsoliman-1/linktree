import { Globe2, Instagram, Linkedin, Music2, Youtube } from "lucide-react";
import type { Link } from "@/lib/types";

export function LinkIcon({ name }: { name: Link["icon"] }) {
  const Icon = { globe: Globe2, instagram: Instagram, linkedin: Linkedin, music: Music2, youtube: Youtube }[name];
  return <Icon size={20} strokeWidth={1.8} />;
}
