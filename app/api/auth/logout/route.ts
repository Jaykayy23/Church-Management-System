import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { sessionCookie } from "@/lib/auth";

export async function POST() {
  const cookieStore = await cookies();
  cookieStore.set(sessionCookie.name, "", {
    ...sessionCookie.options,
    maxAge: 0,
  });
  return NextResponse.json({ ok: true });
}
