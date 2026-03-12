import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { requireRole } from "@/lib/server-auth";

const MemberSchema = z.object({
  firstName: z.string().min(2),
  lastName: z.string().min(2),
  role: z.string().min(2),
  team: z.string().min(2),
  phone: z.string().min(5),
  email: z.string().email(),
  joinedAt: z.string(),
});

export async function GET() {
  const auth = await requireRole("staff");
  if (!auth.ok) {
    return NextResponse.json({ error: "Unauthorized" }, { status: auth.status });
  }
  const rows = await prisma.member.findMany({ orderBy: { lastName: "asc" } });
  return NextResponse.json({ data: rows });
}

export async function POST(request: Request) {
  const auth = await requireRole("admin");
  if (!auth.ok) {
    return NextResponse.json({ error: "Unauthorized" }, { status: auth.status });
  }
  const body = await request.json();
  const parsed = MemberSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }
  const row = await prisma.member.create({
    data: {
      firstName: parsed.data.firstName,
      lastName: parsed.data.lastName,
      role: parsed.data.role,
      team: parsed.data.team,
      phone: parsed.data.phone,
      email: parsed.data.email,
      joinedAt: new Date(parsed.data.joinedAt),
    },
  });
  return NextResponse.json({ data: row });
}
