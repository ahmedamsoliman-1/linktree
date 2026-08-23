import { NextRequest, NextResponse } from "next/server";
import { defaultProfile } from "@/lib/default-profile";
import { redis } from "@/lib/redis";
import type { Profile } from "@/lib/types";
import { firebaseAdminConfigured, verifyFirebaseToken } from "@/lib/firebase-admin";

const key = (username: string) => `pulse:profile:${username.toLowerCase()}`;

export async function GET(request: NextRequest) {
  const username = request.nextUrl.searchParams.get("username") || defaultProfile.username;
  const savedProfile = redis ? await redis.get<Profile>(key(username)) : null;
  return NextResponse.json(savedProfile || { ...defaultProfile, username });
}

export async function PUT(request: NextRequest) {
  const profile = (await request.json()) as Profile;
  if (!profile.username || !profile.name || !Array.isArray(profile.links)) {
    return NextResponse.json({ error: "A username, name, and links are required." }, { status: 400 });
  }
  if (!redis) {
    return NextResponse.json({ error: "Upstash Redis is not configured. Add its credentials to .env.local." }, { status: 503 });
  }
  if (!firebaseAdminConfigured) {
    return NextResponse.json({ error: "Firebase Admin is not configured. Add its server credentials to .env.local." }, { status: 503 });
  }
  const token = request.headers.get("authorization")?.replace("Bearer ", "") || null;
  const decodedToken = await verifyFirebaseToken(token);
  if (!decodedToken) return NextResponse.json({ error: "Please sign in to publish changes." }, { status: 401 });
  const ownerKey = `pulse:owner:${profile.username.toLowerCase()}`;
  const owner = await redis.get<string>(ownerKey);
  if (owner && owner !== decodedToken.uid) {
    return NextResponse.json({ error: "This handle belongs to another account." }, { status: 403 });
  }
  await redis.set(key(profile.username), profile);
  await redis.set(ownerKey, decodedToken.uid);
  return NextResponse.json(profile);
}
