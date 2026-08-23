"use client";

import { ArrowUpRight, MoreHorizontal, Share2 } from "lucide-react";
import type { Profile } from "@/lib/types";
import { LinkIcon } from "./icon";

export function ProfilePreview({ profile, compact = false }: { profile: Profile; compact?: boolean }) {
  const visibleLinks = profile.links.filter((link) => link.active);
  const share = async () => {
    await navigator.clipboard?.writeText(`${window.location.origin}/${profile.username}`);
  };

  return (
    <section className={compact ? "phone-preview" : "public-profile"}>
      <div className="preview-orb orb-one" />
      <div className="preview-orb orb-two" />
      <div className="profile-actions">
        <span className="profile-brand">PULSE</span>
        <button className="icon-button" onClick={share} aria-label="Copy profile link"><Share2 size={18} /></button>
      </div>
      <div className="profile-card">
        <div className="avatar">{profile.avatar}</div>
        <h1>{profile.name}</h1>
        <p>@{profile.username}</p>
        <div className="profile-bio">{profile.bio}</div>
        <div className="profile-links">
          {visibleLinks.map((link) => (
            <a key={link.id} href={link.url} target="_blank" rel="noreferrer" className="public-link">
              <LinkIcon name={link.icon} />
              <span>{link.title}</span>
              <ArrowUpRight size={17} />
            </a>
          ))}
        </div>
      </div>
      <div className="powered">POWERED BY <b>PULSE</b></div>
      {!compact && <MoreHorizontal className="profile-more" size={21} />}
    </section>
  );
}
