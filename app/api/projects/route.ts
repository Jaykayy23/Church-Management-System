import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { requireRole } from "@/lib/server-auth";

const ProjectSchema = z.object({
  title: z.string().min(2),
  status: z.string().min(2),
  raisedAmount: z.number().nonnegative(),
  goalAmount: z.number().nonnegative(),
});

export async function GET() {
  const auth = await requireRole("staff");
  if (!auth.ok) {
    return NextResponse.json({ error: "Unauthorized" }, { status: auth.status });
  }
  const rows = await prisma.project.findMany({ orderBy: { createdAt: "desc" } });
  return NextResponse.json({ data: rows });
}

export async function POST(request: Request) {
  const auth = await requireRole("admin");
  if (!auth.ok) {
    return NextResponse.json({ error: "Unauthorized" }, { status: auth.status });
  }
  const body = await request.json();
  const parsed = ProjectSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }
  const row = await prisma.project.create({
    data: {
      title: parsed.data.title,
      status: parsed.data.status,
      raisedAmount: parsed.data.raisedAmount,
      goalAmount: parsed.data.goalAmount,
    },
  });
  return NextResponse.json({ data: row });
}
