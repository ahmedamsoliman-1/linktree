"use client";

import { useEffect, useState } from "react";
import { onAuthStateChanged, signInWithPopup, signOut, type User } from "firebase/auth";
import { Check, ChevronDown, CircleHelp, Copy, ExternalLink, GripVertical, Link2, LogOut, Plus, Settings2, Sparkles, Trash2, UserRound } from "lucide-react";
import { auth, firebaseConfigured, googleProvider } from "@/lib/firebase";
import { defaultProfile } from "@/lib/default-profile";
import type { Link, Profile } from "@/lib/types";
import { LinkIcon } from "./icon";
import { ProfilePreview } from "./profile-preview";
import { PulseLogo } from "./pulse-logo";

const iconOptions: Link["icon"][] = ["globe", "instagram", "linkedin", "youtube", "music"];

export function Dashboard() {
  const [profile, setProfile] = useState<Profile>(defaultProfile);
  const [user, setUser] = useState<User | null>(null);
  const [loaded, setLoaded] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch(`/api/profile?username=${defaultProfile.username}`)
      .then((response) => response.json())
      .then((data) => setProfile(data))
      .finally(() => setLoaded(true));
    if (auth) return onAuthStateChanged(auth, setUser);
  }, []);

  const updateLink = (id: string, patch: Partial<Link>) => setProfile((current) => ({
    ...current,
    links: current.links.map((link) => link.id === id ? { ...link, ...patch } : link),
  }));

  const addLink = () => setProfile((current) => ({
    ...current,
    links: [...current.links, { id: crypto.randomUUID(), title: "New link", url: "https://", icon: "globe", active: true }],
  }));

  const removeLink = (id: string) => setProfile((current) => ({ ...current, links: current.links.filter((link) => link.id !== id) }));

  const save = async () => {
    if (!user) { setMessage("Sign in before publishing your changes."); return; }
    setSaving(true);
    setMessage("");
    const token = await user.getIdToken();
    const response = await fetch("/api/profile", { method: "PUT", headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` }, body: JSON.stringify(profile) });
    const data = await response.json();
    setSaving(false);
    setMessage(response.ok ? "Changes published" : data.error || "Could not save changes");
  };

  const signIn = async () => {
    if (!auth) { setMessage("Add Firebase credentials to .env.local to enable sign-in."); return; }
    await signInWithPopup(auth, googleProvider);
  };

  const copyLink = async () => {
    await navigator.clipboard.writeText(`${window.location.origin}/${profile.username}`);
    setMessage("Public link copied");
  };

  if (!loaded) return <main className="loading"><div className="loading-mark">P</div></main>;

  return (
    <main className="app-shell">
      <aside className="sidebar">
        <a className="wordmark" href="/"><PulseLogo /></a>
        <nav>
          <a className="nav-item active" href="#links"><Link2 size={19} /> Links</a>
          <a className="nav-item" href="#appearance"><Sparkles size={19} /> Appearance</a>
          <a className="nav-item" href="#settings"><Settings2 size={19} /> Settings</a>
        </nav>
        <div className="sidebar-bottom">
          <a className="nav-item" href="#help"><CircleHelp size={19} /> Help center</a>
          <div className="account-line"><div className="mini-avatar">{user?.displayName?.slice(0, 1) || "A"}</div><span>{user?.displayName || "Your workspace"}</span><ChevronDown size={16} /></div>
        </div>
      </aside>

      <div className="workspace">
        <header className="topbar">
          <div><span className="status-dot" /> All changes are saved</div>
          <div className="header-actions">
            <button className="text-button" onClick={copyLink}><Copy size={16} /> Copy link</button>
            <a className="view-button" href={`/${profile.username}`} target="_blank">View page <ExternalLink size={16} /></a>
            {user ? <button className="user-button" onClick={() => auth && signOut(auth)} title="Sign out"><LogOut size={17} /></button> : <button className="login-button" onClick={signIn}><UserRound size={16} /> Sign in</button>}
          </div>
        </header>

        <section className="editor">
          <div className="editor-heading"><div><p className="eyebrow">YOUR SPACE</p><h1>Make it unmistakably yours.</h1><p>Shape the first impression people get when they find you.</p></div><span className="live-badge"><span /> LIVE</span></div>
          <div className="profile-editor card">
            <div className="profile-editor-avatar">{profile.avatar}</div>
            <div className="field-grid">
              <label>DISPLAY NAME<input value={profile.name} onChange={(event) => setProfile({ ...profile, name: event.target.value })} /></label>
              <label>HANDLE<div className="handle-input"><span>pulse.to/</span><input value={profile.username} onChange={(event) => setProfile({ ...profile, username: event.target.value.replace(/[^a-z0-9-_]/gi, "") })} /></div></label>
            </div>
            <label className="bio-field">BIO<textarea value={profile.bio} onChange={(event) => setProfile({ ...profile, bio: event.target.value })} rows={2} /></label>
          </div>

          <div className="section-heading" id="links"><div><h2>Your links <span>{profile.links.length}</span></h2><p>Share the things you’re proud of.</p></div><button className="add-button" onClick={addLink}><Plus size={18} /> Add link</button></div>
          <div className="link-editor-list">
            {profile.links.map((link, index) => <article className="link-editor card" key={link.id}>
              <div className="link-order"><GripVertical size={20} /><span>{String(index + 1).padStart(2, "0")}</span></div>
              <button className="social-picker" onClick={() => updateLink(link.id, { icon: iconOptions[(iconOptions.indexOf(link.icon) + 1) % iconOptions.length] })}><LinkIcon name={link.icon} /></button>
              <div className="link-inputs"><input aria-label="Link title" value={link.title} onChange={(event) => updateLink(link.id, { title: event.target.value })} /><input aria-label="Link URL" value={link.url} onChange={(event) => updateLink(link.id, { url: event.target.value })} /></div>
              <button className={`toggle ${link.active ? "on" : ""}`} onClick={() => updateLink(link.id, { active: !link.active })} aria-label="Toggle link"><span /></button>
              <button className="delete-button" onClick={() => removeLink(link.id)} aria-label="Delete link"><Trash2 size={17} /></button>
            </article>)}
          </div>
          <div className="save-row"><button className="save-button" onClick={save} disabled={saving}>{saving ? "Publishing…" : <><Check size={18} /> Publish changes</>}</button>{message && <span className="save-message">{message}</span>}{!firebaseConfigured && <span className="setup-hint">Demo mode — add Firebase and Upstash keys to connect your account.</span>}</div>
        </section>
      </div>

      <aside className="preview-panel"><div className="preview-label"><span className="preview-dot" /> LIVE PREVIEW</div><ProfilePreview profile={profile} compact /></aside>
    </main>
  );
}
