"use client";

import { ArrowUpRight, CalendarDays, MoreHorizontal, Play, Share2, Sparkles } from "lucide-react";
import type { Profile } from "@/lib/types";
import { LinkIcon } from "./icon";
import { PulseLogo } from "./pulse-logo";

export function ProfilePreview({ profile, compact = false }: { profile: Profile; compact?: boolean }) {
  const visibleLinks = profile.links.filter((link) => link.active);
  const visibleBlocks = profile.blocks.filter((block) => block.active);
  const share = async () => { await navigator.clipboard?.writeText(`${window.location.origin}/${profile.username}`); };
  const track = (id: string) => { void fetch(`/api/track?profile=${encodeURIComponent(profile.username)}&link=${encodeURIComponent(id)}`, { method: "POST" }); };

  return (
    <section className={`public-profile theme-${profile.theme} ${compact ? "phone-preview" : ""}`} style={{ "--profile-accent": profile.accent } as React.CSSProperties}>
      <div className="theme-grid" /><div className="theme-orb orb-one" /><div className="theme-orb orb-two" /><div className="theme-orb orb-three" />
      <div className="profile-actions"><PulseLogo light /><button className="icon-button" onClick={share} aria-label="Copy profile link"><Share2 size={18} /></button></div>
      <div className="profile-card">
        <div className="avatar"><span>{profile.avatar}</span><i /></div>
        <h1>{profile.name}</h1><p>@{profile.username}</p><div className="profile-bio">{profile.bio}</div>
        <div className="profile-links">
          {visibleLinks.map((link) => <a key={link.id} href={link.url} onClick={() => track(link.id)} target="_blank" rel="noreferrer" className={`public-link ${link.featured ? "featured-link" : ""}`}>
            <LinkIcon name={link.icon} /><span><b>{link.title}</b>{link.description && <small>{link.description}</small>}</span>{link.featured ? <Sparkles size={17} /> : <ArrowUpRight size={17} />}
          </a>)}
        </div>
        {visibleBlocks.length > 0 && <div className="profile-blocks">{visibleBlocks.map((block) => <article key={block.id} className={`profile-block block-${block.type}`}>
          {block.type === "availability" ? <CalendarDays size={16} /> : block.type === "media" ? <Play size={16} /> : <Sparkles size={16} />}<div><b>{block.title}</b><span>{block.body}</span></div>
        </article>)}</div>}
      </div>
      {profile.showBranding && <div className="powered">POWERED BY <b>PULSE</b></div>}
      {!compact && <MoreHorizontal className="profile-more" size={21} />}
    </section>
  );
}
