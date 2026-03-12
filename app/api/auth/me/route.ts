import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { sessionCookie, verifySessionToken } from "@/lib/auth";

export async function GET() {
  const cookieStore = await cookies();
  const token = cookieStore.get(sessionCookie.name)?.value;
  if (!token) {
    return NextResponse.json({ user: null }, { status: 200 });
  }

  try {
    const user = await verifySessionToken(token);
    return NextResponse.json({ user });
  } catch {
    return NextResponse.json({ user: null }, { status: 200 });
  }
}
