import { NextResponse } from "next/server";
import { z } from "zod";
import { requireRole } from "@/lib/server-auth";
import { createUser, getUserByUsername } from "@/lib/data";
import { hashPassword } from "@/lib/auth";

const RegisterSchema = z.object({
  username: z.string().min(3),
  password: z.string().min(6),
  name: z.string().min(2).optional(),
  role: z.enum(["admin", "staff"]).default("staff"),
});

export async function POST(request: Request) {
  const auth = await requireRole("admin");
  if (!auth.ok) {
    return NextResponse.json({ error: "Unauthorized" }, { status: auth.status });
  }

  const body = await request.json();
  const parsed = RegisterSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }

  const existing = await getUserByUsername(parsed.data.username);
  if (existing) {
    return NextResponse.json({ error: "User already exists" }, { status: 409 });
  }

  const passwordHash = await hashPassword(parsed.data.password);
  const user = await createUser({
    username: parsed.data.username,
    name: parsed.data.name ?? null,
    role: parsed.data.role,
    passwordHash,
  });

  return NextResponse.json({ user });
}
