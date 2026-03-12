import { NextResponse } from "next/server";
import { z } from "zod";
import { createUser, getUserByUsername } from "@/lib/data";
import { hashPassword } from "@/lib/auth";

const AdminSchema = z.object({
  username: z.string().min(3),
  password: z.string().min(6),
  name: z.string().min(2).optional(),
});

export async function POST(request: Request) {
  const key = request.headers.get("x-admin-key");
  if (!process.env.ADMIN_SETUP_KEY || key !== process.env.ADMIN_SETUP_KEY) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const parsed = AdminSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }

  const existing = await getUserByUsername(parsed.data.username);
  if (existing) {
    return NextResponse.json({ error: "Admin already exists" }, { status: 409 });
  }

  const passwordHash = await hashPassword(parsed.data.password);
  const user = await createUser({
    username: parsed.data.username,
    name: parsed.data.name ?? null,
    role: "admin",
    passwordHash,
  });

  return NextResponse.json({ user });
}
