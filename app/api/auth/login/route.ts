import { NextResponse } from "next/server";
import { z } from "zod";
import { createSessionToken, sessionCookie, verifyPassword } from "@/lib/auth";
import { getUserByUsername } from "@/lib/data";
import { cookies } from "next/headers";

const LoginSchema = z.object({
  username: z.string().min(3),
  password: z.string().min(6),
});

export async function POST(request: Request) {
  const body = await request.json();
  const parsed = LoginSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 400 });
  }

  const user = await getUserByUsername(parsed.data.username);
  if (!user) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }

  const valid = await verifyPassword(parsed.data.password, user.passwordHash);
  if (!valid) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }

  const token = await createSessionToken({
    sub: user.id,
    username: user.username,
    role: user.role,
    name: user.name,
  });

  const cookieStore = await cookies();
  cookieStore.set(sessionCookie.name, token, sessionCookie.options);

  return NextResponse.json({ ok: true });
}
