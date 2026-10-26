import { NextRequest, NextResponse } from "next/server";
import { redis } from "@/lib/redis";

export async function POST(request: NextRequest) {
  const profile = request.nextUrl.searchParams.get("profile");
  const link = request.nextUrl.searchParams.get("link");
  if (redis && profile && link) {
    await redis.incr(`pulse:analytics:${profile.toLowerCase()}:clicks`);
    await redis.hincrby(`pulse:analytics:${profile.toLowerCase()}:links`, link, 1);
  }
  return NextResponse.json({ ok: true });
}
